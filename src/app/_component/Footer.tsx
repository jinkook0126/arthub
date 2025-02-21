import { Center, HStack, Link, Text } from '@chakra-ui/react';
import { GithubIcon, HomeIcon, MailIcon } from './FooterIcon';

function Footer() {
  return (
    <Center
      as='footer'
      h='190px'
      bg='gray.50'
      borderTopWidth='0.0625rem'
      borderColor='gray.200'
      flexDir='column'
      gap='12px'
    >
      <Text fontSize='14px' color='gray.400'>
        Copyright ⓒ 또닥. All Rights Reserved
      </Text>
      <HStack>
        <Link isExternal href='https://github.com/jinkook0126/arthub' color='gray.500'>
          <GithubIcon />
        </Link>
        <Link isExternal href='mailto:jinqook0126@naver.com' color='gray.500'>
          <MailIcon />
        </Link>
        <Link isExternal href='https://ddodak.tistory.com/' color='gray.500'>
          <HomeIcon />
        </Link>
      </HStack>
    </Center>
  );
}
export default Footer;
