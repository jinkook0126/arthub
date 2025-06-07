import { Box, Flex, Text, Center } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';

function MobileLoginMypage({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  const onSignOut = () => {
    onClose();
    signOut({ callbackUrl: '/' });
  };
  return (
    <Box>
      <Box pb='20px'>
        <Text fontSize='16px' fontWeight='bold'>
          {session?.user?.name} 고객님
        </Text>
        <Flex align='center' justify='space-between' mt='4px'>
          <Text fontSize='14px' color='black.100'>
            예치금
          </Text>
          <Text fontSize='14px' fontWeight='bold' color='blue.400'>
            {session?.user?.balance.toLocaleString()}원
          </Text>
        </Flex>
      </Box>
      <Flex gap='8px'>
        <Center
          flex={1}
          borderWidth={1}
          borderColor='gray.200'
          borderRadius='8px'
          p='10px 0px'
          as='button'
          onClick={onSignOut}
        >
          <Text fontSize='14px' fontWeight={500} color='gray.500'>
            로그아웃
          </Text>
        </Center>
        <Center
          flex={1}
          borderWidth={1}
          borderColor='gray.200'
          borderRadius='8px'
          p='10px 0px'
          as={NextLink}
          onClick={onClose}
          href={session?.user?.role === 'creator' ? '/mypage/creator' : '/change-creator'}
        >
          <Text fontSize='14px' fontWeight={500} color='gray.500'>
            {session?.user?.role === 'creator' ? '작가페이지' : '작가전환'}
          </Text>
        </Center>
      </Flex>
    </Box>
  );
}

export default MobileLoginMypage;
