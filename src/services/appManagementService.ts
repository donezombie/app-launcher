import {
  APP_INTEGRATION_URL,
  APP_MANAGEMENT_URL,
  APP_MANAGER,
  BASE_URL,
  LIST_NEW,
} from 'consts/apiUrl';
import { App, AppData, AppDetail, AppIntegration, NewApp } from 'interfaces/apps';
import { Category, CategoryData } from 'interfaces/category';
import {
  PromiseResponseBase,
  RequestPagingCommon,
  ResponseCommonPaging,
  ResponseGenerator,
} from 'interfaces/common';
import { News } from 'interfaces/news';
import { UserRequestData, UserRequestingApp } from 'interfaces/user';
import queryString from 'query-string';
import httpService from './httpService';

type ResponseListAppNew = ResponseGenerator<AppData>;
type ResponseListApp = ResponseCommonPaging<App[]>;
type ResponseListNew = ResponseCommonPaging<News[]>;
type ResponseListCategory = ResponseGenerator<CategoryData>;
type ResponseCategoryDetail = ResponseGenerator<Category>;

export type RequestCreateApp = Omit<
  AppIntegration,
  | 'id'
  | 'ownerUserId'
  | 'developerName'
  | 'developerDescription'
  | 'appClientSecret'
  | 'appClientName'
  | 'appClientId'
>;

export interface RequestApproveApp {
  appId: string;
  isApprove: boolean;
}

export interface RequestLiveApp {
  appId: string;
  isAlive: boolean;
}

export interface RequestCheckAppCredential {
  userId: string;
  appClientId: string;
}

export interface RequestApproval {
  id: string;
  data: {
    userId: number;
    isAccess: boolean;
  };
}

export interface RequestCreateApproval {
  appId: string;
}

export interface RequestListAppRequesting extends RequestPagingCommon {
  appId: string;
}

export interface ResponseGenerateAppCredentials {
  appClientName: string;
  appClientId: string;
  appClientSecret: string;
}

class AppManagementService {
  getListApp(filters: RequestPagingCommon): PromiseResponseBase<ResponseListAppNew> {
    return httpService.get(`${BASE_URL}/app-integration?${queryString.stringify(filters)}`);
  }

  getListAppManager(body: RequestPagingCommon): PromiseResponseBase<ResponseListAppNew> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/manager-application-listing?${queryString.stringify(body)}`
    );
  }

  getInstalledListApp(body: RequestPagingCommon): PromiseResponseBase<ResponseListApp> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/installed-application-listing?${queryString.stringify(body)}`
    );
  }

  installApp({ id }: { id: string }) {
    return httpService.post(`${APP_MANAGEMENT_URL}/install`, { id });
  }

  uninstallApp({ id }: { id: string }) {
    return httpService.post(`${APP_MANAGEMENT_URL}/uninstall`, { id });
  }

  getListAppRequesting(
    id: string,
    body: RequestPagingCommon
  ): PromiseResponseBase<ResponseGenerator<UserRequestData>> {
    return httpService.get(`${BASE_URL}/access-app/${id}?${queryString.stringify(body)}`);
  }

  getListAppStore(body: RequestPagingCommon): PromiseResponseBase<ResponseCommonPaging<App[]>> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/store-application-listing?${queryString.stringify(body)}`
    );
  }

  requestApproval(body: RequestApproval) {
    return httpService.post(`${APP_MANAGER}/approved-access/${body.id}`, { ...body.data });
  }

  requestCreate(id: string) {
    return httpService.post(`${APP_MANAGER}/request-access/${id}`);
  }

  //* APP INTEGRATION

  getAppIntegration({ id }: { id: string }): PromiseResponseBase<any> {
    // getAppIntegration({ id }: { id: string }): PromiseResponseBase<AppDetail> {
    return httpService.get(`${APP_INTEGRATION_URL}/${id}`);
  }

  // createApp(body: RequestCreateApp) {
  //   const formData = new FormData();
  //   for (const key in body) {
  //     formData.append(key, get(body, key));
  //   }
  //   return httpService.post(`${APP_INTEGRATION_URL}/create`, formData);
  // }

  createApp(body: RequestCreateApp) {
    return httpService.post(`${BASE_URL}/app-integration`, body);
  }

  updateApp(id: string, body: RequestCreateApp) {
    // const formData = new FormData();
    // for (const key in body) {
    //   formData.append(key, get(body, key));
    // }
    return httpService.patch(`${APP_INTEGRATION_URL}/${id}`, body);
  }

  setApproveState({ appId, isApprove }: RequestApproveApp) {
    return httpService.patch(`${BASE_URL}/app-manager/approve/${appId}`, { isApprove });
  }

  setLiveState({ appId, isAlive }: RequestLiveApp) {
    return httpService.patch(`${BASE_URL}/app-manager/alive/${appId}`, { isAlive });
  }

  generateAppCredentials(appId: string): PromiseResponseBase<ResponseGenerateAppCredentials> {
    return httpService.post(`${APP_INTEGRATION_URL}/generate-app-credentials?appId=${appId}`, {});
  }

  checkAppCredential(body: RequestCheckAppCredential) {
    return httpService.post(`${APP_INTEGRATION_URL}/check-app-credential`, body);
  }

  getListNews({ skip, take, filter }: RequestPagingCommon): PromiseResponseBase<ResponseListNew> {
    return httpService.get(`${LIST_NEW}/?filter=${filter}&skip=${skip}&take=${take}`);
  }
  getListCategory(filters?: RequestPagingCommon): PromiseResponseBase<ResponseListCategory> {
    return httpService.get(`${BASE_URL}/category?${queryString.stringify(filters ? filters : {})}`);
  }
  getDetailCategory(id: string): PromiseResponseBase<ResponseCategoryDetail> {
    return httpService.get(`${BASE_URL}/category/${id}`);
  }
  approvalAll(body: { id: number; isAccess: boolean }) {
    return httpService.post(`${APP_MANAGER}/approved-access-all/${body.id}`, {
      isAccess: body.isAccess,
    });
  }
  deleteAppIntegration(id?: string) {
    return httpService.delete(`${APP_INTEGRATION_URL}/${id}`);
  }
}

export default new AppManagementService();
