'use client';

import { Text, Flex, Box, Grid } from '@chakra-ui/react';
import { IArtPreivew } from '@/model/art';
import ParticipationItem from './ParticipationItem';

function ParticipationList({ artList }: { artList: IArtPreivew[] }) {
  return (
    <Flex mx='auto' maxW='1280px' w='100%' gap='1.25rem' flexDir='column'>
      <Box
        h={{ base: '42px', xl: '62px' }}
        w='100%'
        borderBottomWidth={2}
        borderColor='black'
        px={{ base: '1rem', xl: 0 }}
      >
        <Text as='h2' fontWeight={700} fontSize='1.5rem' lineHeight='29px' pt='0.5rem'>
          참여작품
        </Text>
      </Box>
      <Box pb='70px' px={{ base: '1rem', xl: 0 }}>
        {artList.length === 0 ? (
          <Text fontSize='1.25rem' fontWeight={700} color='gray.500' textAlign='center'>
            참여작품이 없습니다.
          </Text>
        ) : (
          <Grid
            templateColumns={{ base: 'repeat(3,minmax(0,1fr))', xl: 'repeat(5,minmax(0,1fr))' }}
            gap={{ base: '10px', xl: '15px' }}
          >
            {artList.map(art => (
              <ParticipationItem
                key={`art-${art.id}`}
                uri={`/auction/detail/${art.id}`}
                imgUri={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${art.url}`}
              />
            ))}
          </Grid>
        )}
      </Box>
    </Flex>
  );
}

export default ParticipationList;
