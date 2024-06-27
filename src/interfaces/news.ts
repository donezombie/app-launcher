import { AppType } from 'consts/enum';

export interface News {
  id: string;
  title: string;
  body: string;
  thumbUrl: string;
  isNew?: boolean;
  type: AppType;
  directDetail: string;
  SpecificNews: SpecificNews[];
  appId: string[];
}

export interface SpecificNews {
  id: number;
  newsId: number;
  appId: string;
  createdAt: Date;
  updatedAt: Date;
}
