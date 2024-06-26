import { useMutation } from '@tanstack/react-query';
import { CategoryType } from 'consts/enum';
import categoryServices from 'services/categoryServices';

export interface BodyCreateCategory {
  name: string;
  categoryType: CategoryType;
}

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (body: BodyCreateCategory) => categoryServices.createNewCategory(body),
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: BodyCreateCategory }) =>
      categoryServices.updateCategory(id, body),
  });
};

export const useUpdateAppIDCategory = () => {
  return useMutation({
    mutationFn: ({ id, appID }: { id: string; appID: string }) =>
      categoryServices.updateAppIDCategory(id, appID),
  });
};

export const useDeleteAppIDCategory = () => {
  return useMutation({
    mutationFn: ({ id, appID }: { id: string; appID: string }) =>
      categoryServices.deleteAppIDCategory(id, appID),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => categoryServices.deleteCategory(id),
  });
};
