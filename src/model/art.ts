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
  winnerId: number;
  artTitle: string;
  auctionEndAt: Date;
  Creators: ICreator;
}

export interface IArtResponse {
  success: boolean;
  msg: string;
  art: IArt[];
}
