import React, { Fragment } from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddOrEditApp from '../../../Dialogs/DialogAddOrEditApp';
import { App, NewApp } from 'interfaces/apps';
import { useApprovalAll, useUninstallApp, useUpdateAppIntegration } from 'hooks/app/useAppHooks';
import { showError, showSuccess } from 'helpers/toast';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';
import DialogAssignUserToApp from 'pages/Apps/Dialogs/DialogAssignUserToApp';
import cachedService from 'services/cachedService';
import { Link } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';
import { Badge } from '@mui/material';
import DialogListRequesting from 'pages/Apps/Dialogs/DialogListRequesting';
import { AccessAppType } from 'consts/enum';
import CellDelete from './CellDelete';
import { isEmpty } from 'lodash';

interface CellActionsProps {
  item: NewApp;
  isReport?: boolean;
}

const CellActions = ({ item, isReport }: CellActionsProps) => {
  //! State
  const {
    open: openEditApp,
    toggle: toggleEditApp,
    shouldRender: shouldRenderEditApp,
  } = useToggleDialog();

  const {
    open: openAssign,
    toggle: toggleAssign,
    shouldRender: shoulRenderAssign,
  } = useToggleDialog();

  const {
    open: openRequesting,
    toggle: toggleRequesting,
    shouldRender: shoulRenderRequesting,
  } = useToggleDialog();

  const {
    open: openDelete,
    toggle: toggleDelete,
    shouldRender: shouldRenderDelete,
  } = useToggleDialog();

  const { mutateAsync: updateApp } = useUpdateAppIntegration();
  const { mutateAsync: approveAll, isLoading: loadingAproveAll } = useApprovalAll();
  const queryClient = useQueryClient();
  cachedService.setValue('app', item);

  //! Function
  const requestingList = item?.accessApp.filter(
    (item) => item.accessType === AccessAppType.REQUEST
  );

  const onClickApproval = async () => {
    try {
      await approveAll({ id: item?.id, isAccess: true });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });
      showSuccess('Successfully');
    } catch (error) {
      showError(error);
    }
  };
  //! Render
  return (
    <Fragment>
      {shouldRenderEditApp && (
        <DialogAddOrEditApp
          isOpen={openEditApp}
          toggle={toggleEditApp}
          item={item}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(true);
                await updateApp({ id: item?.id || '', body: values });
                await queryClient.refetchQueries({
                  queryKey: [queryKeys.getAppList],
                });
                await queryClient.refetchQueries({
                  queryKey: [queryKeys.getAppDetail, item?.id],
                });
                showSuccess(`Update app ${item?.name} successfully!`);
                setSubmitting(false);
              } catch (error) {
                showError(error);
              }
            })();
          }}
        />
      )}

      {shoulRenderAssign && <DialogAssignUserToApp isOpen={openAssign} toggle={toggleAssign} />}

      {shoulRenderRequesting && (
        <DialogListRequesting isOpen={openRequesting} toggle={toggleRequesting} appId={item.id} />
      )}

      {shouldRenderDelete && <CellDelete item={item} isOpen={openDelete} toggle={toggleDelete} />}

      <CommonStyles.Tooltip title='Edit'>
        <Link
          to={
            isReport
              ? BaseUrl.MyReport.DetailWithID(item.id || '')
              : BaseUrl.MyApps.DetailWithID(item.id)
          }
        >
          <CommonStyles.Button isIconButton>
            <CommonIcons.EditIcon />
          </CommonStyles.Button>
        </Link>
      </CommonStyles.Tooltip>

      <CommonStyles.Tooltip title='Aprrove all'>
        <CommonStyles.Button
          disabled={isEmpty(requestingList?.length)}
          loading={loadingAproveAll}
          isIconButton
          onClick={onClickApproval}
        >
          <CommonIcons.CheckedAndAdd />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>

      <CommonStyles.Tooltip title='Requesting App'>
        <CommonStyles.Button isIconButton onClick={toggleRequesting}>
          <Badge badgeContent={requestingList?.length || 0} color='error'>
            <CommonIcons.AssignmentChecked />
          </Badge>
        </CommonStyles.Button>
      </CommonStyles.Tooltip>

      <CommonStyles.Tooltip title='Delete App'>
        <CommonStyles.Button isIconButton onClick={toggleDelete}>
          <CommonIcons.RiDeleteBin7Line />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>
    </Fragment>
  );
};

export default React.memo(CellActions);
