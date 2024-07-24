'use client';

import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Img, HStack, Link, useMediaQuery } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  return (
    <Box>
      <header>
        <Flex h='4.5rem' justify='center'>
          {isLargerThan992 ? (
            <section>
              <Flex align='center' h='100%' w='60.625rem' justify='space-between'>
                <Flex align='center'>
                  <Img src='/assets/logo.png' w={120} mr={30} />
                  <nav>
                    <HStack spacing='18px'>
                      <Link
                        href='/'
                        as={NextLink}
                        fontSize='1rem'
                        fontWeight={500}
                        color='gray.800'
                        textDecoration='none'
                        _hover={{
                          textDecoration: 'none',
                        }}
                      >
                        경매 참여
                      </Link>
                      <Link
                        href='/'
                        as={NextLink}
                        fontSize='1rem'
                        fontWeight={500}
                        color='gray.800'
                        textDecoration='none'
                        _hover={{
                          textDecoration: 'none',
                        }}
                      >
                        그림 의뢰
                      </Link>
                    </HStack>
                  </nav>
                </Flex>
                <Box>
                  <nav>
                    <HStack spacing='18px'>
                      <Link
                        href='/'
                        as={NextLink}
                        fontSize='0.875rem'
                        fontWeight={400}
                        color='gray.800'
                        textDecoration='none'
                        _hover={{
                          textDecoration: 'none',
                        }}
                      >
                        로그인
                      </Link>
                      <Link
                        href='/'
                        as={NextLink}
                        fontSize='0.875rem'
                        fontWeight={400}
                        color='gray.800'
                        textDecoration='none'
                        _hover={{
                          textDecoration: 'none',
                        }}
                      >
                        회원가입
                      </Link>
                    </HStack>
                  </nav>
                </Box>
              </Flex>
            </section>
          ) : (
            <section>
              <Flex align='center' h='100%' w='60.625rem' p='1rem' gap='1rem'>
                <HamburgerIcon w={6} h={6} color='gray.800' />
                <Img src='/assets/logo.png' w={120} mr={30} />
              </Flex>
            </section>
          )}
        </Flex>
      </header>
    </Box>
  );
}
// 90px
