import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';
import { RequestPagingCommon } from 'interfaces/common';
import newsServices, { RequestCreateNews } from 'services/newsServices';

export const useGetNewsListHooks = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getListNew, filters],
    queryFn: () => newsServices.getListNews(filters),
  });
};

export const useCreateNews = () => {
  return useMutation({
    mutationFn: (body: RequestCreateNews) => newsServices.postCreateNews(body),
  });
};

export const useUpdateNew = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: RequestCreateNews }) =>
      newsServices.putEditNews(id, body),
  });
};

export const useDeleteNews = () => {
  return useMutation({
    mutationFn: ({ id }: { id?: string }) => newsServices.deleteNews(id),
  });
};
