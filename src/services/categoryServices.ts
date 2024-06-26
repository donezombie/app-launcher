import { uniqueId } from 'lodash';
import { ICategory } from 'interfaces/category';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { removeAppID } from 'helpers';
import httpService from './httpService';
import { BASE_URL } from 'consts/apiUrl';
import { BodyCreateCategory } from 'hooks/category/useCategoryHooks';

export interface RequestCreateNews {
  title: string;
  body: string;
}

class CategoryServices {
  async getDetailCategory(id: string) {
    const categoryRef = doc(db, 'categories', id);

    const categorySnapshot = await getDoc(categoryRef);
    return categorySnapshot.data();
  }

  // async createNewCategory(name: string) {
  //   const newIdCategory = uniqueId('category');
  //   const itemCategory: ICategory = {
  //     id: newIdCategory,
  //     name: name,
  //     apps: [''],
  //   };
  //   const categoryRef = doc(db, 'categories', newIdCategory);
  //   setDoc(categoryRef, itemCategory);
  // }

  // async updateCategory(id: string, name: string) {
  //   const categoryRef = doc(db, `categories/${id}`);
  //   updateDoc(categoryRef, {
  //     name: name,
  //   });
  // }

  async updateAppIDCategory(id: string, appID: string) {
    const categoryRef = doc(db, `categories/${id}`);
    const detailCategoryRef = doc(db, 'categories', id);

    const detailCategorySnapshot = await getDoc(detailCategoryRef);
    const detailData = detailCategorySnapshot.data() as ICategory;
    const appsDetailData = detailData?.apps || [];
    const newData = {
      ...detailData,
      apps: [...appsDetailData, appID],
    };
    updateDoc(categoryRef, newData);
  }

  async deleteAppIDCategory(id: string, appID: string) {
    const categoryRef = doc(db, `categories/${id}`);
    const detailCategoryRef = doc(db, 'categories', id);
    const detailCategorySnapshot = await getDoc(detailCategoryRef);
    const detailData = detailCategorySnapshot.data() as ICategory;
    const appsDetailData = detailData?.apps || [];
    const dataRemoved = removeAppID(appsDetailData, appID);
    const newData = {
      ...detailData,
      apps: [...dataRemoved],
    };
    updateDoc(categoryRef, newData);
  }

  // async deleteCategory(id: string) {
  //   const categoryRef = doc(db, `categories/${id}`);
  //   deleteDoc(categoryRef);
  // }

  createNewCategory(body: BodyCreateCategory) {
    return httpService.post(`${BASE_URL}/category`, body);
  }
  updateCategory(id: string, body: BodyCreateCategory) {
    return httpService.patch(`${BASE_URL}/category/${id}`, body);
  }
  deleteCategory(id: string) {
    return httpService.delete(`${BASE_URL}/category/${id}`);
  }
}

export default new CategoryServices();
