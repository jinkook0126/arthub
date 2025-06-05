'use client';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IArt } from '@/model/art';
import dayjs from 'dayjs';

function ArtDetail({ detail }: { detail: IArt }) {
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
              <Text color='gray.700'>{detail.artTitle}</Text>
            </Flex>
            <Flex align='center'>
              <Text minW='5rem' fontWeight={700} lineHeight='25.2px' fontSize='1.125rem'>
                제작연도
              </Text>
              <Text color='gray.700'>{dayjs(detail.artCreatedAt).format('YYYY')}</Text>
            </Flex>
            <Flex align='center'>
              <Text minW='5rem' fontWeight={700} lineHeight='25.2px' fontSize='1.125rem'>
                작품크기
              </Text>
              <Text color='gray.700'>{detail.artSize}</Text>
            </Flex>
            <Flex align='center'>
              <Text minW='5rem' fontWeight={700} lineHeight='25.2px' fontSize='1.125rem'>
                작품재료
              </Text>
              <Text color='gray.700'>{detail.artMaterial}</Text>
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
            {detail.artDesc}
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
          <Flex flexDir={{ base: 'column', xl: 'row' }}>
            <Box minW='196px' height='254px' borderRadius='6px' overflow='hidden' pos='relative'>
              <Image
                pos='absolute'
                display='block'
                objectFit='cover'
                w='100%'
                height='100%'
                src={
                  detail.Creators.creatorThumbnail
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${detail.Creators.creatorThumbnail}`
                    : '/assets/image/creator/no-profile.png'
                }
              />
            </Box>
            <Box flex={1} pl={{ base: 0, xl: '16px' }} pt={{ base: '1rem', xl: 0 }}>
              <Link
                href={`/creators/${detail.Creators.id}`}
                as={NextLink}
                fontSize='1.125rem'
                fontWeight={700}
                color='gray.700'
              >
                <Flex alignItems='center'>
                  <Text fontWeight={700} fontSize='1rem' color='black'>
                    {detail.Creators.creatorName}
                  </Text>
                  <ChevronRightIcon w='24px' h='24px' />
                </Flex>
              </Link>
              <Text mt='8px' fontSize='1rem' color='gray.700'>
                {detail.Creators.creatorDesc}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
export default ArtDetail;
