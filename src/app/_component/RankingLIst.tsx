import { Flex } from '@chakra-ui/react';
import RankingItem from './RankingItem';

function RankingList() {
  return (
    <Flex gap='28px' justifyContent='space-between' flexDir={{ base: 'column', md: 'row' }}>
      <RankingItem src='/assets/image/sample/maru.png' />
      <RankingItem src='/assets/image/sample/shinzzang.png' />
      <RankingItem src='/assets/image/sample/kerokero.png' />
      <RankingItem src='/assets/image/sample/shinzzang.png' />
      <RankingItem src='/assets/image/sample/maru.png' />
    </Flex>
  );
}
export default RankingList;
