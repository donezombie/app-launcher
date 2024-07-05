export interface SpecificNotification {
  id: number;
  notificationId: number;
  appId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Notification {
  id: number;
  title: string;
  subTitle: string;
  imageUrl: string;
  body: string;
  data: string;
  createdBy: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
