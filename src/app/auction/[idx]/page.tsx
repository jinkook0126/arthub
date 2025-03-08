import { Image, Center, Box, Flex, Text, VStack } from '@chakra-ui/react';

function AuctionDetail() {
  return (
    <Box as='main' flexGrow={1} height='100%'>
      <Box maxW='1280px' mx='auto'>
        <Flex as='article' pt='3rem' flexWrap='wrap' justify='space-between' pos='relative' gap='80px'>
          <Box bg='green.50' flex='1'>
            <Center bg='#f3f3f3' borderRadius='0.375rem' w='100%' overflow='hidden' height='530px'>
              <Box height='530px'>
                <Image src='/assets/image/sample/kerokero.png' objectFit='contain' w='100%' h='100%' />
              </Box>
            </Center>
          </Box>
          <Box w='28rem' pos='sticky' bottom={0}>
            <Box pos='sticky' top='calc(3.625rem + 3rem)' overflowX='hidden' overflowY='scroll'>
              <Text fontSize='28px' fontWeight={700} color='black'>
                이진국(이름)
              </Text>
              <Text fontSize='20px' color='gray.700' my='13px' lineHeight='1.5em'>
                hello(작품명)
              </Text>
              <Box mb='20px'>
                <Text fontSize='14px'>캔버스에 아크릴(재료)</Text>
                <Text fontSize='14px'>25.5×17.7cm(사이즈)</Text>
              </Box>
              <VStack py='20px' borderColor='gray.200' borderBottomWidth={1} borderTopWidth={1} gap='10px'>
                <Flex w='100%' align='center' justify='space-between' fontWeight={500} fontSize='14px'>
                  <Text color='gray.600'>시작가</Text>
                  <Text color='black'>KRW 7,000,000</Text>
                </Flex>
                <Flex w='100%' align='center' justify='space-between' fontWeight={500} fontSize='14px'>
                  <Text color='gray.600'>현재가</Text>
                  <Text color='black'>KRW 7,000,000</Text>
                </Flex>
                <Flex w='100%' align='center' justify='space-between' fontWeight={500} fontSize='14px'>
                  <Text color='gray.600'>즉시 구매가</Text>
                  <Text color='black'>KRW 7,000,000</Text>
                </Flex>
              </VStack>
              <Box mt='10px'>
                <Center p='6px' bg='gray.100' fontSize='12px' fontWeight={500} mb='10px' borderRadius='3px'>
                  <Text>
                    마감시간
                    <Text color='blue.400' as='span' pl='8px'>
                      2025/03/04
                    </Text>
                  </Text>
                </Center>
                <Flex gap='12px'>
                  <Center
                    as='button'
                    h='56px'
                    flex={1}
                    bg='blue.300'
                    _hover={{ bg: 'blue.400' }}
                    borderRadius='3px'
                    color='white'
                  >
                    <Text>응찰하기</Text>
                  </Center>
                  <Center
                    as='button'
                    h='56px'
                    flex={1}
                    bg='green.300'
                    _hover={{ bg: 'green.400' }}
                    borderRadius='3px'
                    color='white'
                  >
                    <Text>즉시 구매하기</Text>
                  </Center>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
export default AuctionDetail;
