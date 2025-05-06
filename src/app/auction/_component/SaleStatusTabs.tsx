'use client';

import { HStack } from '@chakra-ui/react';
import SaleStatusTabButton from './SaleStatusTabButton';
import { useAuctionState, useAuctionUpdate } from './AuctionContext';

function SaleStatusTabs() {
  const { saleStatus } = useAuctionState();
  const { setSaleStatus } = useAuctionUpdate();
  return (
    <HStack gap='1rem'>
      <SaleStatusTabButton label='판매중' callback={() => setSaleStatus('sale')} isActive={saleStatus === 'sale'} />
      <SaleStatusTabButton label='종료' callback={() => setSaleStatus('end')} isActive={saleStatus === 'end'} />
    </HStack>
  );
}
export default SaleStatusTabs;
