import {
  PromiseResponseBase,
  RequestPagingCommon,
  ResponseCommonPaging,
  ResponseGenerator,
} from 'interfaces/common';
import httpService from './httpService';
import queryString from 'query-string';
import { Notification } from 'interfaces/notification';
import {
  LIST_NOTIFICATION,
  LIST_NOTIFICATION_CREATE_NEW,
  LIST_USER_RECEIVE_NOTIFICATION,
} from 'consts/apiUrl';

type ResponseListNotification = ResponseGenerator<ResponseCommonPaging<Notification[]>>;

export interface RequestCreateNotification {
  title?: string;
  body?: string;
  imageUrl?: string;
  type?: string;
}

export interface RequestUserReceiveNotification {
  id: string;
  username: string;
  subId: string;
  companyId: string;
  password: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
}

class NotificationServices {
  getListNotification(filter: RequestPagingCommon): PromiseResponseBase<ResponseListNotification> {
    return httpService.get(`${LIST_NOTIFICATION}?${queryString.stringify(filter)}`);
  }

  postCreateNotification(body: RequestCreateNotification) {
    return httpService.post(`${LIST_NOTIFICATION_CREATE_NEW}`, body);
  }

  putEditNotification(id: string, body: RequestCreateNotification) {
    return httpService.patch(`${LIST_NOTIFICATION}/${id}`, body);
  }
  deleteNotification(id?: string) {
    return httpService.delete(`${LIST_NOTIFICATION}/${id}`);
  }
  getUserReceiveNotification(
    filter: RequestPagingCommon
  ): PromiseResponseBase<ResponseGenerator<RequestUserReceiveNotification[]>> {
    return httpService.get(`${LIST_USER_RECEIVE_NOTIFICATION}?${queryString.stringify(filter)}`);
  }
}

export default new NotificationServices();
