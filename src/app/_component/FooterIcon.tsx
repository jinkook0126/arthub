'use client';

import { createIcon } from '@chakra-ui/icons';

export const GithubIcon = createIcon({
  displayName: 'GithubIcon',
  viewBox: '0 -2 24 24',
  path: (
    <path
      width='1.5em'
      height='1.5em'
      fill='currentColor'
      d='M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0'
    />
  ),
});

export const MailIcon = createIcon({
  displayName: 'MailIcon',
  viewBox: '0 0 24 24',
  path: (
    <path
      width='1.5em'
      height='1.5em'
      fill='currentColor'
      d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
    />
  ),
});

export const HomeIcon = createIcon({
  displayName: 'HomeIcon',
  viewBox: '0 0 24 24',
  path: <path width='1.5em' height='1.5em' fill='currentColor' d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />,
});
