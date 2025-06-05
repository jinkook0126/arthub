import { Box, Card, Text } from '@chakra-ui/react';
import CreatorSignWrapper from './_component/CreatorSignWrapper';

const page = () => (
  <Box pb='5rem' pt={{ base: '5rem', xl: '2.5rem' }} bg={{ base: 'gray.100', xl: 'white' }} flexGrow={1}>
    <Text
      as='h2'
      mb='2.5rem'
      fontSize={{ base: '2.125rem', xl: '1.75rem' }}
      fontWeight={500}
      textAlign={{ base: 'center', xl: 'left' }}
      pl={{ base: 0, xl: '1rem' }}
    >
      아트허브에 당신의 그림을 판매하세요
    </Text>
    <Card maxW='26.5rem' p={{ base: '2.5rem', xl: 0 }} mx='auto' boxShadow={{ base: undefined, xl: 'none' }}>
      <CreatorSignWrapper />
    </Card>
  </Box>
);

export default page;
