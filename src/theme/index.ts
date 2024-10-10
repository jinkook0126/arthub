import { extendTheme } from '@chakra-ui/react';
import fonts from './fonts';
import breakpoints from './breakpoints';

const overrides = {
  fonts,
  breakpoints,
};
export default extendTheme(overrides);
