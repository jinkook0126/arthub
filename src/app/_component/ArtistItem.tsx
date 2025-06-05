import { Flex, Image, Box, Text } from '@chakra-ui/react';
import { ICreator } from '@/model/artist';
import NextLink from 'next/link';

function ArtistItem({ artist }: { artist: ICreator }) {
  return (
    <Flex
      flex={1}
      justify='space-between'
      flexDir={{ base: 'column-reverse', md: 'row' }}
      gap={{ base: '14px', md: '12px' }}
      as={NextLink}
      href={`/creators/${artist.id}`}
    >
      <Box>
        <Text fontSize={{ base: '0.875rem', md: '1rem' }} color='gray.600'>
          {artist.creatorName}
        </Text>
        <Text fontSize={{ base: '1rem', md: '1.2rem' }} color='black' maxW='300px' noOfLines={{ base: 2, md: 3 }}>
          {artist.creatorDesc}
        </Text>
      </Box>
      <Box
        borderRadius='.5rem'
        overflow='hidden'
        bg='gray.100'
        maxW='280px'
        w={{ base: '184px', md: '100%' }}
        h={{ base: '184px', md: 'unset' }}
      >
        <Image
          src={
            artist.creatorThumbnail !== ''
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${artist.creatorThumbnail}`
              : '/assets/image/creator/no-profile.png'
          }
          objectFit='cover'
          objectPosition='center'
          h='100%'
          w='100%'
        />
      </Box>
    </Flex>
  );
}
export default ArtistItem;
