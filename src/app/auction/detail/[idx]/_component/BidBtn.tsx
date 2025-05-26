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
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { IBaseResponse } from '@/model/common';
import useArtDetail from '../_lib/useArtDetail';

export function BidBtn() {
  const queryClient = useQueryClient();
  const { idx } = useParams();
  const { data } = useArtDetail({ id: Number(idx) });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState(0);
  const toast = useToast();
  const { status } = useSession();

  const { mutate, isPending } = useMutation<IBaseResponse, Error, { idx: number; price: number }>({
    mutationFn: async (params: { idx: number; price: number }) => {
      const res = await fetch('/api/auction/bid', {
        method: 'post',
        body: JSON.stringify({
          auctionIdx: params.idx,
          price: params.price,
        }),
      });
      return res.json();
    },
    onSuccess: res => {
      if (res.success) {
        onClose();
        setPrice(0);
        queryClient.refetchQueries({ queryKey: ['auction', Number(idx)] });
        toast({
          title: '응찰 완료',
          status: 'success',
        });
        return;
      }
      toast({
        title: '응찰 실패',
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
      return;
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
  const onBid = () => {
    mutate({ idx: Number(idx), price });
  };
  const onCancel = () => {
    setPrice(0);
    onClose();
  };
  return (
    <>
      <Center
        as='button'
        h='56px'
        flex={1}
        bg='blue.300'
        _hover={{ bg: 'blue.400' }}
        borderRadius='3px'
        color='white'
        onClick={onOpenBidModal}
      >
        <Text>응찰하기</Text>
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
              의 경매에 참여하시겠습니까?
            </Text>
            <Flex mt='20px' flexDir='column' gap='10px' w='80%' mx='auto'>
              <Flex justifyContent='space-between' alignItems='center'>
                <Box flex={1}>
                  <Text fontSize='16px' color='gray.500'>
                    현재가
                  </Text>
                </Box>
                <Box flex={3}>
                  <Text fontSize='16px' color='black' fontWeight='bold' textAlign='right'>
                    {data?.art.currentPrice.toLocaleString()} KRW
                  </Text>
                </Box>
              </Flex>
              <Flex justifyContent='space-between' alignItems='center'>
                <Box>
                  <Text fontSize='16px' color='gray.500'>
                    응찰가
                  </Text>
                </Box>
                <Box>
                  <Input type='number' onChange={e => setPrice(Number(e.target.value))} textAlign='right' />
                </Box>
              </Flex>
            </Flex>
            <Flex mt='20px' gap='10px' align='center' justify='center'>
              <Center
                as={Button}
                bg='blue.300'
                onClick={onBid}
                w='100px'
                h='40px'
                borderRadius='3px'
                _hover={{ bg: 'blue.400' }}
                isLoading={isPending}
              >
                <Text fontSize='16px' color='white' fontWeight='bold'>
                  응찰하기
                </Text>
              </Center>
              <Center
                as={Button}
                onClick={onCancel}
                w='100px'
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
