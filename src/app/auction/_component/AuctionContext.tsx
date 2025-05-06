import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface AuctionState {
  saleStatus: 'sale' | 'end';
}
const AuctionContext = createContext<AuctionState | undefined>(undefined);
const AuctionUpdateContext = createContext<
  | {
      setSaleStatus: (saleStatus: 'sale' | 'end') => void;
    }
  | undefined
>(undefined);

export const useAuctionState = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('옥션 컨텍스트가 없습니다.');
  }
  return context;
};

export const useAuctionUpdate = () => {
  const context = useContext(AuctionUpdateContext);
  if (!context) {
    throw new Error('옥션 컨텍스트가 없습니다.');
  }
  return context;
};

export function AuctionProvider({ children }: { children: ReactNode }) {
  const [saleStatus, setSaleStatus] = useState<AuctionState['saleStatus']>('sale');

  const value = useMemo(() => ({ saleStatus }), [saleStatus]);
  const updateValue = useMemo(() => ({ setSaleStatus }), [setSaleStatus]);
  return (
    <AuctionContext.Provider value={value}>
      <AuctionUpdateContext.Provider value={updateValue}>{children}</AuctionUpdateContext.Provider>
    </AuctionContext.Provider>
  );
}
