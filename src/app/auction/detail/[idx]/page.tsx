'use client';

import { Image, Center, Box, Flex, Text, VStack, Divider, useMediaQuery } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import ArtDetail from './_component/ArtDetail';
import useArtDetail from './_lib/useArtDetail';
import ArtBidButtonContainer from './_component/ArtBidButtonContainer';

function AuctionDetail() {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const { idx } = useParams();
  const { data } = useArtDetail({ id: Number(idx) });
  if (!data) return <Box flexGrow={1}>loading...</Box>;
  return (
    <Box as='main' flexGrow={1} height='100%'>
      <Box maxW='1280px' mx='auto' mb='140px'>
        <Flex
          as='article'
          pt='3rem'
          flexWrap='wrap'
          justify='space-between'
          pos='relative'
          gap='80px'
          px={{ base: '1.25rem', xl: 0 }}
          flexDir={{ base: 'column', xl: 'row' }}
        >
          <Box flex={1}>
            <Center
              bg='#f3f3f3'
              borderRadius='0.375rem'
              w='100%'
              overflow='hidden'
              height={{ base: '400px', xl: '530px' }}
            >
              <Box w='100%' height={{ base: '400px', xl: '530px' }} pos='relative'>
                <Image
                  pos='absolute'
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data.art.url}`}
                  objectFit='contain'
                  w='100%'
                  h='100%'
                />
              </Box>
            </Center>
            <Divider my='60px' />
            <ArtDetail detail={data.art} />
          </Box>
          <Box w={{ base: '100%', xl: '28rem' }} pos='sticky' bottom={0} bg='white'>
            <Box pos='sticky' top='calc(3.625rem + 3rem)' overflowX='hidden' overflowY='scroll'>
              {isLargerThan992 && (
                <Box>
                  <Text fontSize='28px' fontWeight={700} color='black'>
                    {data.art.Creators.creatorName}
                  </Text>
                  <Text fontSize='20px' color='gray.700' my='13px' lineHeight='1.5em'>
                    {data.art.artTitle}
                  </Text>
                  <Box mb='20px'>
                    <Text fontSize='14px'>{data.art.artMaterial}</Text>
                    <Text fontSize='14px'>{data.art.artSize}</Text>
                  </Box>
                  <VStack py='20px' borderColor='gray.200' borderBottomWidth={1} borderTopWidth={1} gap='10px'>
                    <Flex w='100%' align='center' justify='space-between' fontWeight={500} fontSize='14px'>
                      <Text color='gray.600'>시작가</Text>
                      <Text color='black'>KRW {data.art.startingPrice.toLocaleString()}</Text>
                    </Flex>
                    <Flex w='100%' align='center' justify='space-between' fontWeight={500} fontSize='14px'>
                      <Text color='gray.600'>현재가</Text>
                      <Text color='black'>KRW {data.art.currentPrice.toLocaleString()}</Text>
                    </Flex>
                    <Flex w='100%' align='center' justify='space-between' fontWeight={500} fontSize='14px'>
                      <Text color='gray.600'>즉시 구매가</Text>
                      <Text color='black'>KRW {data.art.buyoutPrice.toLocaleString()}</Text>
                    </Flex>
                  </VStack>
                </Box>
              )}

              <Box mb={{ base: '10px', xl: '0px' }} mt={{ base: '10px', xl: '40px' }}>
                <Center p='6px' bg='gray.100' fontSize='12px' fontWeight={500} mb='10px' borderRadius='3px'>
                  <Text>
                    마감시간
                    <Text color='blue.400' as='span' pl='8px'>
                      {dayjs(data.art.auctionEndAt).format('YYYY/MM/DD')}
                    </Text>
                  </Text>
                </Center>
                <ArtBidButtonContainer />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
export default AuctionDetail;
