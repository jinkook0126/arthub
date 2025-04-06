'use client';

import { Flex, Text, Box, Tag, useMediaQuery } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ChevronRightIcon } from '@chakra-ui/icons';
import React, { RefObject, useEffect, useState } from 'react';
import { ICreator, ICreatorGroup } from '@/model/artist';

type ArtistMainlistProps = {
  creatorLists?: ICreator[];
};
type RefsType = {
  [key: string]: RefObject<HTMLDivElement>;
};

const chosungList = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하', 'ABC'];

function ArtistMainlist({ creatorLists = [] }: ArtistMainlistProps) {
  // const { data: creatorLists } = useQuery({ queryKey: ['creators'], queryFn: getCreatorsList });

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [refs, setRefs] = useState<RefsType>({});
  const [selected, setSelected] = useState('가');
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

  const onFilterClick = (filter: string) => {
    setSelected(filter);
    const target = refs[filter]?.current;
    if (target) {
      const offset = isLargerThan768 ? 100 : 150;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    const newRefs = chosungList.reduce<RefsType>((acc, chosung) => {
      acc[chosung] = React.createRef();
      return acc;
    }, {});
    setRefs(newRefs);
  }, []);
  useEffect(() => {
    const result: ICreatorGroup[] = chosungList.map(item => ({ filter: item, lists: [] }));
    if (!creatorLists) {
      setArtist(result);
      return;
    }
    creatorLists.forEach(element => {
      const firstChar = element.creatorName.charAt(0);
      const group = getChosungGroup(firstChar);
      result.forEach(cho => {
        if (cho.filter === group) {
          cho.lists.push(element);
        }
      });
    });
    setArtist(result);
  }, [creatorLists]);
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
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {chosungList.map((item, idx) => (
          <Flex
            as='button'
            key={`filter-${item}`}
            bg={selected === item ? 'gray.500' : 'white'}
            minW={idx !== chosungList.length - 1 ? '24px' : '44px'}
            height='24px'
            justify='center'
            align='center'
            borderRadius='4px'
            borderWidth={1}
            onClick={() => onFilterClick(item)}
          >
            <Text color={selected === item ? 'white' : 'gray.500'} lineHeight='22px' fontSize='1rem'>
              {item}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex px={{ base: '1.25rem', xl: 0 }} flex={1} mb='255px' flexDir='column' gap='2rem' w='100%'>
        {artists.map(item => (
          <Box key={`lists-${item.filter}`} ref={refs[item.filter]}>
            <Box h='3.75rem' borderBottomWidth={1} borderColor='black'>
              <Text lineHeight='29px' fontWeight={700} fontSize='1.5rem'>
                {item.filter}
              </Text>
            </Box>
            {item.lists.length !== 0 && (
              <Flex flexDir='column'>
                {item.lists.map((creator, idx) => (
                  <Flex
                    href='/'
                    as={NextLink}
                    key={creator.id}
                    justify='space-between'
                    align='center'
                    borderBottomWidth={idx === item.lists.length - 1 ? 0 : 1}
                    py={{ base: '15px', xl: '15px' }}
                    height={{ bae: 'unset', xl: '58px' }}
                    px='0.625rem'
                    borderColor='black'
                    _hover={{ bg: 'black', color: 'white' }}
                    role='group'
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
                        {creator.creatorTags.map(tag => (
                          <Tag
                            variant='outline'
                            _groupHover={{ bg: 'gray.500', color: 'white' }}
                            key={`${creator.id}-${tag}`}
                            size='md'
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
