'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';

function ClientChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
export default ClientChakraProvider;
