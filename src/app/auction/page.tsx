import { Box } from '@chakra-ui/react';
import SaleStatusTabs from './_component/SaleStatusTabs';

export default function Home() {
  return (
    <Box flexGrow={1} maxW='1280px' bg='red.50' mx='auto' w='100%'>
      <SaleStatusTabs />
    </Box>
  );
}
