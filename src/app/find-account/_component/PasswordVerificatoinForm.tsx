import { IBaseResponse } from '@/model/common';
import { findPasswordSchema, FindPasswordFormValues } from '@/schemas/FindPasswordSchema';
import { Card, Input, Flex, Box, Text, Button, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

function PasswordVerificatoinForm({ onVerified }: { onVerified: (isVerified: string) => void }) {
  const toast = useToast();
  const { mutate, isPending } = useMutation<IBaseResponse, Error, FindPasswordFormValues>({
    mutationFn: async (data: FindPasswordFormValues) => {
      const res = await fetch('/api/find-password', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const resData = (await res.json()) as IBaseResponse;
      if (!res.ok) {
        throw new Error(resData.error || '네트워크 오류 발생');
      }
      return resData;
    },
    onSuccess: (data, variables) => {
      if (!data.success) {
        toast({
          title: data.error,
          status: 'error',
        });
        return;
      }
      onVerified(variables.email);
    },
    onError: error => {
      toast({
        title: error.message,
        status: 'error',
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormValues>({
    resolver: zodResolver(findPasswordSchema),
  });
  const onSubmit = (data: FindPasswordFormValues) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card maxW='26.5rem' p={{ base: '2.5rem', xl: 0 }} mx='auto' boxShadow={{ base: undefined, xl: 'none' }}>
        <Flex direction='column' gap='1rem'>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              가입한 이메일 주소를 입력해주세요
            </Text>
            <Input placeholder='hello@arthub.com' {...register('email')} />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.email?.message}
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              이름을 입력해주세요
            </Text>
            <Input placeholder='홍길동' {...register('name')} />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.name?.message}
            </Text>
          </Box>
        </Flex>
        <Button colorScheme='blue' mt={4} type='submit' isLoading={isPending}>
          <Text fontWeight={400} fontSize='1rem'>
            다음
          </Text>
        </Button>
      </Card>
    </form>
  );
}

export default PasswordVerificatoinForm;
