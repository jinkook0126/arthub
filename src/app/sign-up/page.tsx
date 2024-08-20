'use client';

import { Box, Text, Card, Flex, Input, Button, useMediaQuery, VStack, Checkbox, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

function SignUpPage() {
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
        아트허브에 오신 것을 환영합니다
      </Text>
      <Card
        maxW='26.5rem'
        p={isLargerThan992 ? '2.5rem' : 0}
        mx='auto'
        boxShadow={isLargerThan992 ? undefined : 'none'}
      >
        <Flex direction='column' gap='1.5rem'>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              이름
            </Text>
            <Input placeholder='이름(실명)을 입력해주세요' />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              이름을 입력해주세요.
            </Text>
          </Box>
          <Box>
            <Text paddingBottom='0.375rem' fontWeight={500}>
              이메일
            </Text>
            <Input placeholder='hello@arthub.com' borderColor='red.400' />
            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              이메일 주소 입력해주세요.
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
          <Box>
            <Box py={4} borderBottomWidth={1}>
              <Checkbox colorScheme='blue' size='lg' spacing={2}>
                <Text fontSize='16px' fontWeight={500}>
                  약관 전체 동의
                </Text>
              </Checkbox>
            </Box>
            <VStack spacing={5} py={5} align='flex-start'>
              <Box>
                <Checkbox colorScheme='blue' size='lg' spacing={2}>
                  <Flex gap={1.5}>
                    <Text fontSize='14px' color='gray.600'>
                      학습용 사이트입니다.
                    </Text>
                    <Text fontSize='14px' color='gray.400'>
                      (필수)
                    </Text>
                  </Flex>
                </Checkbox>
              </Box>
              <Box>
                <Checkbox colorScheme='blue' size='lg' spacing={2}>
                  <Flex gap={1.5}>
                    <Link
                      href='/'
                      as={NextLink}
                      fontSize='14px'
                      fontWeight={500}
                      color='gray.600'
                      textDecoration='underline'
                    >
                      이용약관 동의
                    </Link>
                    <Text fontSize='14px' color='gray.400'>
                      (필수)
                    </Text>
                  </Flex>
                </Checkbox>
              </Box>
              <Box>
                <Checkbox colorScheme='blue' size='lg' spacing={2}>
                  <Flex gap={1.5}>
                    <Link
                      href='/'
                      as={NextLink}
                      fontSize='14px'
                      fontWeight={500}
                      color='gray.600'
                      textDecoration='underline'
                    >
                      개인정보 수집 및 이용 동의
                    </Link>
                    <Text fontSize='14px' color='gray.400'>
                      (필수)
                    </Text>
                  </Flex>
                </Checkbox>
              </Box>
              <Box>
                <Checkbox colorScheme='blue' size='lg' spacing={2}>
                  <Flex gap={1.5}>
                    <Link
                      href='/'
                      as={NextLink}
                      fontSize='14px'
                      fontWeight={500}
                      color='gray.600'
                      textDecoration='underline'
                    >
                      피드백 요청
                    </Link>
                    <Text fontSize='14px' color='gray.400'>
                      (선택)
                    </Text>
                  </Flex>
                </Checkbox>
              </Box>
            </VStack>
          </Box>
          <Button colorScheme='blue'>
            <Text fontWeight={400} fontSize='1rem'>
              회원가입
            </Text>
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
export default SignUpPage;
