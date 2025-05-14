import {
  Center,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  ModalContent,
  Button,
} from '@chakra-ui/react';
// import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import useArtDetail from '../_lib/useArtDetail';

export function BidBtn() {
  const { idx } = useParams();
  const { data } = useArtDetail({ id: Number(idx) });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState(0);
  // const { mutate } = useMutation({
  //   mutationFn: async () => {
  //     const res = await fetch('/api/auction/bid', {
  //       method: 'post',
  //       body: JSON.stringify({
  //         auctionIdx: 1,
  //         price: 10000,
  //       }),
  //     });
  //     return res.json();
  //   },
  // });
  const { status } = useSession();
  const toast = useToast();
  const onOpenBidModal = () => {
    if (status !== 'authenticated') {
      toast({
        title: '로그인 후 이용해주세요.',
        status: 'error',
      });
    }
    onOpen();
    // mutate();
  };
  const onBid = () => {
    console.warn(price);
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
          <ModalHeader>응찰하기</ModalHeader>
          <ModalBody>
            <Text>{data?.art.artTitle}의 경매에 참여하시겠습니까?</Text>
            <Input type='number' onChange={e => setPrice(Number(e.target.value))} />
            <Button onClick={onBid}>응찰하기</Button>
            <Button onClick={onCancel}>취소</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
