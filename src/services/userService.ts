import queryString from 'query-string';
import { USER_URL } from 'consts/apiUrl';
import { PERMISSION_ENUM } from 'consts/index';
import { PromiseResponseBase, RequestPagingCommon, ResponsePagingCommon } from 'interfaces/common';
import { UserInfo } from 'interfaces/user';
import httpService from './httpService';

export interface RequestUpdateUserInfo {
  firstname: string;
  lastname: string;
  company: string;
  address: string;
  phoneNumber: string;
}

export interface RequestAssignUser {
  username: string;
  role?: string;
  appId?: string;
}

export interface RequestGetListUser extends RequestPagingCommon {
  role?: PERMISSION_ENUM | string;
  appId?: string;
}

class UserService {
  getUserInfo(): PromiseResponseBase<UserInfo> {
    return httpService.get(`${USER_URL}/get-user-info`);
  }

  updateUserInfo(body: RequestUpdateUserInfo) {
    return httpService.post(`${USER_URL}/update-user-info`, body);
  }

  assignUser(body: RequestAssignUser) {
    return httpService.post(`${USER_URL}/assign-user`, body);
  }

  unAssignUser(body: RequestAssignUser) {
    return httpService.post(`${USER_URL}/unassign-user`, body);
  }

  getListUser(body: RequestGetListUser): PromiseResponseBase<ResponsePagingCommon<UserInfo[]>> {
    return httpService.get(`${USER_URL}/list-user?${queryString.stringify(body)}`);
  }

  getUserDetail({ username }: { username: string }) {
    return httpService.get(`${USER_URL}/get-user?username=${username}`);
  }

  updateUser(username: string, body: RequestUpdateUserInfo) {
    return httpService.post(`${USER_URL}/update-user?username=${username}`, body);
  }

  signOut(accessToken: string) {
    return httpService.post(`${USER_URL}/signout-global`, { accessToken });
  }
}

export default new UserService();
