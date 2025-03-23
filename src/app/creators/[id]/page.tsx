import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import ParticipationItem from './_component/ParticipationItem';
import CreatorHeader from './_component/CreatorHeader';

const creatorDetailPage = () => (
  <Flex gap='2.5rem' flexDir='column' flexGrow={1} w='100%'>
    <CreatorHeader />
    <Flex mx='auto' maxW='1280px' w='100%' gap='1.25rem' flexDir='column'>
      <Box h='62px' w='100%' borderBottomWidth={2} borderColor='black' px={{ base: '1rem', xl: 0 }}>
        <Text as='h2' fontWeight={700} fontSize='1.5rem' lineHeight='29px' pt='0.5rem'>
          참여작품
        </Text>
      </Box>
      <Box pb='70px' px={{ base: '1rem', xl: 0 }}>
        <Grid
          templateColumns={{ base: 'repeat(3,minmax(0,1fr))', xl: 'repeat(5,minmax(0,1fr))' }}
          gap={{ base: '10px', xl: '15px' }}
        >
          <ParticipationItem uri='/' imgUri='/assets/image/sample/art1.jpg' />
          <ParticipationItem uri='/' imgUri='/assets/image/sample/art2.jpg' />
          <ParticipationItem uri='/' imgUri='/assets/image/sample/art3.jpg' />
          <ParticipationItem uri='/' imgUri='/assets/image/sample/art2.jpg' />
          <ParticipationItem uri='/' imgUri='/assets/image/sample/art1.jpg' />
        </Grid>
      </Box>
    </Flex>
  </Flex>
);
export default creatorDetailPage;
