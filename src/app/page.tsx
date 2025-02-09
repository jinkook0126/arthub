import { Flex, Box, Text } from '@chakra-ui/react';
import Banner from './_component/Banner';
import RankingList from './_component/RankingLIst';

export default function Home() {
  return (
    <Box flexGrow={1} maxW='1280px' mx='auto'>
      <Banner />
      <Flex mt='5rem' gap='5rem' flexDirection='column'>
        <Box>
          <Text fontWeight={700} fontSize='1.5rem' mb='1.5rem'>
            지금 HOT한 경매 상품
          </Text>
          <RankingList />
        </Box>
        <Box>
          <Text fontWeight={700} fontSize='1.5rem' mb='1.5rem'>
            인기있는 작가
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
// 90px
