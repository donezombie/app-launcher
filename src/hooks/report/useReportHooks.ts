import { RequestPagingCommon } from 'interfaces/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import reportService, { CreateReport } from 'services/reportService';

export const useGetListReport = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getAppList, filters],
    queryFn: () => reportService.getListReport(filters),
  });
};

export const useCreateReport = () => {
  return useMutation({
    mutationFn: (body: CreateReport) => reportService.createNewReport(body),
  });
};
