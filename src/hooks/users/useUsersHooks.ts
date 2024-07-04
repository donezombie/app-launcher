import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';
import userService, {
  RequestAssignUser,
  RequestGetListUser,
  RequestUpdateUserInfo,
} from 'services/userService';

export const useGetUserInfo = (isTrigger?: boolean) => {
  return useQuery({
    queryKey: [queryKeys.getUserInfo],
    queryFn: () => userService.getUserInfo(),
    enabled: isTrigger,
    retry: 1,
  });
};

export const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: RequestUpdateUserInfo }) =>
      userService.updateUserInfo(id, body),
  });
};

export const useAssignUser = () => {
  return useMutation({
    mutationFn: (body: RequestAssignUser) => userService.assignUser(body),
  });
};

export const useUnAssignUser = () => {
  return useMutation({
    mutationFn: (body: RequestAssignUser) => userService.unAssignUser(body),
  });
};

export const useGetUserList = (filters: RequestGetListUser) => {
  return useQuery({
    queryKey: [queryKeys.getListUser, filters],
    queryFn: () => userService.getListUser(filters),
  });
};

export const useGetUserDetail = (username: string) => {
  return useQuery({
    queryKey: [queryKeys.getListUser, username],
    queryFn: () => userService.getUserDetail({ username }),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ username, body }: { username: string; body: RequestUpdateUserInfo }) =>
      userService.updateUser(username, body),
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => userService.signOut(),
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: () => userService.profile(),
  });
};
