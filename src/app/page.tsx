import { Flex, Box, Text } from '@chakra-ui/react';
import Banner from './_component/Banner';
import RankingList from './_component/RankingLIst';

export default function Home() {
  return (
    <Box>
      <Banner />
      <Box flexGrow={1} maxW='1280px' mx='auto'>
        <Flex mt='5rem' gap='5rem' flexDirection='column'>
          <Box pl={{ base: '16px', md: 0 }}>
            <Text fontWeight={700} fontSize='1.5rem' mb='1.5rem'>
              지금 HOT한 경매 상품
            </Text>
            <RankingList />
          </Box>
          <Box pl={{ base: '16px', md: 0 }}>
            <Text fontWeight={700} fontSize='1.5rem' mb='1.5rem'>
              인기있는 작가
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
// 90px
