'use client';

import { useQuery } from '@tanstack/react-query';
import { Center, Grid, Text, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import getBidHistory from '../_lib/getBidHistory';
import BidHistoryItem from './BidHistoryItem';

function BidHistoryList() {
  const { data } = useQuery({ queryKey: ['bidHistory'], queryFn: getBidHistory });
  if (!data?.list || data.list.length === 0) {
    return (
      <Flex flexDirection='column' align='center' justify='center'>
        <Text fontSize='32px' color='gray.500' textAlign='center' mt='100px'>
          응찰한 작품이 없습니다.
        </Text>
        <Center
          as={NextLink}
          href='/auction'
          mt='24px'
          px='20px'
          h='40px'
          borderRadius='3px'
          bg='blue.300'
          _hover={{ bg: 'blue.400' }}
        >
          <Text color='white' fontWeight='bold' fontSize='16px'>
            경매 둘러보기
          </Text>
        </Center>
      </Flex>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      rowGap='2.5rem'
      columnGap='1.25rem'
      mt='24px'
      mb='120px'
    >
      {data.list.map(item => (
        <BidHistoryItem art={item} key={`art-${item.id}`} />
      ))}
    </Grid>
  );
}

export default BidHistoryList;
