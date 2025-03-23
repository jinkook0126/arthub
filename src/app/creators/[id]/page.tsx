import { Flex, Box } from '@chakra-ui/react';
import CreatorHeader from './_component/CreatorHeader';
import ParticipationList from './_component/ParticipationList';

const creatorDetailPage = () => (
  <Flex gap={{ base: '0.5rem', xl: '2.5rem' }} flexDir='column' flexGrow={1} w='100%' pos='relative'>
    <CreatorHeader />
    <ParticipationList />
    <Box height='3000px' w='100%' bg='coral' />
  </Flex>
);
export default creatorDetailPage;
