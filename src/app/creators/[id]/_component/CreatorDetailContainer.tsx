'use client';

import { useParams } from 'next/navigation';
import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import CreatorHeader from './CreatorHeader';
import ParticipationList from './ParticipationList';
import getCreatorDetail from '../_lib/getCreatorDetail';

function CreatorDetailContainer() {
  const { id } = useParams();
  const { data } = useQuery({ queryKey: ['creators', id], queryFn: getCreatorDetail });
  return (
    <Flex gap={{ base: '0.5rem', xl: '2.5rem' }} flexDir='column' w='100%' pos='relative'>
      <CreatorHeader creator={data?.creator} />
      <ParticipationList />
    </Flex>
  );
}
export default CreatorDetailContainer;
