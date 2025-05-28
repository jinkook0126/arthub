'use client';

import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import PasswordVerificatoinForm from './PasswordVerificatoinForm';
import ResetPasswordForm from './ResetPasswordForm';

function FindPassword() {
  const [userMail, setUserMail] = useState<string>('');
  return (
    <Box pb='5rem' pt={{ base: '5rem', xl: '2.5rem' }} bg={{ base: 'gray.100', xl: 'white' }} flexGrow={1}>
      <Text
        as='h2'
        mb='2.5rem'
        fontSize={{ base: '2.125rem', xl: '1.75rem' }}
        fontWeight={500}
        textAlign={{ base: 'center', xl: 'left' }}
        pl={{ base: 0, xl: '1rem' }}
      >
        비밀번호 찾기
      </Text>
      {userMail !== '' ? <ResetPasswordForm user={userMail} /> : <PasswordVerificatoinForm onVerified={setUserMail} />}
    </Box>
  );
}
export default FindPassword;
