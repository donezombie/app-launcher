import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ICategory } from 'interfaces/category';
import { useEffect, useState } from 'react';

export const useGetDetailCategory = (id: string) => {
  const [categoryDetail, setCategoryDetail] = useState<ICategory>();
  const [loading, setLoading] = useState(true);

  const getDetailCategory = async (id: string) => {
    setLoading(true);
    const categoryRef = doc(db, 'categories', id);

    const categorySnapshot = await getDoc(categoryRef);
    const data = categorySnapshot.data() as ICategory;
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
