'use client';

import { Flex, Text, Box, Center, Img } from '@chakra-ui/react';

function Banner() {
  return (
    <Flex w='60.625rem' h={250}>
      <Flex w='38%' pl='32px' flexDirection='column' justifyContent='center' bg='orange.50'>
        <Text fontWeight='bold' fontSize='xl'>
          Elevate Your Art&apos;s Value with ArtHub
        </Text>
        <Text mt={6} fontSize='sm'>
          당신의 소중한 작품, <br />
          아트허브가 그 가치를 높여드립니다.
        </Text>
      </Flex>
      <Box
        pos='relative'
        w='62%'
        backgroundImage="url('/assets/image/banner.jpg')"
        backgroundSize='250%'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        height={250}
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
          <Img src='/assets/image/banner.jpg' w='280px' borderRadius='5px' boxShadow='0px 0px 6px 0px #222222' />
        </Center>
      </Box>
    </Flex>
  );
}
export default Banner;
