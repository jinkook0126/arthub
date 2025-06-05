import { IArt } from './art';
import { ICreator } from './artist';

export interface IMainResponse {
  success: boolean;
  error: string;
  data: {
    artList: IArt[];
    creatorList: ICreator[];
  };
}
