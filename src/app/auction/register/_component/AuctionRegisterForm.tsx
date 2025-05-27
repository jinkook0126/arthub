'use client';

import { Box, Flex, Text, Input, Textarea, Image, Center, Button, Tooltip, useToast } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { uploadImage } from '@/utils/supbaseActions';
import { auctionRgSchema, AuctionRgFormValues } from '@/schemas/AuctionRgSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { ImageIcon } from './ImageIcon';

function AuctionRegisterForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AuctionRgFormValues>({
    resolver: zodResolver(auctionRgSchema),
  });
  const toast = useToast();
  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();
  const { mutate: createAuction, isPending } = useMutation({
    mutationFn: async (data: AuctionRgFormValues & { url: string }) => {
      const res = await fetch('/api/auction', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: async res => {
      toast({
        title: res.success ? '경매 등록 성공' : '경매 등록 실패',
        description: res.success ? '경매 등록이 완료되었습니다.' : res.error,
        status: res.success ? 'success' : 'error',
      });
      if (res.success) {
        router.back();
      }
    },
    onError: () => {
      toast({
        title: '경매 등록 실패',
        description: '경매 등록에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fileValue = e.target.files?.[0];
    if (!fileValue) return;
    clearErrors('root');
    setImage(fileValue);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImageUrl(base64.toString());
      }
    };
    reader.readAsDataURL(fileValue);
  };
  const onRegister = async (values: AuctionRgFormValues) => {
    const today = dayjs();
    if (dayjs(values.artCreatedAt).isAfter(today, 'd')) {
      setError('artCreatedAt', { message: '제작 날짜는 오늘 이전이여야 합니다.' });
      return;
    }
    if (dayjs(values.auctionEndAt).isBefore(today)) {
      setError('auctionEndAt', { message: '종료 날짜는 오늘 이후여야 합니다.' });
    }
    if (!image) {
      setError('root', { message: '사진을 업로드해주세요.' });
      return;
    }
    const imageResult = await uploadImage({ file: image, directory: 'art' });
    if (!imageResult.success) {
      toast({
        title: '이미지 업로드 실패',
        description: imageResult.error,
        status: 'error',
      });
      return;
    }
    createAuction({ ...getValues(), url: imageResult.filePath });
  };
  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <Box pt='20px' pb='16px'>
        <Box py='20px'>
          <Text fontSize='18px' fontWeight={700} color='black'>
            작품정보
          </Text>
        </Box>
        <Flex gap='10px' flexDir='column'>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500} w='160px'>
              작품사진
            </Text>
            <Center flexDir='column' gap='10px'>
              {imageUrl ? (
                <Box w='100%' height='400px' pos='relative'>
                  <Image src={imageUrl} alt='작품사진' pos='absolute' objectFit='contain' w='100%' h='100%' />
                </Box>
              ) : (
                <Flex
                  bg='gray.200'
                  w='250px'
                  h='250px'
                  borderRadius='5px'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <ImageIcon w='100px' h='100px' color='white' />
                </Flex>
              )}

              <Button colorScheme='blue' type='button' onClick={() => fileRef.current?.click()}>
                사진 업로드
              </Button>
            </Center>
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.root?.message}
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              작품명
            </Text>
            <Input placeholder='작품명을 입력해주세요' {...register('artTitle')} />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.artTitle?.message}
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              작품설명
            </Text>
            <Textarea placeholder='작품설명을 입력해주세요' resize='none' height='200px' {...register('artDesc')} />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.artDesc?.message}
            </Text>
          </Box>
          <Box>
            <Flex gap='10px' alignItems='center' paddingBottom='0.375rem'>
              <Text fontWeight={500}>작품크기</Text>
              <Tooltip label='ex) 100cm x 100cm'>
                <InfoOutlineIcon />
              </Tooltip>
            </Flex>
            <Input placeholder='작품크기를 입력해주세요' {...register('artSize')} />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.artSize?.message}
            </Text>
          </Box>
          <Box>
            <Flex gap='10px' alignItems='center' paddingBottom='0.375rem'>
              <Text fontWeight={500}>작품재료</Text>
              <Tooltip label='ex) 아크릴에 물감'>
                <InfoOutlineIcon />
              </Tooltip>
            </Flex>
            <Input placeholder='작품재료를 입력해주세요' {...register('artMaterial')} />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.artMaterial?.message}
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              제작년도
            </Text>
            <Input placeholder='제작년도를 입력해주세요' {...register('artCreatedAt')} type='datetime-local' />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.artCreatedAt?.message}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box pt='20px' pb='16px'>
        <Box py='20px'>
          <Text fontSize='18px' fontWeight={700} color='black'>
            경매 정보
          </Text>
        </Box>
        <Flex gap='10px' flexDir='column'>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              경매 시작가
            </Text>
            <Input
              placeholder='시작가를 입력해주세요'
              type='number'
              {...register('startingPrice', { valueAsNumber: true })}
            />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.startingPrice?.message}
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              즉시 구매가
            </Text>
            <Input
              placeholder='즉시 구매가를 입력해주세요'
              type='number'
              {...register('buyoutPrice', { valueAsNumber: true })}
            />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.buyoutPrice?.message}
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              경매 종료일
            </Text>
            <Input placeholder='종료일을 입력해주세요' {...register('auctionEndAt')} type='datetime-local' />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              {errors.auctionEndAt?.message}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Flex mt='40px' gap='20px' mx='auto' justifyContent='center'>
        <Button variant='outline' type='button' colorScheme='blue' onClick={() => router.back()}>
          취소
        </Button>
        <Button type='submit' colorScheme='blue' isLoading={isPending}>
          경매 등록
        </Button>
      </Flex>
      <input type='file' hidden accept='image/*' ref={fileRef} onChange={onChangeFileInput} />
    </form>
  );
}

export default AuctionRegisterForm;
