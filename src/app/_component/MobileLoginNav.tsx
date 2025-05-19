'use client';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Divider, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function MobileLoginNav({ onClose }: { onClose: () => void }) {
  return (
    <Box>
      <Text fontWeight={500}>로그인 해주세요</Text>
      <Link
        href='/login'
        as={NextLink}
        fontWeight={400}
        fontSize='0.875rem'
        color='gray.500'
        mt={1}
        _hover={{
          textDecoration: 'none',
        }}
        onClick={onClose}
      >
        로그인
        <ChevronRightIcon w={4} h={4} ml={1} />
      </Link>
      <Divider my={6} />
      <Link
        href='/'
        as={NextLink}
        fontSize='1rem'
        fontWeight={500}
        color='gray.800'
        _hover={{
          textDecoration: 'none',
        }}
      >
        회원가입
      </Link>
    </Box>
  );
}
