import { Box, Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import OrderButtonList from './OrderButtonList';

function AuctionList() {
  return (
    <Box as='section'>
      <Flex justify='space-between' align='center'>
        <Text fontSize='0.875rem' color='gray.400'>
          <Text as='strong' color='black'>
            99
          </Text>
          개 작품
        </Text>
        <OrderButtonList />
      </Flex>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' }}
        rowGap='2.5rem'
        columnGap='1.25rem'
        mt='24px'
      >
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
        <GridItem w='100%' h='10' bg='blue.500' />
      </Grid>
    </Box>
  );
}
export default AuctionList;
