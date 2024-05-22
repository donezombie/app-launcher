import { useMutation } from '@tanstack/react-query';
import categoryServices from 'services/categoryServices';

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (name: string) => categoryServices.createNewCategory(name),
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      categoryServices.updateCategory(id, name),
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
