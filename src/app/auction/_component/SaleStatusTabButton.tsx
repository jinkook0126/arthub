'use client';

import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  label: string;
  callback: () => void;
  isActive: boolean;
}
function SaleStatusTabButton({ label, isActive = false, callback }: Props) {
  const [active, setActive] = useState(isActive);
  const onClick = () => {
    setActive(!active);
    callback();
  };
  return (
    <Box
      onClick={onClick}
      cursor='pointer'
      px='1.25rem'
      borderRadius={9999}
      bg={active ? 'blue.50' : 'white'}
      w='fit-content'
      borderWidth={1}
      borderColor={active ? 'blue.50' : 'gray.200'}
    >
      <Text fontSize='1rem' fontWeight={active ? 700 : 500} color={active ? 'blue.400' : 'gray.400'} lineHeight='2rem'>
        {label}
      </Text>
    </Box>
  );
}
export default SaleStatusTabButton;
