import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { RequestPagingCommon } from 'interfaces/common';
import staticPageServices, { CreateStaticPage } from 'services/staticPageServices';

export const useGetListHelp = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.listHelp, filters],
    queryFn: () => staticPageServices.getList(filters),
  });
};

export const useCreateHelp = () => {
  return useMutation({
    mutationFn: (body: CreateStaticPage) => staticPageServices.createNew(body),
  });
};

export const useGetHelpDetail = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.detailHelp, id],
    queryFn: () => staticPageServices.getDetail(id),
    enabled: !!id,
  });
};

export const useUpdateHelp = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: CreateStaticPage }) =>
      staticPageServices.update(id, body),
  });
};
