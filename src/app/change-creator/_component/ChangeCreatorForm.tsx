'use client';

import {
  Flex,
  Box,
  Text,
  Input,
  Avatar,
  Button,
  HStack,
  Tag,
  Textarea,
  InputGroup,
  InputRightElement,
  TagCloseButton,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { changeRoleSchema, ChangeRoleFormValues } from '@/schemas/changeRoleSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { uploadImage } from '@/utils/supbaseActions';
import { useMutation } from '@tanstack/react-query';
import { IBaseResponse } from '@/model/common';
import { useSession } from 'next-auth/react';

function ChangeCreatorForm() {
  const { update } = useSession();
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const router = useRouter();
  const [tagInput, setTagInput] = useState<string>('');
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ChangeRoleFormValues>({ resolver: zodResolver(changeRoleSchema) });
  const { mutate: changeCreator, isPending } = useMutation<IBaseResponse, Error, ChangeRoleFormValues>({
    mutationFn: async (formData: ChangeRoleFormValues) => {
      const res = await fetch('/api/user/change-role', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      return res.json();
    },
    onSuccess: async res => {
      toast({
        title: res.success ? '작가전환 성공' : '작가전환 실패',
        description: res.success ? '작가전환이 완료되었습니다.' : res.error,
        status: res.success ? 'success' : 'error',
      });
      if (res.success) {
        await update({ user: { role: 'creator' } });

        router.back();
      }
    },
    onError: () => {
      toast({
        title: '작가전환 실패',
        description: '작가전환에 실패했습니다.',
        status: 'error',
      });
    },
  });
  const onChangeCreator = async (data: ChangeRoleFormValues) => {
    await update({ user: { role: 'creator' } });
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
    changeCreator(data);
  };
  const onChangeTags = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
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
    clearErrors('creatorTags');
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
  const onRemoveAvatar = () => {
    setFile(null);
    setAvatar(null);
  };

  return (
    <form onSubmit={handleSubmit(onChangeCreator)}>
      <Flex direction='column' gap='1.5rem'>
        <Flex mx='auto' gap='1rem' flexDirection='column' alignItems='center'>
          <Avatar size='2xl' src={avatar || ''} />
          <Button size='sm' colorScheme='blue' type='button' onClick={() => fileRef.current?.click()}>
            이미지 업로드
          </Button>
          <Button size='sm' variant='ghost' colorScheme='blue' type='button' onClick={onRemoveAvatar}>
            이미지 제거
          </Button>
        </Flex>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            작가명
          </Text>
          <Input
            placeholder='작가(활동)명을 입력해주세요'
            borderColor={errors.creatorName ? 'red.400' : 'gray.300'}
            {...register('creatorName')}
          />
          <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
            {errors.creatorName?.message}
          </Text>
        </Box>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            작가태그
          </Text>
          <InputGroup>
            <Input placeholder='작가태그를 입력해주세요' value={tagInput} onChange={onChangeTags} />
            <InputRightElement mr='0.6rem'>
              <Button size='sm' onClick={onAddTag} type='button' colorScheme='blue'>
                추가
              </Button>
            </InputRightElement>
          </InputGroup>
          <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
            {errors.creatorTags?.message}
          </Text>
          <HStack mt='1rem' flexWrap='wrap' gap='0.5rem'>
            {watch('creatorTags')?.map((tag: string) => (
              <Tag key={tag} size='lg' colorScheme='blue'>
                {tag}
                <TagCloseButton onClick={() => onRemoveTag(tag)} />
              </Tag>
            ))}
          </HStack>
        </Box>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            작가소개
          </Text>
          <Textarea
            placeholder='작가소개를 입력해주세요'
            resize='none'
            h='180px'
            borderColor={errors.creatorDesc ? 'red.400' : 'gray.300'}
            {...register('creatorDesc')}
          />
        </Box>
      </Flex>
      <Flex mt='40px' gap='20px' mx='auto' justifyContent='center'>
        <Button variant='outline' type='button' colorScheme='blue' onClick={() => router.back()}>
          취소
        </Button>
        <Button type='submit' colorScheme='blue' isLoading={isPending}>
          작가전환
        </Button>
      </Flex>
      <input type='file' accept='image/*' hidden ref={fileRef} onChange={onChangeFileInput} />
    </form>
  );
}

export default ChangeCreatorForm;
