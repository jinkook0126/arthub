import { changeRoleSchema, ChangeRoleFormValues } from '@/schemas/changeRoleSchema';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatorSignUpdate } from './CreatorSignContext';

function CreatorInfoPage() {
  const { setCreatorForm, setImageFile, setPage } = useCreatorSignUpdate();
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
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

  const onChangeCreator = async (data: ChangeRoleFormValues) => {
    setCreatorForm(data);
    if (file) {
      setImageFile(file);
    }
    setPage('user-info');
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
        <Button type='submit' colorScheme='blue'>
          다음
        </Button>
      </Flex>
      <input type='file' accept='image/*' hidden ref={fileRef} onChange={onChangeFileInput} />
    </form>
  );
}

export default CreatorInfoPage;
