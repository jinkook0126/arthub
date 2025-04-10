import { Flex } from '@chakra-ui/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CreatorDetailContainer from './_component/CreatorDetailContainer';
import getCreatorDetail from './_lib/getCreatorDetail';

type PageProps = {
  params: {
    id: number;
  };
};

const creatorDetailPage = async ({ params }: PageProps) => {
  const creatorId = params.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['creators', creatorId],
    queryFn: getCreatorDetail,
  });
  return (
    <Flex flexDir='column' flexGrow={1} w='100%'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreatorDetailContainer />
      </HydrationBoundary>
    </Flex>
  );
};
export default creatorDetailPage;
