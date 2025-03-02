import { Box, Flex, Text } from '@chakra-ui/react';

function AuctionDetail() {
  return (
    <Box as='main' flexGrow={1} height='100%'>
      <Box maxW='1280px' mx='auto'>
        <Flex as='article' pt='3rem' flexWrap='wrap' justify='space-between' pos='relative' gap='80px'>
          <Box h='2000px' bg='green.50' flex='1'>
            <Text>hello</Text>
          </Box>
          <Box w='28rem' pos='sticky' bottom={0}>
            <Box pos='sticky' top='3.625rem' overflowX='hidden' overflowY='scroll'>
              <Box bg='red.50'>
                <Text>top</Text>
              </Box>
              <Box bg='blue.50'>
                <Text>bottom</Text>
              </Box>
            </Box>
          </Box>
        </Flex>
        <Box h='2000px' bg='gray.50'>
          <Text>hello</Text>
        </Box>
      </Box>
    </Box>
  );
}
export default AuctionDetail;
