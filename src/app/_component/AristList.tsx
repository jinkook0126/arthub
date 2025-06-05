'use client';

import { Center, Flex, Divider, Text, Box, Button, useMediaQuery } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import ArtistItem from './ArtistItem';
import RightIcon from './RightIcon';
import getMain from '../_lib/getMain';

function ArtistList() {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const { data } = useQuery({
    queryKey: ['main'],
    queryFn: getMain,
  });
  if (!data || data.data.creatorList.length === 0) return null;
  return (
    <Box>
      <Flex
        align='center'
        justify='space-between'
        mb='1.5rem'
        borderBottomWidth={3}
        paddingBottom='24px'
        borderColor='black'
      >
        <Text fontWeight={700} fontSize='1.5rem'>
          인기있는 아티스트
        </Text>
        {isLargerThan768 && (
          <Button
            as={NextLink}
            href='/creators'
            rightIcon={<RightIcon />}
            variant='link'
            fontSize={{ base: '14px', md: '16px' }}
            _hover={{ textDecoration: 'none' }}
          >
            전체 아티스트 보기
          </Button>
        )}
      </Flex>
      <Flex flexDir={{ base: 'row', md: 'column' }} gap={{ base: 0, md: '30px' }} overflow='scroll'>
        <Flex justify='space-between' h={{ base: 'unset', md: '15rem' }}>
          <ArtistItem artist={data.data.creatorList[0]} />
          <Divider orientation='vertical' h='100%' w='1px' borderColor='gray.400' marginX='2rem' />
          <ArtistItem artist={data.data.creatorList[1]} />
        </Flex>
        <Divider
          display={{ base: 'block', md: 'none' }}
          orientation='vertical'
          h='auto'
          w='1px'
          borderColor='gray.400'
          marginX='2rem'
        />
        <Flex justify='space-between' h={{ base: 'unset', md: '15rem' }}>
          <ArtistItem artist={data.data.creatorList[2]} />
          <Divider orientation='vertical' h='100%' w='1px' borderColor='gray.400' marginX='2rem' />
          <ArtistItem artist={data.data.creatorList[3]} />
        </Flex>
      </Flex>
      {!isLargerThan768 && (
        <Center>
          <Button variant='outline' mt='3rem' alignSelf='center' size='lg' as={NextLink} href='/creators'>
            <Text fontWeight={400}>전체 아티스트 보기</Text>
          </Button>
        </Center>
      )}
    </Box>
  );
}

export default ArtistList;
