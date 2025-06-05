'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';

function ClientChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: { position: 'top-right', variant: 'left-accent', duration: 3000, isClosable: true },
      }}
    >
      {children}
    </ChakraProvider>
  );
}
export default ClientChakraProvider;
