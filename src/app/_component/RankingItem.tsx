'use client';

import { Text, Flex, Image, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  src: string;
};
function RankingItem({ src }: Props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link href='/'>
      <Flex
        // transition='all 0.3s ease-in'
        position='relative'
        maxW='230px'
        height='100%'
        bg='#f3f3f3'
        justifyContent='center'
        alignItems='center'
        borderRadius='8px'
        overflow='hidden'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Image src={src} height='100%' w='100%' />
        <Box position='absolute' left={0} top={0} w='100%' h='100%'>
          <Box
            position='absolute'
            transition='all 0.3s ease-in'
            bg='black'
            w='100%'
            h='100%'
            // opacity={0.6}
            opacity={isHover ? 0.6 : 0}
            visibility={isHover ? 'visible' : 'hidden'}
          />
          <Box
            color='white'
            position='absolute'
            bottom='16px'
            left='16px'
            transition='opacity 0.3s ease-in, visibility 0.3s ease-in'
            opacity={isHover ? 1 : 0}
            visibility={isHover ? 'visible' : 'hidden'}
          >
            <Text fontSize='16px' fontWeight={700}>
              이진국
            </Text>
            <Text fontSize='13px'>크레용 신짱!!</Text>
            <Text fontSize='13px' mt='8px' color='#C1C1C1'>
              현재가
            </Text>
            <Text fontSize='15px' fontWeight={700}>
              100,000,000원
            </Text>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
}

export default RankingItem;
