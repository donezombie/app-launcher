import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import { queryKeys } from 'consts';
import { showError, showSuccess } from 'helpers/toast';
import { useDeleteAppIntegration } from 'hooks/app/useAppHooks';
import { App, NewApp } from 'interfaces/apps';
import { DialogI } from 'interfaces/common';
import { RequestCreateApp } from 'services/appManagementService';

interface Props extends DialogI<RequestCreateApp> {
  item?: App | NewApp;
}

const CellDelete = (props: Props) => {
  //! State
  const { isOpen, item, toggle } = props;
  const queryClient = useQueryClient();
  const { mutateAsync: deleteApp } = useDeleteAppIntegration();

  //! Function
  const handleDeleteApp = async () => {
    if (item?.id) {
      try {
        await deleteApp({ id: item?.id });
        toggle();
        showSuccess('Delete app successfully!');
        queryClient.refetchQueries([queryKeys.getAppList]);
      } catch (error) {
        showError(error);
      }
    }
  };

  //! Render
  return (
    <DialogMui open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
      <DialogTitle>
        Confirm delete{'  '}
        <CommonStyles.Typography variant='h6Bold'>{item?.name}</CommonStyles.Typography>
      </DialogTitle>

      <DialogActions>
        <CommonStyles.Button variant='text' onClick={toggle}>
          Cancel
        </CommonStyles.Button>
        <CommonStyles.Button onClick={handleDeleteApp}>Delete</CommonStyles.Button>
      </DialogActions>
    </DialogMui>
  );
};

export default CellDelete;
