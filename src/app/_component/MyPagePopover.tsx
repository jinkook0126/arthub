'use client';

import { Box, Popover, PopoverTrigger, PopoverContent, Text, VStack } from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { UserIcon } from './UserIcon';

function MyPagePopover() {
  const { data: session } = useSession();
  const router = useRouter();

  const onLogout = () => {
    signOut();
    router.push('/');
  };
  return (
    <Popover>
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
              <Box w='100%' as={NextLink} href='/mypage' py='11px'>
                <Text fontSize='1rem'>마이페이지</Text>
              </Box>
              <Box w='100%' as={NextLink} href='/mypage/order' py='11px'>
                <Text fontSize='1rem'>작가전환</Text>
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
