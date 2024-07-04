import { AccessAppType, AppStatus } from 'consts/enum';
import { IUser } from 'providers/AuthenticationProvider';

export interface AppIntegration {
  id: string;
  ownerUserId: string;
  developerName: string;
  developerDescription: string;
  appType: number;
  loginRedirectUri: string;
  logoutRedirectUri: string;
  scopes: string;
  name: string;
  icon: string;
  supportEmail: string;
  phone: string;
  homepage: string;
  launchUri: string;
  termsConditionsUri: string;
  privacyPolicyUri: string;
  summary: string;
  description: string;
  isLive?: boolean;
  isApproved?: boolean;
  isAssigned?: boolean;
  appClientName?: string;
  appClientId?: string;
  appClientSecret?: string;
  requestCount?: number;
  avgerageRating?: number;
  tags?: string;
  previewImgUrls?: string;
  isInstalled?: boolean;
  reviews?: IReview[];
}

export type App = Pick<
  AppIntegration,
  | 'id'
  | 'name'
  | 'developerName'
  | 'summary'
  | 'icon'
  | 'isLive'
  | 'isApproved'
  | 'launchUri'
  | 'requestCount'
  | 'isAssigned'
  | 'isInstalled'
>;

export type IApp = {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  isInstalled?: boolean;
  isYourApp?: boolean;
};

export type IReview = {
  description: string;
  rating: number;
  reviewDateUtc: string | Date;
  title: string;
  username: string;
};

export type AppData = {
  items: NewApp[];
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPage: number;
};

export type AppDetail = {
  data: NewApp;
};

export interface NewApp {
  id: string;
  ownerUserId: number;
  developerName: string;
  developerDescription: null;
  loginRedirectUri: string;
  logoutRedirectUri: string;
  name: string;
  icon: string;
  supportEmail: string;
  phone: string;
  homepage: string;
  launchUri: string;
  termsConditionsUri: string;
  privacyPolicyUri: string;
  summary: string;
  description: string;
  isMarketplaceSSO: boolean;
  isPrivate: boolean;
  isInstalled: null;
  appClientName: string;
  appClientId: string;
  appClientSecret: string;
  categoryId: null;
  previewImgUrls: null;
  appType: string;
  status: AppStatus;
  createdAt: Date;
  updatedAt: Date;
  isLive: boolean;
  accessApp: UserAccess[];
  typeAccessApp: string;
  apiDoc: string;
}

export interface UserAccess {
  approvedUserId: number;
  appId: string;
  accessType: AccessAppType;
  expiredAt: Date;
  createdAt: Date;
  id: number;
  user: IUser;
}
