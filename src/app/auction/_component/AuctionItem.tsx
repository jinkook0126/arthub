'use client';

import { useState } from 'react';
import { Image, Text, Box, Divider, Flex, GridItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IArt } from '@/model/art';
import dayjs from 'dayjs';

interface Props {
  art: IArt;
}
function AuctionItem({ art }: Props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <GridItem
      as={NextLink}
      href={`/auction/detail/${art.id}`}
      w='100%'
      minH='376px'
      display='flex'
      flexDir='column'
      gap='1.25rem'
      cursor='pointer'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Flex
        w='100%'
        minH={{ base: '210px', sm: '280px' }}
        p='0.625rem'
        borderRadius='0.5rem'
        bg='gray.50'
        overflow='hidden'
        justify='center'
        align='center'
      >
        <Box h={{ base: '11.875rem', sm: '15.75rem' }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${art.url}`}
            w='100%'
            h='100%'
            objectFit='contain'
            transition='transform 0.3s ease-in-out'
            transform={isHover ? 'scale(1.1)' : 'scale(1)'}
          />
        </Box>
      </Flex>
      <Box>
        <Text fontWeight={700} fontSize='1.25rem' color='black'>
          {art.Creators.creatorName}
        </Text>
        <Text fontSize='0.875rem' color='gray.400'>
          {art.artTitle}
        </Text>
      </Box>
      <Divider />
      <Flex flexDir='column' gap='8px'>
        <Box>
          <Text fontSize='0.875rem' color='gray.400'>
            시작가
          </Text>
          <Text fontWeight={700} fontSize='1.25rem' color='black'>
            {art.startingPrice.toLocaleString()}
          </Text>
        </Box>
        <Box>
          <Text fontSize='0.875rem' color='gray.400'>
            현재가
          </Text>
          <Text fontWeight={700} fontSize='1.25rem' color='red.400'>
            {art.currentPrice.toLocaleString()}
          </Text>
        </Box>
      </Flex>
      <Divider />
      <Flex align='center' gap='8px'>
        <Box bg='gray.100' p='4px' borderRadius='4px'>
          <Text fontSize='0.7rem' color='gray.500'>
            {dayjs(art.auctionEndAt).format('YYYY-MM-DD')}
          </Text>
        </Box>
        <Box bg='red.50' p='4px' borderRadius='4px'>
          <Text fontSize='0.7rem' color='red.500'>
            응찰 {art.bidCount}회
          </Text>
        </Box>
      </Flex>
    </GridItem>
  );
}
export default AuctionItem;
