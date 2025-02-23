'use client';

import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SaleStatusTabs from './SaleStatusTabs';

function SearchFilter() {
  return (
    <Flex
      as='section'
      justify='space-between'
      w='100%'
      my='1.5rem'
      flexDir={{ base: 'column', xl: 'row' }}
      gap={{ base: '12px', xl: 0 }}
    >
      <SaleStatusTabs />
      <InputGroup w={{ base: '100%', xl: '25rem' }}>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input type='tel' placeholder='작가, 작품명 검색' variant='flushed' />
      </InputGroup>
    </Flex>
  );
}
export default SearchFilter;
