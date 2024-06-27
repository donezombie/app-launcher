import { uniqueId } from 'lodash';
import { ICategory } from 'interfaces/category';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { removeAppID } from 'helpers';
import httpService from './httpService';
import { BASE_URL } from 'consts/apiUrl';
import { ReportType } from 'consts/enum';
import { RequestPagingCommon } from 'interfaces/common';
import queryString from 'query-string';

export interface CreateReport {
  title: string;
  content: string;
  description: string;
  type?: ReportType;
}

class CategoryServices {
  getListReport(filters: RequestPagingCommon) {
    return httpService.get(`${BASE_URL}/report?${queryString.stringify(filters)}`);
  }

  createNewReport(body: CreateReport) {
    return httpService.post(`${BASE_URL}/report`, body);
  }
}

export default new CategoryServices();
