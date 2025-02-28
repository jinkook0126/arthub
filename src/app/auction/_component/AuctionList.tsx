import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import OrderButtonList from './OrderButtonList';
import AuctionItem from './AuctionItem';

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
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        rowGap='2.5rem'
        columnGap='1.25rem'
        mt='24px'
        mb='120px'
      >
        <AuctionItem uri='assets/image/sample/art1.jpg' />
        <AuctionItem uri='assets/image/sample/art2.jpg' />
        <AuctionItem uri='assets/image/sample/art3.jpg' />
        <AuctionItem uri='assets/image/sample/art2.jpg' />
        <AuctionItem uri='assets/image/sample/art1.jpg' />
        <AuctionItem uri='assets/image/sample/art3.jpg' />
      </Grid>
    </Box>
  );
}
export default AuctionList;
