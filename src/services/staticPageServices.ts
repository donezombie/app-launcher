import { BASE_URL } from 'consts/apiUrl';
import {
  PromiseResponseBase,
  RequestPagingCommon,
  ResponseCommonPaging,
  ResponseGenerator,
} from 'interfaces/common';
import { IStaticPage } from 'interfaces/staticPage';
import queryString from 'query-string';
import httpService from './httpService';

export interface CreateStaticPage {
  title: string;
  icon: string;
  body: string;
  thumbUrl: string;
  url?: string;
  description?: string;
  topic: string;
  category?: string;
}

type ResponseDetail = ResponseGenerator<CreateStaticPage>;
type ResponseListNew = ResponseGenerator<ResponseCommonPaging<IStaticPage[]>>;

class StaticPageServices {
  getList(filters: RequestPagingCommon): PromiseResponseBase<ResponseListNew> {
    return httpService.get(`${BASE_URL}/static-page?${queryString.stringify(filters)}`);
  }

  createNew(body: CreateStaticPage) {
    return httpService.post(`${BASE_URL}/static-page`, body);
  }
  getDetail(id: string): PromiseResponseBase<ResponseDetail> {
    return httpService.get(`${BASE_URL}/static-page/${id}`);
  }

  update(id: string, body: CreateStaticPage) {
    return httpService.patch(`${BASE_URL}/static-page/${id}`, body);
  }
  delete(id: string) {
    return httpService.delete(`${BASE_URL}/static-page/${id}`);
  }
}

export default new StaticPageServices();
