'use client';

import { HamburgerIcon } from '@chakra-ui/icons';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { Box, Flex, Img, HStack, Link, useMediaQuery, IconButton, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const pathName = usePathname();
  const [border, setBorder] = useState<number>(0.0625);
  const handleScroll = () => {
    if (pathName !== '/') return;
    if (window.scrollY > 0) {
      setBorder(0.0625);
    } else {
      setBorder(0);
    }
  };
  useEffect(() => {
    if (pathName === '/') setBorder(0);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Box
        pos='sticky'
        height={isLargerThan992 ? '4.5rem' : '3.625rem'}
        top={0}
        as='header'
        bg='white'
        borderColor='gray.100'
        borderBottomWidth={`${border}rem`}
      >
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
                  onClick={onOpen}
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
      <MobileMenu isOpen={isOpen} onClose={onClose} />
    </>
  );
}
export default Header;
