'use client';

import getCreatorDetail from '@/app/creators/[id]/_lib/getCreatorDetail';
import {
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
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function MyCreatorDetail() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = useQuery({ queryKey: ['creators', session?.user.creatorId], queryFn: getCreatorDetail });
  if (!data) {
    return null;
  }
  return (
    <Box>
      <Flex>
        <Flex flexDir='column' gap='10px'>
          <Button size='sm' colorScheme='blue' type='button'>
            이미지 업로드
          </Button>
          <Button size='sm' variant='ghost' colorScheme='blue' type='button'>
            이미지 제거
          </Button>
        </Flex>
        <Divider orientation='vertical' mx='1.5rem' height='auto' w='1px' />
        <Box flex={1}>
          <Text as='h2' fontSize='2.25rem' fontWeight='bold'>
            {data.creator.creatorName}
          </Text>
          <Textarea mt='1.5rem' resize='none' h='180px'>
            {data.creator.creatorDesc}
          </Textarea>
        </Box>
      </Flex>
      <Flex mt='4rem' gap='20px' flexDir='column'>
        <Flex gap='10px' flex={1} alignItems='flex-start'>
          <Text paddingBottom='0.375rem' fontWeight={500} w='160px'>
            작가태그
          </Text>
          <Flex flexDir='column' gap='10px' flex={1}>
            <InputGroup>
              <Input placeholder='작가태그를 입력해주세요' />
              <InputRightElement mr='0.6rem'>
                <Button size='sm' type='button' colorScheme='blue'>
                  추가
                </Button>
              </InputRightElement>
            </InputGroup>
            <HStack flexWrap='wrap' gap='0.5rem'>
              {data.creator.creatorTags?.map((tag: string) => (
                <Tag key={tag} size='lg' colorScheme='blue'>
                  {tag}
                  <TagCloseButton />
                </Tag>
              ))}
            </HStack>
          </Flex>
        </Flex>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            등록한 작품
          </Text>
          {data.art.length === 0 ? (
            <Box textAlign='center' py='40px' mx='auto'>
              <Text fontWeight={500} color='gray.500' fontSize='20px'>
                등록한 작품이 없습니다.
              </Text>
              <Button size='sm' type='button' colorScheme='blue' mt='20px'>
                경매 올리기
              </Button>
            </Box>
          ) : (
            <Box>
              {data.art.map(art => (
                <Box key={art.id}>{art.url}</Box>
              ))}
            </Box>
          )}
        </Box>
      </Flex>
      <Flex mt='40px' gap='20px' mx='auto' justifyContent='center'>
        <Button variant='outline' type='button' colorScheme='blue' onClick={() => router.back()}>
          취소
        </Button>
        <Button type='submit' colorScheme='blue'>
          저장
        </Button>
      </Flex>
      <input type='file' accept='image/*' hidden />
    </Box>
  );
}

export default MyCreatorDetail;
