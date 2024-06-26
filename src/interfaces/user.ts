import { UserAccess } from './apps';

export interface UserInfo {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  company: string;
  address: string;
  roles: string[];
  isFirstTimeLogin: boolean;
}

export interface UserRequestingApp {
  id: number;
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  appId: string;
  approvedUserId: number;
}

export interface UserRequestData {
  currentPage: number;
  items: UserAccess[];
  perPage: number;
  totalItems: number;
  totalPage: number;
}
