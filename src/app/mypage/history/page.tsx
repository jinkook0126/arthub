import { Box, Text } from '@chakra-ui/react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import BidHistoryList from './_component/BidHistoryList';
import getBidHistory from './_lib/getBidHistory';

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['bidHistory'],
    queryFn: getBidHistory,
  });

  return (
    <Box
      as='main'
      pb='5rem'
      pt={{ base: '5rem', xl: '2.5rem' }}
      px='16px'
      bg='white'
      flexGrow={1}
      w='100%'
      maxW='75rem'
      mx='auto'
    >
      <Text
        as='h2'
        mb='2.5rem'
        fontSize={{ base: '2.125rem', xl: '1.75rem' }}
        fontWeight={500}
        textAlign={{ base: 'center', xl: 'left' }}
        pl={{ base: 0, xl: '1rem' }}
      >
        응찰한 작품
      </Text>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BidHistoryList />
      </HydrationBoundary>
    </Box>
  );
};

export default page;
