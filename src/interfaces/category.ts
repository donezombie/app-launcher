import { CategoryType } from 'consts/enum';

export interface ICategory {
  id: string;
  name: string;
  apps?: string[];
}

export interface CategoryData {
  items: Category[];
  perPage: number;
  totalItems: number;
  totalPage: number;
}
export interface Category {
  id: number;
  name: string;
  categoryType: CategoryType;
}
