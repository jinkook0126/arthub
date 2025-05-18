'use client';

import NextLink from 'next/link';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Divider,
  VStack,
  Link,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import MobileLoginNav from './MobileLoginNav';
import MobileLoginMypage from './MobileLoginMypage';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function MobileMenu({ isOpen, onClose }: Props) {
  const { status } = useSession();
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose} size='lg'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size='lg' />
        <DrawerBody>
          <Box mt={16}>
            {status === 'authenticated' ? <MobileLoginMypage /> : <MobileLoginNav />}
            <Divider my={6} />
            {status === 'authenticated' && (
              <Box>
                <Link
                  href='/mypage'
                  as={NextLink}
                  fontSize='1rem'
                  fontWeight={500}
                  color='gray.800'
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  마이페이지
                </Link>
                <Divider my={6} />
              </Box>
            )}
            <VStack spacing={6} align='flex-start'>
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
                경매참여
              </Link>
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
                작가찾기
              </Link>
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
export default MobileMenu;
