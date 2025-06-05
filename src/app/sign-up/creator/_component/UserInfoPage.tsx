import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignupFormValues } from '@/schemas/signUpSchema';
import { useMutation } from '@tanstack/react-query';
import { IBaseResponse } from '@/model/common';
import { Box, Button, Checkbox, Flex, Input, Text, VStack, useToast, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { uploadImage } from '@/utils/supbaseActions';
import { ChangeRoleFormValues } from '@/schemas/changeRoleSchema';
import { useCreatorSignState, useCreatorSignUpdate } from './CreatorSignContext';

function UserInfoPage() {
  const { creatorForm, imageFile } = useCreatorSignState();
  const { setPage } = useCreatorSignUpdate();
  const [isAgreeAll, setIsAgreeAll] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<SignupFormValues>({ resolver: zodResolver(signUpSchema) });
  const toast = useToast();
  const router = useRouter();
  const { mutate: signUp, isPending } = useMutation<IBaseResponse, Error, SignupFormValues & ChangeRoleFormValues>({
    mutationFn: async (formData: SignupFormValues & ChangeRoleFormValues) => {
      const res = await fetch('/api/user/creator', {
        method: 'POST',
        body: JSON.stringify({ ...formData, phone: formData.phone.replace(/-/g, '') }),
      });
      return res.json();
    },
    onSuccess: data => {
      const title = data.success ? '회원가입 성공' : '회원가입 실패';
      const description = data.success ? '회원가입이 완료되었습니다.' : data.error;
      toast({
        title,
        description,
        status: data.success ? 'success' : 'error',
      });
      if (data.success) {
        router.push('/');
      }
    },
  });
  const onSignUp = async (data: SignupFormValues) => {
    let imagePath = '';
    if (imageFile) {
      const imageResult = await uploadImage({ file: imageFile, directory: 'thumbnail' });
      if (!imageResult.success) {
        toast({
          title: '이미지 업로드 실패',
          description: imageResult.error,
          status: 'error',
        });
        return;
      }
      imagePath = imageResult.filePath;
    }
    signUp({ ...data, ...creatorForm, creatorThumbnail: imagePath });
  };

  const onChangeAgreeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('consentLearning', e.target.checked);
    setValue('termsOfService', e.target.checked);
    setValue('privacyPolicy', e.target.checked);
    setIsAgreeAll(e.target.checked);
  };

  useEffect(() => {
    const subscription = watch(values => {
      const allChecked = values.termsOfService && values.privacyPolicy && values.consentLearning;
      setIsAgreeAll(!!allChecked);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      <Flex direction='column' gap='1.5rem'>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            이름
          </Text>
          <Input
            placeholder='이름(실명)을 입력해주세요'
            borderColor={errors.name ? 'red.400' : 'gray.300'}
            {...register('name')}
          />
          <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
            {errors.name?.message}
          </Text>
        </Box>
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
            휴대폰번호
          </Text>
          <Input
            placeholder='ex) 010-1234-5678'
            borderColor={errors.phone ? 'red.400' : 'gray.300'}
            {...register('phone')}
          />
          <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
            {errors.phone?.message}
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
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            비밀번호 확인
          </Text>
          <Input
            type='password'
            placeholder='비밀번호를 한 번 더  입력해 주세요.'
            borderColor={errors.confirmPassword ? 'red.400' : 'gray.300'}
            {...register('confirmPassword')}
          />
          <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
            {errors.confirmPassword?.message}
          </Text>
        </Box>
        <Box>
          <Box py={4} borderBottomWidth={1}>
            <Checkbox colorScheme='blue' size='lg' spacing={2} onChange={onChangeAgreeAll} isChecked={isAgreeAll}>
              <Text fontSize='16px' fontWeight={500}>
                약관 전체 동의
              </Text>
            </Checkbox>
          </Box>
          <VStack spacing={5} py={5} align='flex-start'>
            <Box>
              <Checkbox
                colorScheme='blue'
                size='lg'
                spacing={2}
                {...register('consentLearning')}
                isChecked={watch('consentLearning')}
              >
                <Flex gap={1.5}>
                  <Text fontSize='14px' color='gray.600'>
                    학습용 사이트입니다.
                  </Text>
                  <Text fontSize='14px' color='gray.400'>
                    (필수)
                  </Text>
                </Flex>
              </Checkbox>
            </Box>
            <Box>
              <Checkbox
                colorScheme='blue'
                size='lg'
                spacing={2}
                {...register('termsOfService')}
                isChecked={watch('termsOfService')}
              >
                <Flex gap={1.5}>
                  <Link
                    href='/'
                    as={NextLink}
                    fontSize='14px'
                    fontWeight={500}
                    color='gray.600'
                    textDecoration='underline'
                  >
                    이용약관 동의
                  </Link>
                  <Text fontSize='14px' color='gray.400'>
                    (필수)
                  </Text>
                </Flex>
              </Checkbox>
            </Box>
            <Box>
              <Checkbox
                colorScheme='blue'
                size='lg'
                spacing={2}
                {...register('privacyPolicy')}
                isChecked={watch('privacyPolicy')}
              >
                <Flex gap={1.5}>
                  <Link
                    href='/'
                    as={NextLink}
                    fontSize='14px'
                    fontWeight={500}
                    color='gray.600'
                    textDecoration='underline'
                  >
                    개인정보 수집 및 이용 동의
                  </Link>
                  <Text fontSize='14px' color='gray.400'>
                    (필수)
                  </Text>
                </Flex>
              </Checkbox>
            </Box>
          </VStack>
          <Text fontSize='0.8rem' color='red.400'>
            {errors.consentLearning?.message || errors.termsOfService?.message || errors.privacyPolicy?.message}
          </Text>
        </Box>
        <Flex mt='40px' gap='20px' mx='auto' justifyContent='center'>
          <Button variant='outline' type='button' colorScheme='blue' onClick={() => setPage('creator-info')}>
            뒤로가기
          </Button>
          <Button type='submit' colorScheme='blue' isLoading={isPending}>
            <Text fontWeight={400} fontSize='1rem'>
              회원가입
            </Text>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

export default UserInfoPage;
