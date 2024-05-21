import { db } from '../../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { ICategory } from 'interfaces/category';
import { useEffect, useState } from 'react';

export const useGetListCategory = () => {
  const [category, setcategory] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const ref = query(collection(db, `categories`));
    const unsubChats = onSnapshot(ref, (snapshot) => {
      const data = snapshot?.docs?.map((doc) => {
        const item = doc.data();
        return { ...item } as ICategory;
      });

      setcategory(data);
      setLoading(false);
    });
    return () => {
      unsubChats();
    };
  }, []);
  return { category, loading };
};
