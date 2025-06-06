'use client';

import { Box, Text, Grid, GridItem, Card, Button, keyframes } from '@chakra-ui/react';
import { shuffleNumbers } from '@/utils/shuffle';
import { useState, useEffect, useRef } from 'react';

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

function FiftyGame() {
  const [remaining, setRemaining] = useState(100);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentNumber = useRef<number>(0);
  const [gameStatus, setGameStatus] = useState<'start' | 'idle' | 'win' | 'lose'>('idle');
  const [isError, setIsError] = useState<boolean>(false);
  const [card, setCard] = useState<number[]>([]);
  useEffect(() => {
    if (card.length === 0) {
      setCard(shuffleNumbers());
    }
  }, []);
  const onNumberClick = (selectedNumber: number) => {
    if (selectedNumber - currentNumber.current !== 1) {
      setIsError(true);
      return;
    }
    setCard(prev => prev.map(item => (item === selectedNumber ? item + 40 : item)));
    currentNumber.current = selectedNumber;
    if (selectedNumber === 40) {
      setGameStatus('win');
    }
  };
  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 500);
    }
  }, [isError]);

  const onGameStart = () => {
    setGameStatus('start');
    setRemaining(100);
    setCard(shuffleNumbers());
    currentNumber.current = 0;
  };

  const onRenderGameStatus = () => {
    switch (gameStatus) {
      case 'idle':
        return (
          <Box
            pos='absolute'
            top='0'
            left='0'
            w='100%'
            h='100%'
            bg='gray.100'
            zIndex='1'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Button onClick={onGameStart} colorScheme='blue'>
              게임시작
            </Button>
          </Box>
        );
      case 'win':
        return (
          <Box
            pos='absolute'
            top='0'
            left='0'
            w='100%'
            h='100%'
            bg='green.100'
            zIndex='1'
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
          >
            <Text fontSize='22px'>{(remaining * 10000).toLocaleString()}원이 충전되었습니다.</Text>
            <Button onClick={onGameStart} colorScheme='blue' mt='1rem'>
              다시하기
            </Button>
          </Box>
        );
      case 'lose':
        return (
          <Box
            pos='absolute'
            top='0'
            left='0'
            w='100%'
            h='100%'
            bg='red.100'
            zIndex='1'
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
          >
            <Text>예치금 만들기에 실패하였습니다.</Text>
            <Button onClick={onGameStart} colorScheme='blue' mt='1rem'>
              다시하기
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    if (gameStatus !== 'start') return;
    startTimeRef.current = new Date().getTime();

    timerRef.current = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = (now - startTimeRef.current) / 1000;
      const left = Math.max(0, 100 - Math.floor(elapsed));
      setRemaining(left);
      if (left === 0 && timerRef.current) {
        clearInterval(timerRef.current);
        setGameStatus('lose');
      }
    }, 200);

    // eslint-disable-next-line consistent-return
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);
  return (
    <Box mt='2rem'>
      <Text textAlign='left' fontSize='16px' mb='1rem'>
        남은시간 :
        <Text as='span' fontSize='22px' pl='4px'>
          {remaining}초
        </Text>
      </Text>
      <Card
        py='1rem'
        mt='1rem'
        bg={isError ? 'red.100' : 'gray.50'}
        pos='relative'
        animation={isError ? `${shake} 0.5s ease-in-out` : 'none'}
      >
        {onRenderGameStatus()}
        <Grid templateColumns='repeat(5,1fr)' rowGap='20px'>
          {card.map(item => (
            <GridItem key={item} display='flex' justifyContent='center' alignItems='center' h='20px'>
              <Box
                w='fit-content'
                onClick={() => onNumberClick(item)}
                cursor='pointer'
                as='button'
                _hover={{ fontWeight: 'bold', color: 'blue.500' }}
              >
                <Text fontSize='22px'>{item > 40 ? '' : item}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Card>

      <Box mt='2rem' textAlign='left'>
        <Text mb='4px' fontSize='16px'>
          게임방법
        </Text>
        <Text color='gray.400' fontSize='14px'>
          - 주어진 시간 내에 1에서부터 40까지 순서대로 숫자를 찾아 클릭해주세요.
        </Text>
        <Text color='gray.400' fontSize='14px'>
          - 남은 시간에 X10,000 을 한 금액이 예치금으로 충전됩니다.
        </Text>
      </Box>
    </Box>
  );
}
export default FiftyGame;
