'use client';

import { Box, Popover, PopoverTrigger, PopoverContent, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { UserIcon } from './UserIcon';

function MyPagePopover() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { data: session } = useSession();
  const onLogout = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <UserIcon boxSize='24px' cursor='pointer' />
      </PopoverTrigger>
      <PopoverContent
        border='none'
        borderRadius='4px'
        boxShadow='rgba(0, 0, 0, 0.1) 0px 0px 0.625rem 0px'
        w='240px'
        display='flex'
      >
        <Box p='22px 22px 0px'>
          <Text fontWeight='medium' fontSize='16px' color='black'>
            {session?.user?.name} 고객님
          </Text>
          <Box as='nav' p='16px 0px 20px' mb='20px'>
            <VStack gap={0}>
              <Box w='100%' as={NextLink} href='/mypage' py='11px' onClick={onClose}>
                <Text fontSize='1rem'>마이페이지</Text>
              </Box>
              <Box
                w='100%'
                as={NextLink}
                href={session?.user?.role === 'creator' ? '/mypage/creator' : '/change-creator'}
                py='11px'
                onClick={onClose}
              >
                <Text fontSize='1rem'>{session?.user?.role === 'creator' ? '작가페이지' : '작가전환'}</Text>
              </Box>
            </VStack>
          </Box>
        </Box>

        <Box as='button' onClick={onLogout} py='10px' px='20px' bg='gray.100' _hover={{ bg: 'gray.200' }}>
          <Text lineHeight='20px' fontSize='14px' color='gray.500' fontWeight={500}>
            로그아웃
          </Text>
        </Box>
      </PopoverContent>
    </Popover>
  );
}

export default MyPagePopover;
