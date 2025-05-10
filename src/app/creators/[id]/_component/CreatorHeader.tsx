'use client';

import { IArtPreivew } from '@/model/art';
import { ICreator } from '@/model/artist';
import { Image, Box, Center, Divider, Flex, Tag, Text, useMediaQuery } from '@chakra-ui/react';

function CreatorHeader({ creator, artList }: { creator: ICreator; artList: IArtPreivew[] }) {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  return (
    <Center py={{ base: '30px', xl: '2.5rem' }} bg='gray.700' w='100%' px={{ base: '1.25rem', xl: 0 }}>
      <Flex mx='auto' maxW='1280px' w='100%' gap='1.25rem' flexDir='column'>
        {isLargerThan992 && (
          <Flex gap='2.5rem' align='center'>
            <Text as='h1' maxW='364px' lineHeight='46px' fontSize='2rem' fontWeight={700} color='white' w='100%'>
              {creator?.creatorName}
            </Text>
            <Flex align='center' gap='0.625rem'>
              {creator.creatorTags.map(tag => (
                <Tag bg='gray.500' color='white' size='lg' key={`${creator.id}-${tag}`}>
                  #{tag}
                </Tag>
              ))}
            </Flex>
          </Flex>
        )}

        <Flex gap={{ base: '20px', xl: '2.5rem' }} flexDir={{ base: 'column', xl: 'row' }}>
          <Flex gap='10px'>
            <Box
              minW={{ base: '120px', xl: '364px' }}
              minH={{ base: '120px', xl: '364px' }}
              overflow='hidden'
              borderRadius='10px'
              pos='relative'
            >
              <Image
                src={
                  creator.creatorThumbnail
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${creator.creatorThumbnail}`
                    : '/assets/image/creator/no-profile.png'
                }
                alt='creator profile thumbnail'
                w='100%'
                height='100%'
                objectFit='cover'
                pos='absolute'
                top={0}
                left={0}
              />
            </Box>
            {!isLargerThan992 && (
              <Flex gap='.5rem' align='center' flexDir='column'>
                <Text as='h1' maxW='364px' lineHeight='32px' fontSize='1.25rem' fontWeight={700} color='white' w='100%'>
                  {creator.creatorName}
                </Text>
                <Flex align='flex-start' gap='0.25rem' flexDir='column'>
                  {creator.creatorTags.map(tag => (
                    <Tag bg='gray.500' color='white' size='md' key={`${creator.id}-${tag}`}>
                      #{tag}
                    </Tag>
                  ))}
                </Flex>
              </Flex>
            )}
          </Flex>

          <Flex flexDir='column' justify='space-between' gap='1.25rem' w='100%'>
            <Box w='100%'>
              <Text color='white' wordBreak='keep-all'>
                {creator.creatorDesc}
              </Text>
            </Box>
            <Flex
              bg='gray.500'
              borderRadius='0.375rem'
              gap='0.625rem'
              py='0.625rem'
              px='1.25rem'
              align='center'
              justify='space-between'
            >
              <Center flexDir='column' gap='0.25rem' w='100%'>
                <Text fontWeight={700} fontSize='0.875rem' lineHeight='20px' color='gray.300'>
                  판매중
                </Text>
                <Text color='white' fontWeight={700} fontSize='1.5rem' lineHeight='29px'>
                  {artList.filter(art => art.isAuctionActive).length}
                  <Text as='span' fontSize='1.125rem'>
                    점
                  </Text>
                </Text>
              </Center>
              <Divider orientation='vertical' h='100%' w='1px' borderColor='white' />
              <Center flexDir='column' gap='0.25rem' w='100%'>
                <Text fontWeight={700} fontSize='0.875rem' lineHeight='20px' color='gray.300'>
                  판매종료
                </Text>
                <Text color='white' fontWeight={700} fontSize='1.5rem' lineHeight='29px'>
                  {artList.filter(art => !art.isAuctionActive).length}
                  <Text as='span' fontSize='1.125rem'>
                    점
                  </Text>
                </Text>
              </Center>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
}

export default CreatorHeader;
