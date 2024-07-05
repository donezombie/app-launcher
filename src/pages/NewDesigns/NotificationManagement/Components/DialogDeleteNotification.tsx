import { DialogActions, DialogTitle } from '@mui/material';
import DialogMui from '@mui/material/Dialog';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import { queryKeys } from 'consts';
import { showError, showSuccess } from 'helpers/toast';
import { useDeleteNotification } from 'hooks/notification/useNotificationHook';
import { DialogI } from 'interfaces/common';
import { Notification } from 'interfaces/notification';
import { RequestCreateNotification } from 'services/notificationService';

interface Props extends DialogI<RequestCreateNotification> {
  item?: Notification;
}

const DialogDeleteNotification = (props: Props) => {
  //! State
  const { isOpen, toggle, onSubmit, item } = props;
  const { mutateAsync: deleteNotification } = useDeleteNotification();
  const queryClient = useQueryClient();

  //! Function
  const handleDeleteNotification = async () => {
    try {
      await deleteNotification({ id: String(item?.id) });
      toggle();
      showSuccess('Delete notification successfully!');
      queryClient.refetchQueries([queryKeys.getListNotification]);
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <DialogMui open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
      <DialogTitle>
        Confirm delete{'  '}
        <CommonStyles.Typography variant='h6Bold'>{item?.title}</CommonStyles.Typography>
      </DialogTitle>

      <DialogActions>
        <CommonStyles.Button variant='text' onClick={toggle}>
          Cancel
        </CommonStyles.Button>
        <CommonStyles.Button onClick={handleDeleteNotification}>Delete</CommonStyles.Button>
      </DialogActions>
    </DialogMui>
  );
};

export default DialogDeleteNotification;
