import { Button, Card, Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

function EmailResult({ email }: { email: string }) {
  return (
    <Card maxW='26.5rem' p={{ base: '2.5rem', xl: 0 }} mx='auto' boxShadow={{ base: undefined, xl: 'none' }}>
      <Text fontSize={{ base: '1rem', md: '1.5rem' }} fontWeight={500} color='gray.500'>
        입력된 정보로 가입된 이메일은
        <br />
        <Text as='span' color='blue.500' mr='2px' fontWeight='bold' fontSize='1.5rem'>
          {email}
        </Text>
        입니다.
      </Text>
      <Flex mt='30px' gap='20px' mx='auto' justifyContent='center'>
        <Button as={NextLink} href='/login' variant='outline' colorScheme='blue'>
          로그인
        </Button>
        <Button as={NextLink} href='/find-account/password' colorScheme='blue'>
          비밀번호 찾기
        </Button>
      </Flex>
    </Card>
  );
}

export default EmailResult;
