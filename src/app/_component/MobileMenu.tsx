import NextLink from 'next/link';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Box,
  Divider,
  VStack,
  Link,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function MobileMenu({ isOpen, onClose }: Props) {
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose} size='lg'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size='lg' />
        <DrawerBody>
          <Box mt={16}>
            <Box>
              <Text fontWeight={500}>로그인 해주세요</Text>
              <Link
                href='/'
                as={NextLink}
                fontWeight={400}
                fontSize='0.875rem'
                color='gray.500'
                mt={1}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                로그인
                <ChevronRightIcon w={4} h={4} ml={1} />
              </Link>
            </Box>
            <Divider my={6} />
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
                회원가입
              </Link>
            </VStack>
            <Divider my={6} />
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
                의뢰하기
              </Link>
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
export default MobileMenu;
