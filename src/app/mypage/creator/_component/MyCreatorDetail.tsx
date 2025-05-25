'use client';

import getCreatorDetail from '@/app/creators/[id]/_lib/getCreatorDetail';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { changeRoleSchema, ChangeRoleFormValues } from '@/schemas/changeRoleSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { deleteImage, uploadImage } from '@/utils/supbaseActions';
import { useSession } from 'next-auth/react';

function MyCreatorDetail() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState<string>('');
  const router = useRouter();
  const toast = useToast();
  const { data } = useQuery({ queryKey: ['creators', session?.user.creatorId], queryFn: getCreatorDetail });
  const {
    handleSubmit,
    register,
    watch,
    setError,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangeRoleFormValues>({
    resolver: zodResolver(changeRoleSchema),
    defaultValues: {
      creatorName: '',
      creatorTags: [],
      creatorThumbnail: '',
      creatorDesc: '',
    },
  });
  const { mutate: updateCreator, isPending } = useMutation({
    mutationFn: async (v: ChangeRoleFormValues) => {
      const res = await fetch('/api/user/role', {
        method: 'PUT',
        body: JSON.stringify(v),
      });
      return res.json();
    },
    onSuccess: res => {
      toast({
        title: res.success ? '작가정보 수정 성공' : '작가정보 수정 실패',
        description: res.success ? '작가정보가 수정되었습니다.' : res.error,
        status: res.success ? 'success' : 'error',
      });
      if (res.success) {
        router.back();
      }
    },
    onError: () => {
      toast({
        title: '작가정보 수정 실패',
        description: '작가정보 수정에 실패했습니다.',
        status: 'error',
      });
    },
  });
  const onSubmit = async () => {
    if (file) {
      const imageResult = await uploadImage({ file, directory: 'thumbnail' });
      if (!imageResult.success) {
        toast({
          title: '이미지 업로드 실패',
          description: imageResult.error,
          status: 'error',
        });
        return;
      }
      const path = imageResult.filePath;
      setValue('creatorThumbnail', path);
    }
    updateCreator(getValues());
  };

  const onAddTag = () => {
    const prev = watch('creatorTags') || [];
    if (prev.length >= 4) {
      setError('creatorTags', { message: '최대 4개까지 입력할 수 있습니다.' });
      return;
    }
    setTagInput('');
    if (prev.includes(tagInput)) return;
    setValue('creatorTags', [...prev, tagInput]);
  };

  const onRemoveTag = (tag: string) => {
    const prev = watch('creatorTags') || [];
    setValue(
      'creatorTags',
      prev.filter(t => t !== tag),
    );
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fileValue = e.target.files?.[0];
    if (!fileValue) return;
    setFile(fileValue);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setAvatar(base64.toString());
      }
    };
    reader.readAsDataURL(fileValue);
  };

  const onRemoveAvatar = async () => {
    const thumbnail = watch('creatorThumbnail');
    if (thumbnail && thumbnail !== '') {
      await deleteImage(thumbnail);
    }
    setValue('creatorThumbnail', '');
    setAvatar(null);
    setFile(null);
  };
  useEffect(() => {
    if (data?.creator) {
      reset({
        creatorName: data.creator.creatorName,
        creatorTags: data.creator.creatorTags ?? [],
        creatorThumbnail: data.creator.creatorThumbnail ?? '',
        creatorDesc: data.creator.creatorDesc ?? '',
      });
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        <Flex flexDir='column' gap='10px'>
          <Avatar
            loading='lazy'
            size='2xl'
            bg='gray.200'
            src={avatar || `${process.env.NEXT_PUBLIC_IMAGE_URL}/${watch('creatorThumbnail')}`}
          />
          {/* <Avatar loading='lazy' size='2xl' src={foo} /> */}
          <Button size='sm' colorScheme='blue' type='button' onClick={() => fileRef.current?.click()}>
            이미지 업로드
          </Button>
          <Button size='sm' variant='ghost' colorScheme='blue' type='button' onClick={onRemoveAvatar}>
            이미지 제거
          </Button>
        </Flex>
        <Divider orientation='vertical' mx='1.5rem' height='auto' w='1px' />
        <Box flex={1}>
          <Text as='h2' fontSize='2.25rem' fontWeight='bold'>
            {watch('creatorName')}
          </Text>
          <Textarea mt='1.5rem' resize='none' h='180px' {...register('creatorDesc')} />
        </Box>
      </Flex>
      <Flex mt='4rem' gap='20px' flexDir='column'>
        <Flex gap='10px' flex={1} alignItems='flex-start'>
          <Text paddingBottom='0.375rem' fontWeight={500} w='160px'>
            작가태그
          </Text>
          <Flex flexDir='column' gap='10px' flex={1}>
            <InputGroup>
              <Input
                placeholder='작가태그를 입력해주세요'
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
              />
              <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
                {errors.creatorTags?.message}
              </Text>
              <InputRightElement mr='0.6rem'>
                <Button size='sm' type='button' colorScheme='blue' onClick={onAddTag}>
                  추가
                </Button>
              </InputRightElement>
            </InputGroup>
            <HStack flexWrap='wrap' gap='0.5rem'>
              {watch('creatorTags')?.map((tag: string) => (
                <Tag key={tag} size='lg' colorScheme='blue'>
                  {tag}
                  <TagCloseButton onClick={() => onRemoveTag(tag)} />
                </Tag>
              ))}
            </HStack>
          </Flex>
        </Flex>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            등록한 작품
          </Text>
          {data?.art?.length === 0 ? (
            <Box textAlign='center' py='40px' mx='auto'>
              <Text fontWeight={500} color='gray.500' fontSize='20px'>
                등록한 작품이 없습니다.
              </Text>
              <Button size='sm' type='button' colorScheme='blue' mt='20px'>
                경매 올리기
              </Button>
            </Box>
          ) : (
            <Box>{data?.art?.map(art => <Box key={art.id}>{art.url}</Box>)}</Box>
          )}
        </Box>
      </Flex>
      <Flex mt='40px' gap='20px' mx='auto' justifyContent='center'>
        <Button variant='outline' type='button' colorScheme='blue' onClick={() => router.back()}>
          취소
        </Button>
        <Button type='submit' colorScheme='blue' isLoading={isPending} loadingText='저장중...'>
          저장
        </Button>
      </Flex>
      <input type='file' accept='image/*' hidden ref={fileRef} onChange={onChangeFileInput} />
    </form>
  );
}

export default MyCreatorDetail;
