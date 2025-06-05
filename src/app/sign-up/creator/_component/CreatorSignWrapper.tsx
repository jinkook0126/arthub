'use client';

import { CreatorSignProvider } from './CreatorSignContext';
import CreatorSignRouter from './CreatorSignRouter';

function CreatorSignWrapper() {
  return (
    <CreatorSignProvider>
      <CreatorSignRouter />
    </CreatorSignProvider>
  );
}

export default CreatorSignWrapper;
