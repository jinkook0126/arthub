import { Flex, Divider, Text, Box } from '@chakra-ui/react';
import ArtistItem from './ArtistItem';

const lists = [
  {
    name: '씨범',
    uri: '/assets/image/sample/artist1.png',
    intro:
      '꼬마 때부터 운동을 좋아하여 농구, 아이스하키 등 여러 스포츠를 해보았는데 만 14세에 한계를 느끼고 잘하는 일을 찾아보기로 한다.',
  },
  {
    name: '김유정',
    uri: '/assets/image/sample/artist4.jpeg',
    intro:
      '2003년 TV 광고 모델로 데뷔한 이후 사랑스럽고 깜찍한 얼굴로 수많은 여배우들의 아역을 도맡았고 10대를 대표하는 유망주 배우로 성장해 어느덧 한 작품을 주도적으로 이끄는 배우로 자리매김했다.',
  },
  {
    name: '김수현',
    uri: '/assets/image/sample/artist2.png',
    intro:
      '김수현씨는 기본적으로 소년의 얼굴을 가지고 있고 사내의 목소리를 가지고 있고 연인의 눈빛을 가지고 있는 사람이라고 생각을 해요.',
  },
  {
    name: '인터넷퍼옴',
    uri: '/assets/image/sample/artist3.jpeg',
    intro: '꽃과 인물화를 중심으로 그림을 그립니다.',
  },
];
function ArtistList() {
  return (
    <Box>
      <Flex align='center' justify='space-between' mb='1.5rem'>
        <Text fontWeight={700} fontSize='1.5rem'>
          인기있는 아티스트
        </Text>
      </Flex>
      <Flex flexDir='column' gap='30px'>
        <Flex justify='space-between ' h='15rem'>
          <ArtistItem artist={lists[0]} />
          <Divider orientation='vertical' h='100%' w='1px' borderColor='gray.400' mx='30px' marginX='2rem' />
          <ArtistItem artist={lists[1]} />
        </Flex>
        <Flex justify='space-between ' h='15rem'>
          <ArtistItem artist={lists[2]} />
          <Divider orientation='vertical' h='100%' w='1px' borderColor='gray.400' mx='30px' marginX='2rem' />
          <ArtistItem artist={lists[3]} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default ArtistList;
