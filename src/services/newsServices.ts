import queryString from 'query-string';
import { APP_INTEGRATION_URL, APP_MANAGEMENT_URL, LIST_NEW } from 'consts/apiUrl';
import { App, AppIntegration } from 'interfaces/apps';
import { PromiseResponseBase, RequestPagingCommon, ResponseCommonPaging } from 'interfaces/common';
import httpService from './httpService';
import { UserRequestingApp } from 'interfaces/user';
import { get } from 'lodash';
import { News } from 'interfaces/news';

type ResponseListNew = ResponseCommonPaging<News[]>;

export interface RequestCreateNews {
  title: string;
  body: string;
}

class NewsServices {
  getListNews({ skip, take, filter }: RequestPagingCommon): PromiseResponseBase<ResponseListNew> {
    return httpService.get(`${LIST_NEW}/list/?filter=${filter}&skip=${skip}&take=${take}`);
  }

  postCreateNews(body: RequestCreateNews) {
    return httpService.post(`${LIST_NEW}/create`, body);
  }

  putEditNews(id: string, body: RequestCreateNews) {
    return httpService.put(`${LIST_NEW}/update?id=${id}`, body);
  }
  deleteNews(id?: string) {
    return httpService.delete(`${LIST_NEW}/delete?id=${id}`);
  }
}

export default new NewsServices();
