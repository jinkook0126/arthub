import { Flex } from '@chakra-ui/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CreatorsContainer from './_component/CreatorsContainer';
import getCreatorsList from './_lib/getCreatorsList';

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['creators'],
    queryFn: getCreatorsList,
  });
  return (
    <Flex gap='2.5rem' flexDir='column' flexGrow={1} maxW='1280px' mx='auto' w='100%'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreatorsContainer />
      </HydrationBoundary>
    </Flex>
  );
};
export default page;
