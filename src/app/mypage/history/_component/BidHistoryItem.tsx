'use client';

import { IBidHistoryItem } from '@/model/art';
import { Image, Box, Flex, GridItem, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';

function BidHistoryItem({ art }: { art: IBidHistoryItem }) {
  const [isHover, setIsHover] = useState(false);
  const isWinner = art.userId === art.Art.winnerId;
  return (
    <GridItem
      as={NextLink}
      href={`/auction/${art.artId}`}
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
        position='relative'
      >
        <Box h={{ base: '11.875rem', sm: '15.75rem' }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${art.Art.url}`}
            w='100%'
            h='100%'
            objectFit='contain'
            transition='transform 0.3s ease-in-out'
            transform={isHover ? 'scale(1.1)' : 'scale(1)'}
          />
        </Box>
        {isWinner && (
          <Box position='absolute' top='10px' right='0'>
            <Image src='/assets/image/winner.png' w='50px' objectFit='contain' />
          </Box>
        )}
      </Flex>
      <Flex flexDir='column' gap='8px'>
        <Box>
          <Text fontSize='0.875rem' color='gray.400'>
            현재가
          </Text>
          <Text fontWeight={700} fontSize='1.25rem' color='black'>
            {art.Art.currentPrice.toLocaleString()}
          </Text>
        </Box>
        <Box>
          <Text fontSize='0.875rem' color='gray.400'>
            응찰가
          </Text>
          <Text fontWeight={700} fontSize='1.25rem' color='red.400'>
            {art.bidAmount.toLocaleString()}
          </Text>
        </Box>
      </Flex>
    </GridItem>
  );
}

export default BidHistoryItem;
