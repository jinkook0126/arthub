'use client';

import { IBaseResponse } from '@/model/common';
import { changePwSchema, ChangePwFormValues } from '@/schemas/changePwSchema';
import { Flex, Box, Input, Text, Center, Button, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

function ChangePasswordForm() {
  const toast = useToast();
  const router = useRouter();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePwFormValues>({ resolver: zodResolver(changePwSchema) });
  const { mutate: changePasswordMutate, isPending } = useMutation<IBaseResponse, Error>({
    mutationFn: async () => {
      const res = await fetch('/api/user', {
        method: 'put',
        body: JSON.stringify(getValues()),
      });
      return res.json();
    },
    onSuccess: res => {
      toast({
        status: res.success ? 'success' : 'error',
        description: res.success ? '비밀번호가 변경되었습니다.' : res.error,
      });
      if (res.success) router.back();
    },
    onError: () => {
      toast({
        status: 'error',
        description: '비밀번호 변경에 실패했습니다.',
      });
    },
  });
  const onChangePassword = () => {
    changePasswordMutate();
  };
  return (
    <form onSubmit={handleSubmit(onChangePassword)}>
      <Flex direction='column' gap='1.5rem'>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            현재 비밀번호
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
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            새 비밀번호
          </Text>
          <Input
            type='password'
            placeholder='새 비밀번호를 입력해 주세요.'
            borderColor={errors.password ? 'red.400' : 'gray.300'}
            {...register('newPassword')}
          />
          <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
            {errors.newPassword?.message}
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
        <Center as={Button} px='20px' h='40px' borderRadius='3px' type='button' onClick={() => router.back()} w=''>
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
    </form>
  );
}
export default ChangePasswordForm;
