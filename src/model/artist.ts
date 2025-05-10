import type { IArtPreivew } from './art';

export interface ICreatorRequestBody {
  creatorName: string;
  creatorDesc: string;
  creatorTags: string;
}
export interface ICreator {
  id: number;
  creatorName: string;
  creatorDesc: string;
  creatorThumbnail?: string;
  creatorTags: string[];
  createdAt: Date;
}

export interface ICreatorResponse {
  success: boolean;
  msg: string;
  lists: ICreator[];
}
export interface ICreatorGroup {
  filter: string;
  lists: ICreator[];
}

export interface ICreatorDetailResponse {
  success: boolean;
  msg: string;
  creator: ICreator;
  art: IArtPreivew[];
}
