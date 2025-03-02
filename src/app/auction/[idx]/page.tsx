import { Box, Flex, Text } from '@chakra-ui/react';

function AuctionDetail() {
  return (
    <Box as='main' flexGrow={1} height='100%'>
      <Box maxW='1280px' mx='auto'>
        <Flex as='article' pt='3rem' flexWrap='wrap' justify='space-between' pos='relative'>
          {/* 왼쪽 컨텐츠 */}
          <Box h='2000px' bg='green.50' flex='1' maxW='37.5rem'>
            <Text>hello</Text>
          </Box>
          {/* 오른쪽 sticky 영역 */}
          {/* <Box w='21.125rem'>
            <Box pos='sticky' top='0' zIndex={99}>
              <Box bg='red.50'>
                <Text>top</Text>
              </Box>
              <Box bg='blue.50'>
                <Text>bottom</Text>
              </Box>
            </Box>
          </Box> */}
          <Box w='21.125rem'>
            <Box pos='sticky' bottom='0' zIndex={99} height='300px' bg='yellow.100'>
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
