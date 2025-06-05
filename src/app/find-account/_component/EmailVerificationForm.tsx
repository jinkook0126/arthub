import { IBaseResponse } from '@/model/common';
import { findMailSchema, FindMailSchema } from '@/schemas/findMailSchema';

import { Box, Text, Card, Flex, Button, Input, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

type FindEmailResponse = IBaseResponse & { email: string };

function EmailVerificationForm({ onVerified }: { onVerified: (email: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindMailSchema>({
    resolver: zodResolver(findMailSchema),
  });
  const toast = useToast();
  const { mutate: findEmailMutate, isPending } = useMutation<FindEmailResponse, Error, FindMailSchema>({
    mutationFn: async (data: FindMailSchema) => {
      const res = await fetch('/api/find-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resData = (await res.json()) as FindEmailResponse;
      if (!res.ok) {
        throw new Error(resData.error || '네트워크 오류 발생');
      }
      return resData;
    },
    onSuccess: data => {
      if (!data.success) {
        toast({
          title: data.error,
          status: 'error',
        });
        return;
      }
      onVerified(data.email);
    },
    onError: error => {
      toast({
        title: error.message,
        status: 'error',
      });
    },
  });
  const onSubmit = (data: FindMailSchema) => {
    findEmailMutate({ ...data, phone: data.phone.replace(/-/g, '') });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card maxW='26.5rem' p={{ base: '2.5rem', xl: 0 }} mx='auto' boxShadow={{ base: undefined, xl: 'none' }}>
        <Flex direction='column' gap='1.5rem'>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              이름
            </Text>
            <Input type='text' placeholder='이름을 입력해주세요.' {...register('name')} />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.name?.message}
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              휴대전화 번호
            </Text>
            <Input type='tel' maxLength={13} placeholder='숫자만 입력해주세요.' {...register('phone')} />

            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.phone?.message}
            </Text>
          </Box>
          <Button colorScheme='blue' mt={4} type='submit' isLoading={isPending}>
            <Text fontWeight={400} fontSize='1rem'>
              이메일 찾기
            </Text>
          </Button>
        </Flex>
      </Card>
    </form>
  );
}

export default EmailVerificationForm;
