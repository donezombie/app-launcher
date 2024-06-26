import { uniqueId } from 'lodash';
import { ICategory } from 'interfaces/category';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { removeAppID } from 'helpers';
import httpService from './httpService';
import { BASE_URL } from 'consts/apiUrl';
import { BodyCreateCompany } from 'hooks/company/useCompanyHooks';
import queryString from 'query-string';
import {
  PromiseResponseBase,
  RequestPagingCommon,
  ResponseCommonPaging,
  ResponseGenerator,
} from 'interfaces/common';
import { ICompany } from 'interfaces/company';

type ResponseCompanyDetail = ResponseGenerator<ICompany>;
type ResponseCompanyList = ResponseGenerator<ResponseCommonPaging<ICompany[]>>;

class CompanyServices {
  createNewCompany(body: BodyCreateCompany) {
    return httpService.post(`${BASE_URL}/company`, body);
  }

  getListCompany(filters?: RequestPagingCommon): PromiseResponseBase<ResponseCompanyList> {
    return httpService.get(`${BASE_URL}/company?${queryString.stringify(filters ? filters : {})}`);
  }

  getDetailCompany(id: string): PromiseResponseBase<ResponseCompanyDetail> {
    return httpService.get(`${BASE_URL}/company/${id}`);
  }

  updateCompany(id: string, body: BodyCreateCompany) {
    return httpService.patch(`${BASE_URL}/company/${id}`, body);
  }
  deleteCompany(id: string) {
    return httpService.delete(`${BASE_URL}/company/${id}`);
  }
}

export default new CompanyServices();
