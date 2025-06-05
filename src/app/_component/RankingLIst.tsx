'use client';

import { Center, Flex, Button, Text, Box, useMediaQuery, Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import RankingItem from './RankingItem';
import RightIcon from './RightIcon';
import getMain from '../_lib/getMain';

function RankingList() {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const { data } = useQuery({
    queryKey: ['main'],
    queryFn: getMain,
  });
  if (!data || data.data.artList.length === 0) return null;
  return (
    <Box flexDir='column'>
      <Flex
        align='center'
        justify='space-between'
        mb='1.5rem'
        borderBottomWidth={3}
        paddingBottom='24px'
        borderColor='black'
      >
        <Text fontWeight={700} fontSize='1.5rem'>
          지금 HOT한 경매 상품
        </Text>
        {isLargerThan768 && (
          <Button
            as={NextLink}
            href='/auction'
            rightIcon={<RightIcon />}
            variant='link'
            fontSize={{ base: '14px', md: '16px' }}
            _hover={{ textDecoration: 'none' }}
          >
            전체 작품 보기
          </Button>
        )}
      </Flex>
      <Grid templateColumns={{ base: 'repeat(1,minmax(0,1fr))', md: 'repeat(5,minmax(0,1fr))' }} gap='28px'>
        {data.data.artList.map(art => (
          <RankingItem key={art.id} art={art} />
        ))}
      </Grid>
      {!isLargerThan768 && (
        <Center>
          <Button variant='outline' mt='3rem' alignSelf='center' size='lg' as={NextLink} href='/auction'>
            <Text fontWeight={400}>전체 작품 보기</Text>
          </Button>
        </Center>
      )}
    </Box>
  );
}
export default RankingList;
