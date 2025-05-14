'use client';

import { Center, Flex, Text } from '@chakra-ui/react';
import { BidBtn } from './BidBtn';

function ArtBidButtonContainer() {
  return (
    <Flex gap='12px'>
      <BidBtn />
      <Center
        as='button'
        h='56px'
        flex={1}
        bg='green.300'
        _hover={{ bg: 'green.400' }}
        borderRadius='3px'
        color='white'
      >
        <Text>즉시 구매하기</Text>
      </Center>
    </Flex>
  );
}

export default ArtBidButtonContainer;
