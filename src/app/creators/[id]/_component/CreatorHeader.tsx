'use client';

import { Image, Box, Center, Divider, Flex, Tag, Text, useMediaQuery } from '@chakra-ui/react';

function CreatorHeader() {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

  return (
    <Center py={{ base: '30px', xl: '2.5rem' }} bg='gray.700' w='100%' px={{ base: '1.25rem', xl: 0 }}>
      <Flex mx='auto' maxW='1280px' w='100%' gap='1.25rem' flexDir='column'>
        {isLargerThan992 && (
          <Flex gap='2.5rem' align='center'>
            <Text as='h1' maxW='364px' lineHeight='46px' fontSize='2rem' fontWeight={700} color='white' w='100%'>
              이진국
            </Text>
            <Flex align='center' gap='0.625rem'>
              <Tag bg='gray.500' color='white' size='lg'>
                #원화
              </Tag>
              <Tag bg='gray.500' color='white' size='lg'>
                #원화
              </Tag>
              <Tag bg='gray.500' color='white' size='lg'>
                #원화
              </Tag>
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
                src='/assets/image/sample/artist4.jpeg'
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
                  이진국
                </Text>
                <Flex align='center' gap='0.25rem' flexDir='column'>
                  <Tag bg='gray.500' color='white' size='md'>
                    #원화
                  </Tag>
                  <Tag bg='gray.500' color='white' size='md'>
                    #원화
                  </Tag>
                  <Tag bg='gray.500' color='white' size='md'>
                    #원화
                  </Tag>
                </Flex>
              </Flex>
            )}
          </Flex>

          <Flex flexDir='column' justify='space-between' gap='1.25rem' w='100%'>
            <Box w='100%'>
              <Text color='white' wordBreak='keep-all'>
                작가는 캔버스에 유화 물감을 붓이 아닌 손으로만 작업을 한다. 손끝에서 그려지는 물감의 모양은 작가의
                감정을 고스란히 표현한다. 주로 구름의 형상을 띄는 작업을 하는데 이는 한순간 변하는 사람의 감정이
                변해가는 구름의 특징과 비슷하다고 생각하기 때문이다. 작가는 작품에서 느껴지는 감정을 고스란히 독자에게
                전달되길 바란다.
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
                  10
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
                  0
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
