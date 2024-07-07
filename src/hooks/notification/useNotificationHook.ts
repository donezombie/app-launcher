import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { RequestPagingCommon } from 'interfaces/common';
import notificationService, { RequestCreateNotification } from 'services/notificationService';

export const useGetNotificationListHooks = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getListNotification, filters],
    queryFn: () => notificationService.getListNotification(filters),
  });
};

export const useCreateNotification = () => {
  return useMutation({
    mutationFn: (body: RequestCreateNotification) =>
      notificationService.postCreateNotification(body),
  });
};

export const useUpdateNotification = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: RequestCreateNotification }) =>
      notificationService.putEditNotification(id, body),
  });
};

export const useDeleteNotification = () => {
  return useMutation({
    mutationFn: ({ id }: { id?: string }) => notificationService.deleteNotification(id),
  });
};

export const useGetUserReceiveNotification = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getUserReceiveNotification],
    queryFn: () => notificationService.getUserReceiveNotification(filters),
  });
};

export const useGetListNoti = () => {
  return useQuery({
    queryKey: [queryKeys.getListNotification],
    queryFn: () => notificationService.getListNoti({}),
  });
};

export const useReadAllNoti = () => {
  return useMutation({
    mutationFn: () => notificationService.postReadAllNoti({}),
  });
};

export const useReadEachNoti = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => notificationService.postNotificationRead(id, {}),
  });
};
