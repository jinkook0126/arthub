'use client';

import { Box, Text } from '@chakra-ui/react';

interface Props {
  label: string;
  callback: () => void;
  isActive: boolean;
}
function SaleStatusTabButton({ label, isActive = false, callback }: Props) {
  const onClick = () => {
    callback();
  };
  return (
    <Box
      onClick={onClick}
      cursor='pointer'
      px='1.25rem'
      borderRadius={9999}
      bg={isActive ? 'blue.50' : 'white'}
      w='fit-content'
      borderWidth={1}
      borderColor={isActive ? 'blue.50' : 'gray.200'}
    >
      <Text
        fontSize='1rem'
        fontWeight={isActive ? 700 : 400}
        color={isActive ? 'blue.400' : 'gray.400'}
        lineHeight='2rem'
      >
        {label}
      </Text>
    </Box>
  );
}
export default SaleStatusTabButton;
