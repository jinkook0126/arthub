'use client';

import { ChakraProvider } from '@chakra-ui/react';

function ClientChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
export default ClientChakraProvider;
