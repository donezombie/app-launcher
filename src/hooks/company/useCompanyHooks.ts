import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { CategoryType } from 'consts/enum';
import { RequestPagingCommon } from 'interfaces/common';
import categoryServices from 'services/categoryServices';
import companyServices from 'services/companyServices';

export interface BodyCreateCompany {
  name: string;
  logo: string;
  colorBackground: string;
  colorHeader: string;
  address?: string;
  hotline?: string | null;
  website?: string;
  description?: string;
}

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: (body: BodyCreateCompany) => companyServices.createNewCompany(body),
  });
};

export const useGetCompanyList = (filters?: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.listCompany, filters],
    queryFn: () => companyServices.getListCompany(filters),
  });
};

export const useGetCompanyDetail = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.getCompanyDetail, id],
    queryFn: () => companyServices.getDetailCompany(id),
    enabled: !!id,
  });
};

export const useUpdateCompany = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: BodyCreateCompany }) =>
      companyServices.updateCompany(id, body),
  });
};

// export const useDeleteAppIDCategory = () => {
//   return useMutation({
//     mutationFn: ({ id, appID }: { id: string; appID: string }) =>
//       categoryServices.deleteAppIDCategory(id, appID),
//   });
// };

// export const useDeleteCategory = () => {
//   return useMutation({
//     mutationFn: ({ id }: { id: string }) => categoryServices.deleteCategory(id),
//   });
// };
