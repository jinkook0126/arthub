export interface ICreatorRequestBody {
  creatorName: string;
  creatorDesc: string;
  creatorTags: string;
}
export interface ICreator {
  creatorName: string;
  tags: string[];
  creatorId: string;
}
export interface ICreatorGroup {
  filter: string;
  lists: ICreator[];
}
