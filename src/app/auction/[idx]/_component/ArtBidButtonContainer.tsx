'use client';

import { Flex } from '@chakra-ui/react';
import { BidBtn } from './BidBtn';
import { BuyoutBtn } from './BuyoutBtn';

function ArtBidButtonContainer() {
  return (
    <Flex gap='12px'>
      <BidBtn />
      <BuyoutBtn />
    </Flex>
  );
}

export default ArtBidButtonContainer;
