import { Flex } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';
import SearchFilter from './_component/SearchFilter';
import AuctionList from './_component/AuctionList';
import getAuctionList from './_lib/getAuctionList';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['auction'],
    queryFn: getAuctionList,
  });

  return (
    <Flex flexDir='column' flexGrow={1} maxW='1280px' mx='auto' w='100%' px={{ base: '16px', xl: 0 }}>
      <SearchFilter />
      <AuctionList />
    </Flex>
  );
}
