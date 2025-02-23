'use client';

import { Flex, Box, Text, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import { UpDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import OrderButton from './OrderButton';

const ORDER_OPTIONS = ['최신순', '응찰순', '높은 가격 순', '낮은 가격 순'];

function OrderButtonList() {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [order, setOrder] = useState(ORDER_OPTIONS[0]);
  const onButtonClick = (by: string) => {
    setOrder(by);
    onClose();
  };
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Flex
          as='button'
          onClick={onToggle}
          borderWidth={1}
          borderColor='gray.400'
          borderRadius='8px'
          w='152px'
          px='12px'
          justify='space-between'
          alignItems='center'
          height='36px'
        >
          <Text fontSize='0.875rem'>{order}</Text>
          <UpDownIcon w='12px' h='12px' color='gray.400' />
        </Flex>
      </PopoverTrigger>
      <PopoverContent w='152px'>
        <PopoverBody p={0}>
          <Box padding='0.25rem'>
            {ORDER_OPTIONS.map(option => (
              <OrderButton
                key={option}
                callback={() => onButtonClick(option)}
                isActive={order === option}
                label={option}
              />
            ))}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
export default OrderButtonList;
