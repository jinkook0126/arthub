'use client';

import { Box, Flex, Text, Input, Textarea, Image, Center, Button, Tooltip, useToast } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { uploadImage } from '@/utils/supbaseActions';
import { ImageIcon } from './ImageIcon';

function AuctionRegisterForm() {
  const toast = useToast();
  const { handleSubmit } = useForm();
  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fileValue = e.target.files?.[0];
    if (!fileValue) return;
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
  const onRegister = async () => {
    const imageResult = await uploadImage({ file: image!, directory: 'art' });
    if (!imageResult.success) {
      toast({
        title: '이미지 업로드 실패',
        description: imageResult.error,
        status: 'error',
      });
    }
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
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              작품명
            </Text>
            <Input placeholder='작품명을 입력해주세요' />
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              작품설명
            </Text>
            <Textarea placeholder='작품설명을 입력해주세요' resize='none' height='200px' />
          </Box>
          <Box>
            <Flex gap='10px' alignItems='center' paddingBottom='0.375rem'>
              <Text fontWeight={500}>작품크기</Text>
              <Tooltip label='ex) 100cm x 100cm'>
                <InfoOutlineIcon />
              </Tooltip>
            </Flex>
            <Input placeholder='작품크기를 입력해주세요' />
          </Box>
          <Box>
            <Flex gap='10px' alignItems='center' paddingBottom='0.375rem'>
              <Text fontWeight={500}>작품재료</Text>
              <Tooltip label='ex) 아크릴에 물감'>
                <InfoOutlineIcon />
              </Tooltip>
            </Flex>
            <Input placeholder='작품재료를 입력해주세요' />
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              제작년도
            </Text>
            <Input placeholder='제작년도를 입력해주세요' type='date' />
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
            <Input placeholder='시작가를 입력해주세요' type='number' />
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              즉시 구매가
            </Text>
            <Input placeholder='즉시 구매가를 입력해주세요' type='number' />
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              경매 종료일
            </Text>
            <Input placeholder='종료일을 입력해주세요' type='date' />
          </Box>
        </Flex>
      </Box>
      <input type='file' hidden accept='image/*' ref={fileRef} onChange={onChangeFileInput} />
    </form>
  );
}

export default AuctionRegisterForm;
