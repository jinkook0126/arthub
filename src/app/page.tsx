import { Box, Flex, Img, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <Box>
      <header>
        <Flex marginX='auto' justify='center' pos='relative' h='4.5rem' bg='red'>
          <section>
            <Flex align='center' h='100%' w='60.625rem' justify='space-between' bg='yellow'>
              <Flex align='center'>
                <Img src='/assets/logo.png' w={120} mr={30} />
                <nav>
                  <HStack spacing='18px'>
                    <Link href='/' as={NextLink} fontSize='1rem' fontWeight={500} color='black' textDecoration='none'>
                      nav A
                    </Link>
                    <Link href='/' as={NextLink} fontSize='1rem' fontWeight={500} color='black' textDecoration='none'>
                      nav B
                    </Link>
                  </HStack>
                </nav>
              </Flex>
              <Box>
                <nav>
                  <HStack spacing='18px'>
                    <Link href='/' as={NextLink} fontSize='1rem' fontWeight={500} color='black' textDecoration='none'>
                      nav C
                    </Link>
                    <Link href='/' as={NextLink} fontSize='1rem' fontWeight={500} color='black' textDecoration='none'>
                      nav D
                    </Link>
                  </HStack>
                </nav>
              </Box>
            </Flex>
          </section>
        </Flex>
      </header>
    </Box>
  );
}
