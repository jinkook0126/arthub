'use client';

import { HStack } from '@chakra-ui/react';
import { useState } from 'react';
import SaleStatusTabButton from './SaleStatusTabButton';

function SaleStatusTabs() {
  const [tab, setTab] = useState('sale');
  return (
    <HStack gap='1rem'>
      <SaleStatusTabButton label='판매중' callback={() => setTab('sale')} isActive={tab === 'sale'} />
      <SaleStatusTabButton label='종료' callback={() => setTab('end')} isActive={tab === 'end'} />
    </HStack>
  );
}
export default SaleStatusTabs;
