import { Flex, Box } from '@chakra-ui/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Banner from './_component/Banner';
import RankingList from './_component/RankingLIst';
import ArtistList from './_component/AristList';
import getMain from './_lib/getMain';

export default function page() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ['main'],
    queryFn: getMain,
  });
  return (
    <Box>
      <Banner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Box flexGrow={1} maxW='1280px' mx='auto'>
          <Flex mt='5rem' gap='5rem' flexDirection='column' mb='10rem'>
            <Box px={{ base: '16px', md: 0 }}>
              <RankingList />
            </Box>
            <Box px={{ base: '16px', md: 0 }}>
              <ArtistList />
            </Box>
          </Flex>
        </Box>
      </HydrationBoundary>
    </Box>
  );
}
