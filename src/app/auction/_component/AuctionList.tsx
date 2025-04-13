'use client';

import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import OrderButtonList from './OrderButtonList';
import AuctionItem from './AuctionItem';
import getAuctionList from '../_lib/getAuctionList';

function AuctionList() {
  const { data } = useQuery({ queryKey: ['auction'], queryFn: getAuctionList });

  if (!data) {
    return null;
  }
  return (
    <Box as='section'>
      <Flex justify='space-between' align='center'>
        <Text fontSize='0.875rem' color='gray.400'>
          <Text as='strong' color='black'>
            {data.art.length}
          </Text>
          개 작품
        </Text>
        <OrderButtonList />
      </Flex>
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
        {data.art.map(item => (
          <AuctionItem art={item} key={`art-${item.id}`} />
        ))}
      </Grid>
    </Box>
  );
}
export default AuctionList;
