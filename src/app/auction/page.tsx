import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import getAuctionList from './_lib/getAuctionList';
import ClientAuctionPage from './_component/ClientAuctionPage';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['auction'],
    queryFn: getAuctionList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientAuctionPage />
    </HydrationBoundary>
  );
}
