import { Box, Input, Flex, Text, Button, Center, useToast, Card } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPwSchema, ResetPwFormValues } from '@/schemas/resetPwSchema';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { IBaseResponse } from '@/model/common';

function ResetPasswordForm({ user }: { user: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPwFormValues>({ resolver: zodResolver(resetPwSchema) });
  const toast = useToast();
  const { mutate: resetPasswordMutate, isPending } = useMutation<IBaseResponse, Error, ResetPwFormValues>({
    mutationFn: async (data: ResetPwFormValues) => {
      const res = await fetch('/api/find-password', {
        method: 'PUT',
        body: JSON.stringify({ ...data, email: user }),
      });
      return res.json() as Promise<IBaseResponse>;
    },
    onSuccess: data => {
      if (!data.success) {
        toast({
          title: data.error,
          status: 'error',
        });
        return;
      }
      toast({
        title: '비밀번호가 변경되었습니다.',
        status: 'success',
      });
      router.back();
    },
    onError: error => {
      toast({
        title: error.message,
        status: 'error',
      });
    },
  });
  const onChangePassword = (values: ResetPwFormValues) => {
    resetPasswordMutate(values);
  };
  return (
    <form onSubmit={handleSubmit(onChangePassword)}>
      <Card maxW='26.5rem' p={{ base: '2.5rem', xl: 0 }} mx='auto' boxShadow={{ base: undefined, xl: 'none' }}>
        <Flex direction='column' gap='1.5rem'>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              새 비밀번호
            </Text>
            <Input
              type='password'
              placeholder='새 비밀번호를 입력해 주세요.'
              borderColor={errors.password ? 'red.400' : 'gray.300'}
              {...register('password')}
            />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.password?.message}
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              새 비밀번호 확인
            </Text>
            <Input
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              borderColor={errors.confirmPassword ? 'red.400' : 'gray.300'}
              {...register('confirmPassword')}
            />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.confirmPassword?.message}
            </Text>
          </Box>
        </Flex>
        <Center mt='40px' gap='20px' mx='auto'>
          <Center as={Button} px='20px' h='40px' borderRadius='3px' type='button' onClick={() => router.back()}>
            <Text>취소</Text>
          </Center>
          <Center
            as={Button}
            type='submit'
            bg='blue.300'
            px='20px'
            h='40px'
            borderRadius='3px'
            _hover={{ bg: 'blue.400' }}
            isLoading={isPending}
          >
            <Text>변경</Text>
          </Center>
        </Center>
      </Card>
    </form>
  );
}

export default ResetPasswordForm;
