import { Flex, Image, Box, Text } from '@chakra-ui/react';

type Props = {
  artist: {
    name: string;
    uri: string;
    intro: string;
  };
};

function ArtistItem({ artist: { name, intro, uri } }: Props) {
  return (
    <Flex
      flex={1}
      justify='space-between'
      flexDir={{ base: 'column-reverse', md: 'row' }}
      gap={{ base: '14px', md: '12px' }}
    >
      <Box>
        <Text fontSize={{ base: '0.875rem', md: '1rem' }} color='gray.600'>
          {name}
        </Text>
        <Text fontSize={{ base: '1rem', md: '1.2rem' }} color='black' maxW='300px' noOfLines={{ base: 2, md: 3 }}>
          {intro}
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
        <Image src={uri} objectFit='cover' objectPosition='center' h='100%' w='100%' />
      </Box>
    </Flex>
  );
}
export default ArtistItem;
