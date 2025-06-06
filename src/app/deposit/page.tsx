import { Box, Text } from '@chakra-ui/react';
import FiftyGame from './_component/FiftyGame';

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
    <Text as='h2' fontSize={{ base: '2.125rem', xl: '1.75rem' }} fontWeight={500} textAlign='center'>
      예치금 만들기
      <FiftyGame />
    </Text>
  </Box>
);
export default page;
