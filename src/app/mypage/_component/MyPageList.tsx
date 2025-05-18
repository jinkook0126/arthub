'use client';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, Divider } from '@chakra-ui/react';
import NextLink from 'next/link';

function MyPageList() {
  return (
    <Box>
      <Box pt='20px' pb='16px'>
        <Box py='20px'>
          <Text fontSize='18px' fontWeight={700} color='black'>
            경매
          </Text>
        </Box>
        <Flex justify='space-between' align='center' py='16px' as={NextLink} href='/mypage/auction'>
          <Text fontWeight='500'>내가 참여한 작품</Text>
          <ChevronRightIcon w='24px' height='24px' color='gray.500' />
        </Flex>
      </Box>
      <Divider />
      <Box pt='20px' pb='16px'>
        <Box py='20px'>
          <Text fontSize='18px' fontWeight={700} color='black'>
            설정
          </Text>
        </Box>
        <Flex justify='space-between' align='center' py='16px' as={NextLink} href='/chage-pw'>
          <Text fontWeight='500'>비밀번호 변경</Text>
          <ChevronRightIcon w='24px' height='24px' color='gray.500' />
        </Flex>
      </Box>
    </Box>
  );
}

export default MyPageList;
