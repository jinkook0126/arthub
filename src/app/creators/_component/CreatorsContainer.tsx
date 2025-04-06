'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import ArtistMainlist from './ArtistMainlist';
import getCreatorsList from '../_lib/getCreatorsList';

function CreatorsContainer() {
  const { data: creatorLists } = useQuery({ queryKey: ['creators'], queryFn: getCreatorsList });
  return (
    <Box>
      <Flex
        pt={{ base: '30px', xl: '2.5rem' }}
        pb={{ base: 0, xl: '2.5rem' }}
        align='center'
        justify='center'
        gap='30px'
        flexDir='column'
      >
        <Text as='h1' fontSize={{ base: '28px', xl: '2.5rem' }} lineHeight='rem' fontWeight={700} textAlign='center'>
          작가 페이지
        </Text>
        <Box py='0.625rem' px='1.25rem' borderRadius={{ base: 0, xl: '10px' }} w='fit-content' bg='gray.50'>
          <Text fontWeight={700} fontSize={{ base: '1.125rem', xl: '1.25rem' }} color='gray.500' as='p'>
            아트허브에는{' '}
            <Text as='span' color='blue.400'>
              {creatorLists?.lists.length.toLocaleString()}
            </Text>
            명의 작가들이 참여하고 있습니다.
          </Text>
        </Box>
      </Flex>
      <ArtistMainlist creatorLists={creatorLists?.lists} />
    </Box>
  );
}
export default CreatorsContainer;
