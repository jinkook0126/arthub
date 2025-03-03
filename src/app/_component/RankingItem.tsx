'use client';

import { Text, Flex, Image, Box, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  src: string;
};
function RankingItem({ src }: Props) {
  const [isLargerThan768] = useMediaQuery(['(min-width: 768px)']);

  const [isHover, setIsHover] = useState(false);
  return (
    <Flex
      as={Link}
      href='/'
      position='relative'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      height='100%'
      flex={1}
    >
      <Flex
        bg='#f3f3f3'
        overflow='hidden'
        borderRadius='8px'
        justify='center'
        align='center'
        w={{ base: '150px', md: '100%' }}
        _before={{
          content: `""`,
          display: 'block',
          paddingBottom: '100%',
        }}
      >
        <Image src={src} w='100%' flexShrink={0} />
      </Flex>
      {isLargerThan768 ? (
        <Box position='absolute' left={0} top={0} w='100%' h='100%'>
          <Box
            position='absolute'
            transition='all 0.3s ease-in'
            bg='black'
            w='100%'
            h='100%'
            borderRadius='8px'
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
      ) : (
        <Flex color='black' pl='12px' pb='12px' flexDir='column' justify='flex-end'>
          <Text fontSize='16px' fontWeight={700}>
            이진국
          </Text>
          <Text fontSize='13px'>크레용 신짱!!</Text>
          <Text fontSize='13px' mt='8px' color='gray.500'>
            현재가
          </Text>
          <Text fontSize='15px' fontWeight={700}>
            100,000,000원
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default RankingItem;
