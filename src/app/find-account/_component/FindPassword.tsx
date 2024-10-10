import { Box, Text, Card, Flex, Input, Button } from '@chakra-ui/react';

function FindPassword() {
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
        비밀번호 찾기
      </Text>
      <Card maxW='26.5rem' p={{ base: '2.5rem', xl: 0 }} mx='auto' boxShadow={{ base: undefined, xl: 'none' }}>
        <Flex direction='column' gap='1.5rem'>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              가입한 이메일 주소를 입력해주세요
            </Text>
            <Input placeholder='hello@arthub.com' />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              이메일 주소를 입력해주세요.
            </Text>
          </Box>
          <Text fontSize='0.875rem' color='gray.400'>
            가입하신 이메일 주소를 입력해주시면
            <br />
            새로운 비밀번호를 설정 가능한 링크를 보내드립니다.
          </Text>
          <Button colorScheme='blue' mt={4}>
            <Text fontWeight={400} fontSize='1rem'>
              이메일 전송하기
            </Text>
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
export default FindPassword;
