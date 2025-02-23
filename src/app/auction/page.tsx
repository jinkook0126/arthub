import { Flex } from '@chakra-ui/react';
import SearchFilter from './_component/SearchFilter';
import AuctionList from './_component/AuctionList';

export default function Home() {
  return (
    <Flex flexDir='column' flexGrow={1} maxW='1280px' mx='auto' w='100%' px={{ base: '16px', xl: 0 }}>
      <SearchFilter />
      <AuctionList />
    </Flex>
  );
}
