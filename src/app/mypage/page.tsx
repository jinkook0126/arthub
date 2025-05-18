import { Box, Divider, Text } from '@chakra-ui/react';
import { auth } from '@/auth';
import MyPageList from './_component/MyPageList';

const page = async () => {
  const session = await auth();
  return (
    <Box as='main' pb='5rem' pt={{ base: '5rem', xl: '2.5rem' }} px='16px' bg='white' flexGrow={1} w='630px' mx='auto'>
      <Box pb='16px'>
        <Text fontSize='20px' color='gray.500'>
          <Text as='span' fontSize='34px' fontWeight={500} color='black' mr='8px'>
            {session?.user?.name}
          </Text>
          고객님
        </Text>
        <Text fontSize='1rem' mt='6px' color='gray.500'>
          {session?.user?.email}
        </Text>
      </Box>
      <Divider />
      <MyPageList />
    </Box>
  );
};

export default page;
