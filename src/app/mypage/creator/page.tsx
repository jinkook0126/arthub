import getCreatorDetail from '@/app/creators/[id]/_lib/getCreatorDetail';
import { Box, Text } from '@chakra-ui/react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { auth } from '@/auth';
import MyCreatorDetail from './_component/MyCreatorDetail';

const page = async () => {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['creators', session?.user.creatorId],
    queryFn: getCreatorDetail,
  });
  return (
    <Box
      as='main'
      pb='5rem'
      pt={{ base: '5rem', xl: '2.5rem' }}
      px='16px'
      bg='white'
      flexGrow={1}
      w={{ base: '100%', md: '630px' }}
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
        작가 페이지
      </Text>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyCreatorDetail />
      </HydrationBoundary>
    </Box>
  );
};

export default page;
