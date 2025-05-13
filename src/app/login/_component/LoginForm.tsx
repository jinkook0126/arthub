'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Text, Input, Box, Button, Flex, useToast } from '@chakra-ui/react';

function LoginForm() {
  const toast = useToast();
  const router = useRouter();
  const onLogin = async () => {
    const res = await signIn('credentials', {
      email: 'test@test.com',
      password: 'test',
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
    <Flex direction='column' gap='1.5rem'>
      <Box>
        <Text paddingBottom='0.375rem' fontWeight={500}>
          이메일
        </Text>
        <Input placeholder='hello@arthub.com' />
        <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
          이메일 주소를 입력해주세요.
        </Text>
      </Box>
      <Box>
        <Text paddingBottom='0.375rem' fontWeight={500}>
          비밀번호
        </Text>
        <Input placeholder='비밀번호를 입력해 주세요.' borderColor='red.400' />
        <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
          비밀번호를 입력해주세요.
        </Text>
      </Box>
      <Button colorScheme='blue' onClick={onLogin}>
        <Text fontWeight={400} fontSize='1rem'>
          이메일 로그인
        </Text>
      </Button>
    </Flex>
  );
}

export default LoginForm;
