import { LIST_NEW } from 'consts/apiUrl';
import {
  PromiseResponseBase,
  RequestPagingCommon,
  ResponseCommonPaging,
  ResponseGenerator,
} from 'interfaces/common';
import httpService from './httpService';
import { get } from 'lodash';
import { News } from 'interfaces/news';
import queryString from 'query-string';

type ResponseListNew = ResponseGenerator<ResponseCommonPaging<News[]>>;

export interface RequestCreateNews {
  title?: string;
  body?: string;
  thumbUrl?: string;
  directDetail?: string;
  type?: string;
}

class NewsServices {
  getListNews(filter: RequestPagingCommon): PromiseResponseBase<ResponseListNew> {
    return httpService.get(`${LIST_NEW}?${queryString.stringify(filter)}`);
  }

  postCreateNews(body: RequestCreateNews) {
    return httpService.post(`${LIST_NEW}`, body);
  }

  putEditNews(id: string, body: RequestCreateNews) {
    return httpService.patch(`${LIST_NEW}/${id}`, body);
  }
  deleteNews(id?: string) {
    return httpService.delete(`${LIST_NEW}/${id}`);
  }
}

export default new NewsServices();
