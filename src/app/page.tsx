'use client';

import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Img, HStack, Link, useMediaQuery, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  return (
    <Box>
      <Box pos='sticky' height={isLargerThan992 ? '4.5rem' : '3.625rem'} top={0} as='header' bg='white'>
        <Flex h='100%' justify='center' pos='relative'>
          {isLargerThan992 ? (
            <Box as='section'>
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
                        nav A
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
                        nav A
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
                        nav A
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
                        nav A
                      </Link>
                    </HStack>
                  </nav>
                </Box>
              </Flex>
            </Box>
          ) : (
            <Box as='section'>
              <Flex align='center' h='100%' w='60.625rem' p='1rem' gap='1rem'>
                <HamburgerIcon w={6} h={6} color='gray.800' />
                <Img src='/assets/logo.png' w={120} mr={30} />
              </Flex>
            </Box>
          )}
        </Flex>
      </Box>
      <Box h={2000} w='100%'>
        <Text>hello</Text>
      </Box>
    </Box>
  );
}
// 90px
