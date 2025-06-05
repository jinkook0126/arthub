import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface AuctionState {
  saleStatus: 'sale' | 'end';
  filter: string;
}
const AuctionContext = createContext<AuctionState | undefined>(undefined);
const AuctionUpdateContext = createContext<
  | {
      setSaleStatus: (saleStatus: 'sale' | 'end') => void;
      setFilter: (filter: string) => void;
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
  const [filter, setFilter] = useState<AuctionState['filter']>('');

  const value = useMemo(() => ({ saleStatus, filter }), [saleStatus, filter]);
  const updateValue = useMemo(() => ({ setSaleStatus, setFilter }), [setSaleStatus, setFilter]);
  return (
    <AuctionContext.Provider value={value}>
      <AuctionUpdateContext.Provider value={updateValue}>{children}</AuctionUpdateContext.Provider>
    </AuctionContext.Provider>
  );
}
