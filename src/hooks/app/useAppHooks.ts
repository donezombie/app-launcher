import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';
import { RequestPagingCommon } from 'interfaces/common';
import appManagementService, {
  RequestApproval,
  RequestCreateApp,
  RequestCreateApproval,
  RequestListAppRequesting,
  RequestLiveApp,
} from 'services/appManagementService';
import { RequestApproveApp, RequestCheckAppCredential } from 'services/appManagementService';

export const useGetListApp = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getAppList, filters],
    queryFn: () => appManagementService.getListApp(filters),
  });
};

export const useGetListAppForManager = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getAppListManager, filters],
    queryFn: () => appManagementService.getListAppManager(filters),
  });
};

export const useGetListInstalledApp = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getAppInstalledList, filters],
    queryFn: () => appManagementService.getInstalledListApp(filters),
  });
};

export const useGetListRequestingApp = (id: string, filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getAppRequesting, filters],
    queryFn: () => appManagementService.getListAppRequesting(id, filters),
  });
};

export const useGetAppStore = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getAppStore, filters],
    queryFn: () => appManagementService.getListAppStore(filters),
  });
};

export const useGetAppIntegrationDetail = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.getAppDetail, id],
    queryFn: () => appManagementService.getAppIntegration({ id }),
    enabled: !!id,
  });
};

export const useCreateAppIntegration = () => {
  return useMutation({
    mutationFn: (body: RequestCreateApp) => appManagementService.createApp(body),
  });
};

export const useUpdateAppIntegration = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: RequestCreateApp }) =>
      appManagementService.updateApp(id, body),
  });
};

export const useInstallApp = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => appManagementService.installApp({ id }),
  });
};

export const useUninstallApp = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => appManagementService.uninstallApp({ id }),
  });
};

export const useApproveApp = () => {
  return useMutation({
    mutationFn: ({ appId, isApprove }: RequestApproveApp) =>
      appManagementService.setApproveState({ appId, isApprove }),
  });
};

export const useSetLiveApp = () => {
  return useMutation({
    mutationFn: ({ appId, isAlive }: RequestLiveApp) =>
      appManagementService.setLiveState({ appId, isAlive }),
  });
};

export const useGenerateAppCredentials = () => {
  return useMutation({
    mutationFn: ({ appId }: { appId: string }) =>
      appManagementService.generateAppCredentials(appId),
  });
};

export const useCheckCredentials = () => {
  return useMutation({
    mutationFn: (body: RequestCheckAppCredential) => appManagementService.checkAppCredential(body),
  });
};

export const useRequestApproval = () => {
  return useMutation({
    mutationFn: (body: RequestApproval) => appManagementService.requestApproval(body),
  });
};

export const useCreateApproval = () => {
  return useMutation({
    mutationFn: (id: string) => appManagementService.requestCreate(id),
  });
};

export const useApprovalAll = () => {
  return useMutation({
    mutationFn: (body: { id: string; isAccess: boolean }) => appManagementService.approvalAll(body),
  });
};

export const useDeleteAppIntegration = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => appManagementService.deleteAppIntegration(id),
  });
};
