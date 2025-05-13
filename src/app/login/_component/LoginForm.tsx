'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Text, Input, Box, Button, Flex, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/loginSchema';

type LoginFormProps = {
  email: string;
  password: string;
};
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
  });
  const toast = useToast();
  const router = useRouter();
  const onLogin = async (data: LoginFormProps) => {
    const { email, password } = data;
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res.error) {
      const description =
        res.error === 'CredentialsSignin' ? '이메일 또는 비밀번호가 잘못되었습니다.' : '로그인 중 오류가 발생했습니다.';
      toast({
        title: '로그인 실패',
        description,
        status: 'error',
      });
      return;
    }
    router.push('/');
  };
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <Flex direction='column' gap='1.5rem'>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            이메일
          </Text>
          <Input
            placeholder='hello@arthub.com'
            borderColor={errors.email ? 'red.400' : 'gray.300'}
            {...register('email')}
          />
          <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
            {errors.email?.message}
          </Text>
        </Box>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            비밀번호
          </Text>
          <Input
            type='password'
            placeholder='비밀번호를 입력해 주세요.'
            borderColor={errors.password ? 'red.400' : 'gray.300'}
            {...register('password')}
          />
          <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
            {errors.password?.message}
          </Text>
        </Box>
        <Button colorScheme='blue' type='submit' isLoading={isSubmitting}>
          <Text fontWeight={400} fontSize='1rem'>
            이메일 로그인
          </Text>
        </Button>
      </Flex>
    </form>
  );
}

export default LoginForm;
