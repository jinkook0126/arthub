import { Box, Center, Flex, Img, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box flexGrow={1}>
      <Flex h='470px' bg='gray.100'>
        <Box w='36%' pl='120px'>
          <Text>hello</Text>
        </Box>
        <Box
          pos='relative'
          w='64%'
          backgroundImage="url('/assets/image/banner.jpg')"
          backgroundSize='250%'
          backgroundPosition='center'
          backgroundRepeat='no-repeat'
          height='470px'
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(7px)',
            zIndex: 1,
          }}
        >
          <Center pos='relative' zIndex={2} h='100%'>
            <Img src='/assets/image/banner.jpg' w='500px' borderRadius='10px' boxShadow='0px 0px 6px 0px #222222' />
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}
// 90px
