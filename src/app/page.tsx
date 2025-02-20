import { Flex, Box } from '@chakra-ui/react';
import Banner from './_component/Banner';
import RankingList from './_component/RankingLIst';
import ArtistList from './_component/AristList';

export default function Home() {
  return (
    <Box>
      <Banner />
      <Box flexGrow={1} maxW='1280px' mx='auto'>
        <Flex mt='5rem' gap='5rem' flexDirection='column' mb='10rem'>
          <Box px={{ base: '16px', md: 0 }}>
            <RankingList />
          </Box>
          <Box px={{ base: '16px', md: 0 }}>
            <ArtistList />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
// 90px
