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
