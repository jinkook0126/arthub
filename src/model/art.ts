import type { ICreator } from './artist';

export interface IArtPreivew {
  url: string;
  id: number;
  isAuctionActive: boolean;
}

export interface IArt {
  id: number;
  url: string;
  startingPrice: number;
  currentPrice: number;
  buyoutPrice: number;
  bidCount: number;
  isAuctionActive: boolean;
  createdAt: Date;
  sellerId: number;
  winnerId: string;
  artTitle: string;
  artDesc: string;
  artMaterial: string;
  artSize: string;
  artCreatedAt: Date;
  auctionEndAt: Date;
  Creators: ICreator;
}

export interface IBidHistoryItem {
  id: number;
  userId: string;
  artId: number;
  bidAmount: number;
  Art: {
    url: string;
    winnerId: string;
    isAuctionActive: boolean;
    currentPrice: number;
  };
}

export interface IArtResponse {
  success: boolean;
  msg: string;
  art: IArt[];
}

export interface IBidHistoryResponse {
  success: boolean;
  msg: string;
  list: IBidHistoryItem[];
}
