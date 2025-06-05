import { Box, Link, HStack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

function LoginNav() {
  return (
    <nav>
      <HStack spacing='18px'>
        <Link
          href='/login'
          as={NextLink}
          fontSize='0.875rem'
          fontWeight={400}
          color='gray.800'
          textDecoration='none'
          _hover={{
            textDecoration: 'none',
          }}
        >
          로그인 / 회원가입
        </Link>
        <Box
          href='/sign-up/creator'
          as={NextLink}
          borderRadius='6px'
          px='14px'
          py='7px'
          bg='blue.400'
          _hover={{ bg: 'blue.500' }}
          cursor='pointer'
        >
          <Text color='white' fontWeight='bold' fontSize='14px'>
            작가가입
          </Text>
        </Box>
      </HStack>
    </nav>
  );
}

export default LoginNav;
