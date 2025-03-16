'use client';

import { Flex, Text, Box, Tag } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { ICreatorGroup } from '@/model/artist';
import mock from '../_lib/creators';

const chosungList = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하', 'ABC'];

function ArtistMainlist() {
  const [artists, setArtist] = useState<ICreatorGroup[]>([]);
  const getChosungGroup = (char: string) => {
    const initialCode = char.charCodeAt(0) - 44032;
    if (initialCode < 0 || initialCode > 11171) {
      return 'ABC';
    }
    const chosungMap = [
      '가',
      '가',
      '나',
      '다',
      '다',
      '라',
      '마',
      '바',
      '바',
      '사',
      '사',
      '아',
      '자',
      '자',
      '차',
      '카',
      '타',
      '파',
      '하',
      'abc',
    ];
    const chosungIndex = Math.floor(initialCode / 588);
    return chosungMap[chosungIndex];
  };
  useEffect(() => {
    const result: ICreatorGroup[] = chosungList.map(item => ({ filter: item, lists: [] }));
    if (!mock) {
      setArtist(result);
      return;
    }
    mock.forEach(element => {
      const firstChar = element.creatorName.charAt(0);
      const group = getChosungGroup(firstChar);
      result.forEach(cho => {
        if (cho.filter === group) {
          cho.lists.push(element);
        }
      });
    });
    setArtist(result);
  }, [mock]);
  return (
    <Flex
      flexWrap='wrap'
      justify='space-between'
      align='flex-start'
      pos='relative'
      gap='80px'
      flexDir={{ base: 'column', xl: 'row' }}
    >
      <Flex
        borderColor='black'
        borderBottomWidth={1}
        borderTopWidth={1}
        gap='0.75rem'
        py={{ base: '1rem', xl: '30px' }}
        px={{ base: '1.25rem', xl: 0 }}
        w={{ base: '100%', xl: '204px' }}
        pos='sticky'
        top={{ base: '4.5rem', xl: 'calc(3.625rem + 3rem)' }}
        bg='white'
        flexWrap={{ base: 'nowrap', xl: 'wrap' }}
        overflowX='scroll'
        css={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        {chosungList.map((item, idx) => (
          <Flex
            key={`filter-${item}`}
            minW={idx !== chosungList.length - 1 ? '24px' : '44px'}
            height='24px'
            justify='center'
            align='center'
            borderRadius='4px'
            borderWidth={1}
          >
            <Text color='gray.500' lineHeight='22px' fontSize='1rem'>
              {item}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex px={{ base: '1.25rem', xl: 0 }} flex={1} mb='255px' flexDir='column' gap='2rem' w='100%'>
        {artists.map(item => (
          <Box key={`lists-${item.filter}`}>
            <Box h='3.75rem' borderBottomWidth={1} borderColor='black'>
              <Text lineHeight='29px' fontWeight={700} fontSize='1.5rem'>
                {item.filter}
              </Text>
            </Box>
            {item.lists.length !== 0 && (
              <Flex flexDir='column'>
                {item.lists.map((creator, idx) => (
                  <Flex
                    key={creator.creatorId}
                    justify='space-between'
                    align='center'
                    borderBottomWidth={idx === item.lists.length - 1 ? 0 : 1}
                    py={{ base: '15px', xl: '15px' }}
                    height={{ bae: 'unset', xl: '58px' }}
                    px='0.625rem'
                    borderColor='black'
                  >
                    <Flex
                      align='center'
                      w='100%'
                      gap={{ base: '0.375rem', xl: 'unset' }}
                      flexDir={{ base: 'column', xl: 'row' }}
                    >
                      <Box w='100%' maxW={{ base: 'unset', xl: '200px' }}>
                        <Text>{creator.creatorName}</Text>
                      </Box>
                      <Flex w='100%' gap='0.625rem' align='center'>
                        {creator.tags.map(tag => (
                          <Tag
                            key={`${creator.creatorId}-${tag}`}
                            size='md'
                            colorScheme='gray'
                            fontWeight='regular'
                            color='gray.400'
                          >
                            #{tag}
                          </Tag>
                        ))}
                      </Flex>
                    </Flex>
                    <ChevronRightIcon w='24px' height='24px' />
                  </Flex>
                ))}
              </Flex>
            )}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
export default ArtistMainlist;
