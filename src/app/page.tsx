'use client';

import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Img, HStack, Link, useMediaQuery, Text, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  return (
    <Box>
      <Box pos='sticky' height={isLargerThan992 ? '4.5rem' : '3.625rem'} top={0} as='header' bg='white'>
        <Flex h='100%' justify='center' p={isLargerThan992 ? 0 : '1rem'}>
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
            <Flex as='section' w='100%' align='center'>
              <Flex align='center' gap='1rem'>
                <IconButton
                  isRound
                  colorScheme='gray'
                  aria-label='사이드 메뉴'
                  size='md'
                  variant='outline'
                  sx={{
                    border: 'none',
                  }}
                  icon={<HamburgerIcon w={6} h={6} color='gray.800' />}
                />

                <Img src='/assets/logo.png' w={120} />
              </Flex>
            </Flex>
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
