import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import { queryKeys } from 'consts';
import { showError, showSuccess } from 'helpers/toast';
import { useDeleteNews } from 'hooks/news/useNewsHooks';
import { DialogI } from 'interfaces/common';
import { News } from 'interfaces/news';
import { RequestCreateNews } from 'services/newsServices';

interface Props extends DialogI<RequestCreateNews> {
  item?: News;
}

const DialogDeleteNew = (props: Props) => {
  const { isOpen, toggle, item } = props;
  const { mutateAsync: deleteNews } = useDeleteNews();
  const queryClient = useQueryClient();

  const handleDeleteNews = async () => {
    try {
      await deleteNews({ id: item?.id });
      toggle();
      showSuccess('Delete news successfully!');
      queryClient.refetchQueries([queryKeys.getListNew]);
    } catch (error) {
      showError(error);
    }
  };
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
        <CommonStyles.Button onClick={handleDeleteNews}>Delete</CommonStyles.Button>
      </DialogActions>
    </DialogMui>
  );
};

export default DialogDeleteNew;
