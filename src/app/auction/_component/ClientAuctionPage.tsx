'use client';

import { Flex } from '@chakra-ui/react';
import SearchFilter from './SearchFilter';
import AuctionList from './AuctionList';
import { AuctionProvider } from './AuctionContext';

function ClientAuctionPage() {
  return (
    <AuctionProvider>
      <Flex flexDir='column' flexGrow={1} maxW='1280px' mx='auto' w='100%' px={{ base: '16px', xl: 0 }}>
        <SearchFilter />
        <AuctionList />
      </Flex>
    </AuctionProvider>
  );
}
export default ClientAuctionPage;
