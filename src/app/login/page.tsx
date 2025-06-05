import { Box, Text, Card, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import LoginForm from './_component/LoginForm';

function LoginPage() {
  return (
    <Box pb='5rem' pt={{ base: '5rem', xl: '2.5rem' }} bg={{ base: 'gray.100', xl: 'white' }} flexGrow={1}>
      <Text
        as='h2'
        mb='2.5rem'
        fontSize={{ base: '2.125rem', xl: '1.75rem' }}
        fontWeight={500}
        textAlign={{ base: 'center', xl: 'left' }}
        pl={{ base: 0, xl: '1rem' }}
      >
        로그인
      </Text>
      <Card maxW='26.5rem' p={{ base: '2.5rem', xl: 0 }} mx='auto' boxShadow={{ base: undefined, xl: 'none' }}>
        <LoginForm />
        <Flex mt={4} align='center' justify='center' h='100%'>
          <Link href='/find-account/email' as={NextLink}>
            <Text color='gray.500' fontSize='0.875rem'>
              이메일 찾기
            </Text>
          </Link>
          <Box w='0.0625rem' h='0.75rem' mx='0.75rem' bg='gray.300' />
          <Link href='/find-account/password' as={NextLink}>
            <Text color='gray.500' fontSize='0.875rem'>
              비밀번호 찾기
            </Text>
          </Link>
          <Box w='0.0625rem' h='0.75rem' mx='0.75rem' bg='gray.300' />
          <Link href='/sign-up' as={NextLink}>
            <Text color='gray.500' fontSize='0.875rem'>
              회원가입
            </Text>
          </Link>
        </Flex>
      </Card>
    </Box>
  );
}
export default LoginPage;
