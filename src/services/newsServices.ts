import { LIST_NEW } from 'consts/apiUrl';
import { PromiseResponseBase, RequestPagingCommon, ResponseCommonPaging } from 'interfaces/common';
import httpService from './httpService';
import { get } from 'lodash';
import { News } from 'interfaces/news';

type ResponseListNew = ResponseCommonPaging<News[]>;

export interface RequestCreateNews {
  title: string;
  body: string;
  thumbnail: string;
  isNew: boolean;
}

class NewsServices {
  getListNews({ skip, take, filter }: RequestPagingCommon): PromiseResponseBase<ResponseListNew> {
    return httpService.get(`${LIST_NEW}/list/?filter=${filter}&skip=${skip}&take=${take}`);
  }

  postCreateNews(body: RequestCreateNews) {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, get(body, key));
    }
    return httpService.post(`${LIST_NEW}/create`, formData);
  }

  putEditNews(id: string, body: RequestCreateNews) {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, get(body, key));
    }
    return httpService.put(`${LIST_NEW}/update?id=${id}`, formData);
  }
  deleteNews(id?: string) {
    return httpService.delete(`${LIST_NEW}/delete?id=${id}`);
  }
}

export default new NewsServices();
