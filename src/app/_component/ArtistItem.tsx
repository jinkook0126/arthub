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
    <Flex flex={1} justify='space-between'>
      <Box>
        <Text fontSize={{ base: '0.875rem', md: '1rem' }} color='gray.600'>
          {name}
        </Text>
        <Text fontSize={{ base: '1rem', md: '1.2rem' }} color='black' maxW='300px' noOfLines={3}>
          {intro}
        </Text>
      </Box>
      <Box borderRadius='.5rem' overflow='hidden' bg='gray.100'>
        <Image src={uri} objectFit='cover' objectPosition='center' h='100%' maxW='280px' />
      </Box>
    </Flex>
  );
}
export default ArtistItem;
