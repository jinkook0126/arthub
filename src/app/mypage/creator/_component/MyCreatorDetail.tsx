'use client';

import getCreatorDetail from '@/app/creators/[id]/_lib/getCreatorDetail';
import { Box, Button, Divider, Flex, Input, InputGroup, InputRightElement, Text, Textarea } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

function MyCreatorDetail() {
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
      <Flex mt='4rem'>
        <Box>
          <Text paddingBottom='0.375rem' fontWeight={500}>
            작가태그
          </Text>
          <InputGroup>
            <Input placeholder='작가태그를 입력해주세요' />
            <InputRightElement mr='0.6rem'>
              <Button size='sm' type='button' colorScheme='blue'>
                추가
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
    </Box>
  );
}

export default MyCreatorDetail;
