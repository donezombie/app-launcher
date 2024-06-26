import { AppType } from 'consts/enum';

export interface News {
  id: string;
  title: string;
  body: string;
  thumbUrl: string;
  isNew?: boolean;
  type: AppType;
  directDetail: string;
}
