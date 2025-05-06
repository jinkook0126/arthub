'use client';

import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import OrderButtonList, { type OrderOption } from './OrderButtonList';
import AuctionItem from './AuctionItem';
import getAuctionList from '../_lib/getAuctionList';
import { useAuctionState } from './AuctionContext';

function AuctionList() {
  const { data } = useQuery({ queryKey: ['auction'], queryFn: getAuctionList });
  const { saleStatus } = useAuctionState();
  const [order, setOrder] = useState<OrderOption>('최신순');
  const safeData = data?.art ?? [];
  const sortedList = useMemo(
    () =>
      [...safeData]
        .filter(item => {
          if (saleStatus === 'sale') {
            return item.isAuctionActive;
          }
          return !item.isAuctionActive;
        })
        .sort((a, b) => {
          switch (order) {
            case '최신순':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case '응찰순':
              return b.bidCount - a.bidCount;
            case '높은 가격 순':
              return b.currentPrice - a.currentPrice;
            case '낮은 가격 순':
              return a.currentPrice - b.currentPrice;
            default:
              return 0;
          }
        }),
    [data, order, saleStatus],
  );

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
        <OrderButtonList onChangeOrder={setOrder} />
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
        {sortedList.map(item => (
          <AuctionItem art={item} key={`art-${item.id}`} />
        ))}
      </Grid>
    </Box>
  );
}
export default AuctionList;
