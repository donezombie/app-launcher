export interface SpecificNotification {
  id: string;
  notificationId: number;
  appId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Notification {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  body: string;
  data: string;
  createdBy: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;
  NotificationLogsWith: NotificationLogsWith[];
}

export interface NotificationLogsWith {
  id: string;
  notificationId: number;
  topicId: null;
  userId: number;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  User: User;
}

export interface User {
  id: string;
  username: string;
  subId: string;
  companyId: null;
  password: null;
  lastAccessToken: null;
  fcmToken: null;
  isVerifyOtp: boolean;
  lastName: string;
  firstName: string;
  phone: null;
  email: null;
  avatar: null;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
