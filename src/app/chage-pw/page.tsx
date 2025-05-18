import { Box, Text } from '@chakra-ui/react';
import ChangePasswordForm from './_componet/ChangePasswordForm';

const page = () => (
  <Box as='main' pb='5rem' pt={{ base: '5rem', xl: '2.5rem' }} px='16px' bg='white' flexGrow={1} w='630px' mx='auto'>
    <Text
      as='h2'
      mb='2.5rem'
      fontSize={{ base: '2.125rem', xl: '1.75rem' }}
      fontWeight={500}
      textAlign={{ base: 'center', xl: 'left' }}
      pl={{ base: 0, xl: '1rem' }}
    >
      비밀번호 변경
    </Text>
    <ChangePasswordForm />
  </Box>
);

export default page;
