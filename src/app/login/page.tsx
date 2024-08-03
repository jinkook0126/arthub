'use client';

import { Box, Text, Card, Flex, Input, Button, useMediaQuery } from '@chakra-ui/react';

function LoginPage() {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  return (
    <Box pb='5rem' pt={isLargerThan992 ? '5rem' : '2.5rem'} bg={isLargerThan992 ? 'gray.100' : 'white'} flexGrow={1}>
      <Text
        as='h2'
        mb='2.5rem'
        fontSize={isLargerThan992 ? '2.125rem' : '1.75rem'}
        fontWeight={500}
        textAlign={isLargerThan992 ? 'center' : 'left'}
        pl={isLargerThan992 ? 0 : '1rem'}
      >
        로그인
      </Text>
      <Card maxW='26.5rem' p='2.5rem' mx='auto'>
        <Flex direction='column' gap='1.5rem'>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              이메일
            </Text>
            <Input placeholder='hello@arthub.com' />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              이메일 주소를 입력해주세요.
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              비밀번호
            </Text>
            <Input placeholder='비밀번호를 입력해 주세요.' borderColor='red.400' />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              비밀번호를 입력해주세요.
            </Text>
          </Box>
          <Button colorScheme='blue'>
            <Text fontWeight={400} fontSize='1rem'>
              이메일 로그인
            </Text>
          </Button>
        </Flex>
        <Flex mt={4} align='center' justify='center' h='100%'>
          <Text color='gray.500' fontSize='0.875rem'>
            이메일 찾기
          </Text>
          <Box w='0.0625rem' h='0.75rem' mx='0.75rem' bg='gray.300' />
          <Text color='gray.500' fontSize='0.875rem'>
            비밀번호 찾기
          </Text>
          <Box w='0.0625rem' h='0.75rem' mx='0.75rem' bg='gray.300' />
          <Text color='gray.500' fontSize='0.875rem'>
            회원가입
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}
export default LoginPage;
