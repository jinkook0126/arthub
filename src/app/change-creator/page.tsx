import { Box, Text } from '@chakra-ui/react';
import ChangeCreatorForm from './_component/ChangeCreatorForm';

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
      mb='2.5rem'
      fontSize={{ base: '2.125rem', xl: '1.75rem' }}
      fontWeight={500}
      textAlign={{ base: 'center', xl: 'left' }}
      pl={{ base: 0, xl: '1rem' }}
    >
      작가전환
    </Text>
    <ChangeCreatorForm />
  </Box>
);
export default page;
