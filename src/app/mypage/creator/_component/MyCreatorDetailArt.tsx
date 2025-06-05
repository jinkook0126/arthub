import { useState } from 'react';
import { Flex, GridItem, Image, Box } from '@chakra-ui/react';
import { IArtPreivew } from '@/model/art';
import NextLink from 'next/link';

function MyCreatorDetailArt({ art }: { art: IArtPreivew }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <GridItem
      key={art.id}
      as={NextLink}
      href={`/auction/detail/${art.id}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Flex
        w='100%'
        minH={{ base: '210px', sm: '120px' }}
        p='0.625rem'
        borderRadius='0.5rem'
        bg='gray.50'
        overflow='hidden'
        justify='center'
        align='center'
        position='relative'
      >
        <Box h={{ base: '110px', sm: '150px' }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${art.url}`}
            w='100%'
            h='100%'
            objectFit='contain'
            transition='transform 0.3s ease-in-out'
            transform={isHover ? 'scale(1.1)' : 'scale(1)'}
          />
        </Box>
      </Flex>
    </GridItem>
  );
}

export default MyCreatorDetailArt;
