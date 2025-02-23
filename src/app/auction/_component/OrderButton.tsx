import { Box, Text } from '@chakra-ui/react';

type Props = {
  label: string;
  isActive: boolean;
  callback: () => void;
};
function OrderButton({ label, isActive, callback }: Props) {
  const onClick = () => {
    callback();
  };
  return (
    <Box
      as='button'
      display='block'
      onClick={onClick}
      px='0.875rem'
      py='0.5rem'
      w='100%'
      _hover={{ bg: isActive ? 'blue.100' : 'gray.50' }}
      borderRadius='md'
      bg={isActive ? 'blue.50' : 'white'}
      textAlign='left'
    >
      <Text color={isActive ? 'blue.400' : 'black'} fontSize='0.875rem'>
        {label}
      </Text>
    </Box>
  );
}
export default OrderButton;
