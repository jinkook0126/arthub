'use client';

import { Center, Flex, Button, Text, Box, useMediaQuery } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import RankingItem from './RankingItem';
import RightIcon from './RightIcon';
import getMain from '../_lib/getMain';

function RankingList() {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const { data } = useQuery({
    queryKey: ['main'],
    queryFn: getMain,
  });
  console.warn(data);
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
            rightIcon={<RightIcon />}
            variant='link'
            fontSize={{ base: '14px', md: '16px' }}
            _hover={{ textDecoration: 'none' }}
          >
            전체 작품 보기
          </Button>
        )}
      </Flex>
      <Flex gap='28px' justifyContent='space-between' flexDir={{ base: 'column', md: 'row' }}>
        {data.data.artList.map(art => (
          <RankingItem key={art.id} src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${art.url}`} />
        ))}
      </Flex>
      {!isLargerThan768 && (
        <Center>
          <Button variant='outline' mt='3rem' alignSelf='center' size='lg'>
            <Text fontWeight={400}>전체 작품 보기</Text>
          </Button>
        </Center>
      )}
    </Box>
  );
}
export default RankingList;
