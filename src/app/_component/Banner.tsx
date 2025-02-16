'use client';

import { Flex, Text, Box, Center, Img } from '@chakra-ui/react';

function Banner() {
  return (
    <Flex h={{ base: '410px', xl: '350px' }} position='relative' flexDir={{ base: 'column-reverse', xl: 'row' }}>
      <Box
        position='absolute'
        maxW='1280px'
        mx='auto'
        left={0}
        right={0}
        top={{ base: 'unset', xl: '40%' }}
        bottom={{ base: '30px', xl: 'unset' }}
        textAlign={{ base: 'center', xl: 'left' }}
      >
        <Text fontWeight='bold' fontSize='xl'>
          Elevate Your Art&apos;s Value with ArtHub
        </Text>
        <Text mt={6} fontSize='sm'>
          당신의 소중한 작품, <br />
          아트허브가 그 가치를 높여드립니다.
        </Text>
      </Box>
      <Flex w={{ base: '100%', xl: '42%' }} bg='orange.50' height={{ base: '150px', xl: '100%' }} />
      <Box
        pos='relative'
        flex={1}
        w={{ base: '100%', xl: '58%' }}
        backgroundImage="url('/assets/image/banner.jpg')"
        backgroundSize='250%'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(7px)',
          zIndex: 1,
        }}
      >
        <Center pos='relative' zIndex={2} h='100%'>
          <Img
            src='/assets/image/banner.jpg'
            w={{ base: '380px', xl: '500px' }}
            borderRadius='5px'
            boxShadow='0px 0px 6px 0px #222222'
          />
        </Center>
      </Box>
    </Flex>
  );
}
export default Banner;
