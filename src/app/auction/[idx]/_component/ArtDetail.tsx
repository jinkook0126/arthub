'use client';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

function ArtDetail() {
  return (
    <Box color='gray.600'>
      <Box>
        <Box borderBottomWidth={1} height='3rem' borderColor='gray.200'>
          <Text fontSize='1.5rem' lineHeight='2.5rem' fontWeight={700}>
            작품 정보
          </Text>
        </Box>
        <Box pt='16px'>
          <Flex direction='column' gap='0.5rem'>
            <Flex align='center'>
              <Text minW='5rem' fontWeight={700} lineHeight='25.2px' fontSize='1.125rem'>
                작품명
              </Text>
              <Text color='gray.700'>이디야</Text>
            </Flex>
            <Flex align='center'>
              <Text minW='5rem' fontWeight={700} lineHeight='25.2px' fontSize='1.125rem'>
                제작연도
              </Text>
              <Text color='gray.700'>2020</Text>
            </Flex>
            <Flex align='center'>
              <Text minW='5rem' fontWeight={700} lineHeight='25.2px' fontSize='1.125rem'>
                작품크기
              </Text>
              <Text color='gray.700'>21x29.7cm</Text>
            </Flex>
            <Flex align='center'>
              <Text minW='5rem' fontWeight={700} lineHeight='25.2px' fontSize='1.125rem'>
                작품재료
              </Text>
              <Text color='gray.700'>아크릴에 디지털 프린팅</Text>
            </Flex>
            <Flex align='center'>
              <Text minW='5rem' fontWeight={700} lineHeight='25.2px' fontSize='1.125rem'>
                제작연도
              </Text>
              <Text color='gray.700'>2020</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box mt='70px'>
        <Box borderBottomWidth={1} height='3rem' borderColor='gray.200'>
          <Text fontSize='1.5rem' lineHeight='2.5rem' fontWeight={700}>
            작가 설명
          </Text>
        </Box>
        <Box pt='16px'>
          <Text lineHeight='1.5rem' fontSize='1rem'>
            사람들의 내 내 봅니다. 까닭이요, 벌레는 나는 듯합니다. 아무 우는 사람들의 잠, 다 별이 이름을 까닭입니다.
            소녀들의 새겨지는 않은 하늘에는 버리었습니다. 이름과, 하나의 벌써 토끼, 새겨지는 별이 그리고 것은 없이
            있습니다. 했던 위에 아름다운 덮어 밤을 그러나 이름과 까닭이요, 봅니다. 이름자를 어머니, 위에 별 나의 것은
            계절이 버리었습니다. 나는 써 하나에 그리고 동경과 가을로 멀듯이, 계십니다. 위에 이네들은 가득 까닭입니다. 못
            피어나듯이 아름다운 부끄러운 지나가는 잠, 봅니다. 이름과, 가을 별 아름다운 흙으로 별빛이 봅니다.
          </Text>
        </Box>
      </Box>
      <Box mt='70px'>
        <Box borderBottomWidth={1} height='3rem' borderColor='gray.200'>
          <Text fontSize='1.5rem' lineHeight='2.5rem' fontWeight={700}>
            작가 정보
          </Text>
        </Box>
        <Box pt='16px'>
          <Flex>
            <Box minW='196px' height='254px' borderRadius='6px' overflow='hidden'>
              <Image objectFit='cover' w='100%' height='100%' src='/assets/image/sample/artist3.jpeg' />
            </Box>
            <Box flex={1} pl='16px'>
              <Link href='/auction' as={NextLink} fontSize='1.125rem' fontWeight={700} color='gray.700'>
                <Flex alignItems='center'>
                  <Text fontWeight={700} fontSize='1rem' color='black'>
                    이진국
                  </Text>
                  <ChevronRightIcon w='24px' h='24px' />
                </Flex>
              </Link>

              <Text mt='8px' fontSize='1rem' color='gray.700'>
                가빈 작가는 빛과 감성, 향을 담아낸다. 특정화하지 않은 인물을 통해 여러 가지 감정을 다채로운 색감과 빛
                표현에 중점을 두어 감상자에게 힐링을 전하고자 한다
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
export default ArtDetail;
