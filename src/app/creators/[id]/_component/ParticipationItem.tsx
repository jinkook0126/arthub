'use client';

import NextLink from 'next/link';
import { GridItem, Image } from '@chakra-ui/react';

interface Props {
  uri: string;
  imgUri: string;
}
function ParticipationItem({ uri, imgUri }: Props) {
  return (
    <GridItem w='228px' h='228px' pos='relative' as={NextLink} href={uri}>
      <Image src={imgUri} w='100%' h='100%' pos='absolute' objectFit='cover' inset={0} />
    </GridItem>
  );
}
export default ParticipationItem;
