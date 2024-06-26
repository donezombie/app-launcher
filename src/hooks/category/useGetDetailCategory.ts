import { useQuery } from '@tanstack/react-query';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Category, ICategory } from 'interfaces/category';
import { useEffect, useState } from 'react';
import { queryKeys } from 'consts';
import appManagementService from 'services/appManagementService';

export const useGetDetailCategory = (id: string) => {
  const [categoryDetail, setCategoryDetail] = useState<Category>();
  const [loading, setLoading] = useState(true);

  const getDetailCategory = async (id: string) => {
    setLoading(true);

    const detailCategory = await appManagementService.getDetailCategory(id);
    const data = detailCategory?.data?.data;
    if (data) {
      setCategoryDetail(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDetailCategory(id);
  }, [id]);
  return { categoryDetail, loading };
};
