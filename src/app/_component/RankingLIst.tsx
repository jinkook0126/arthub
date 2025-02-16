import { Flex, Button, Text, Box } from '@chakra-ui/react';

import RankingItem from './RankingItem';
import RightIcon from './RightIcon';

function RankingList() {
  return (
    <Box flexDir='column'>
      <Flex align='center' justify='space-between' mb='1.5rem'>
        <Text fontWeight={700} fontSize='1.5rem'>
          지금 HOT한 경매 상품
        </Text>
        <Button
          rightIcon={<RightIcon />}
          variant='link'
          fontSize={{ base: '14px', md: '16px' }}
          _hover={{ textDecoration: 'none' }}
        >
          전체 작품 보기
        </Button>
      </Flex>
      <Flex gap='28px' justifyContent='space-between' flexDir={{ base: 'column', md: 'row' }}>
        <RankingItem src='/assets/image/sample/maru.png' />
        <RankingItem src='/assets/image/sample/shinzzang.png' />
        <RankingItem src='/assets/image/sample/kerokero.png' />
        <RankingItem src='/assets/image/sample/shinzzang.png' />
        <RankingItem src='/assets/image/sample/maru.png' />
      </Flex>
    </Box>
  );
}
export default RankingList;
