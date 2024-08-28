'use client';

import { Box, Text, Card, Flex, Button, useMediaQuery, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

function FindEmail() {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const [phone, setPhone] = useState<string>('');
  const handleClick = () => {};
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/-/g, '');
    if (v.length < 4) {
      setPhone(v);
    } else if (v.length < 7) {
      setPhone(v.replace(/^(\d{0,3})(\d{0,4})$/g, '$1-$2'));
    } else if (v.length < 11) {
      setPhone(v.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, '$1-$2-$3'));
    } else {
      setPhone(v.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3'));
    }
  };

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
        이메일 찾기
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
              휴대전화 번호
            </Text>
            <InputGroup size='md'>
              <Input type='tel' maxLength={13} placeholder='예) 010-1234-1234' onChange={onChangePhone} value={phone} />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick} colorScheme={phone.length >= 10 ? 'blue' : 'gray'}>
                  전송
                </Button>
              </InputRightElement>
            </InputGroup>

            <Text mt='0.25rem' fontSize='0.8rem' color='red.400'>
              휴대폰 번호를 입력해주세요
            </Text>
          </Box>
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
export default FindEmail;
