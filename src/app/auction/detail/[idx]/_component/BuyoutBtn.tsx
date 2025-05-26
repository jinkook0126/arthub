import {
  Center,
  Input,
  Flex,
  Modal,
  ModalBody,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  ModalContent,
  Button,
  Box,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { IBaseResponse } from '@/model/common';
import { useState } from 'react';
import useArtDetail from '../_lib/useArtDetail';

export function BuyoutBtn() {
  const queryClient = useQueryClient();
  const { idx } = useParams();
  const [buyoutText, setBuyoutText] = useState('');
  const { data } = useArtDetail({ id: Number(idx) });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { status } = useSession();

  const { mutate, isPending } = useMutation<IBaseResponse, Error, { idx: number }>({
    mutationFn: async (params: { idx: number }) => {
      const res = await fetch('/api/auction/buyout', {
        method: 'post',
        body: JSON.stringify({
          auctionIdx: params.idx,
        }),
      });
      return res.json();
    },
    onSuccess: res => {
      if (res.success) {
        onClose();
        queryClient.refetchQueries({ queryKey: ['auction', Number(idx)] });
        toast({
          title: '즉시 구매 완료',
          status: 'success',
        });
        return;
      }
      toast({
        title: '즉시 구매 실패',
        description: res.error,
        status: 'error',
      });
    },
  });
  const onOpenBidModal = () => {
    if (status !== 'authenticated') {
      toast({
        title: '로그인 후 이용해주세요.',
        status: 'error',
      });
    }
    if (!data?.art.isAuctionActive) {
      toast({
        title: '경매가 진행중이지 않습니다.',
        status: 'error',
      });
      return;
    }
    onOpen();
  };
  const onBuyout = () => {
    mutate({ idx: Number(idx) });
  };
  const onCancel = () => {
    onClose();
  };
  return (
    <>
      <Center
        as='button'
        h='56px'
        flex={1}
        bg='green.300'
        _hover={{ bg: 'green.400' }}
        borderRadius='3px'
        color='white'
        onClick={onOpenBidModal}
      >
        <Text>즉시 구매하기</Text>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p='20px'>
            <Text fontSize='14px' color='gray.500' lineHeight='28px' textAlign='center'>
              <Text as='span' color='black' fontWeight='bold' fontSize='20px' pr='4px'>
                {data?.art.Creators.creatorName}
              </Text>
              작가님의 <br />
              <Text as='span' color='black' fontWeight='bold' fontSize='20px' pr='4px'>
                {data?.art.artTitle}
              </Text>
              를 즉시 구매하시겠습니까?
            </Text>
            <Flex mt='20px' flexDir='column' gap='20px' w='80%' mx='auto'>
              <Flex justifyContent='space-between' alignItems='center'>
                <Box flex={1}>
                  <Text fontSize='16px' color='gray.500'>
                    즉시 구매가
                  </Text>
                </Box>
                <Box flex={3}>
                  <Text fontSize='16px' color='black' fontWeight='bold' textAlign='right'>
                    {data?.art.buyoutPrice.toLocaleString()} KRW
                  </Text>
                </Box>
              </Flex>
              <Flex justifyContent='space-between' alignItems='flex-start' flexDir='column' gap='6px'>
                <Flex alignItems='center' gap='2px'>
                  <Box px='6px' py='4px' bg='red.100' mr='2px'>
                    <Text fontSize='14px' fontWeight={600}>
                      즉시 구매하겠습니다
                    </Text>
                  </Box>
                  <Text fontSize='14px' fontWeight={400} color='gray.500'>
                    를 입력해주세요
                  </Text>
                </Flex>
                <Box w='100%'>
                  <Input type='text' onChange={e => setBuyoutText(e.target.value)} placeholder='즉시 구매하겠습니다' />
                </Box>
              </Flex>
            </Flex>
            <Flex mt='20px' gap='10px' align='center' justify='center'>
              <Center
                as={Button}
                bg='blue.300'
                onClick={onBuyout}
                px='20px'
                h='40px'
                borderRadius='3px'
                _hover={{ bg: 'blue.400' }}
                isLoading={isPending}
                isDisabled={buyoutText !== '즉시 구매하겠습니다'}
              >
                <Text fontSize='16px' color='white' fontWeight='bold'>
                  즉시 구매하기
                </Text>
              </Center>
              <Center
                as={Button}
                onClick={onCancel}
                px='20px'
                h='40px'
                borderRadius='3px'
                bg='red.300'
                _hover={{ bg: 'red.400' }}
              >
                <Text fontSize='16px' color='white' fontWeight='bold'>
                  취소
                </Text>
              </Center>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
