import { Box, Text } from '@chakra-ui/react';
import AuctionRegisterForm from './_component/AuctionRegisterForm';

const page = () => (
  <Box
    as='main'
    pb='5rem'
    pt={{ base: '5rem', xl: '2.5rem' }}
    px='16px'
    bg='white'
    flexGrow={1}
    w={{ base: '100%', md: '630px' }}
    mx='auto'
  >
    <Text
      as='h2'
      fontSize={{ base: '2.125rem', xl: '1.75rem' }}
      fontWeight={500}
      textAlign={{ base: 'center', xl: 'left' }}
    >
      옥션 등록
    </Text>
    <AuctionRegisterForm />
  </Box>
);

export default page;
