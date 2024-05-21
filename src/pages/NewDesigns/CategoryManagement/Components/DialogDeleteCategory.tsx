import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import { queryKeys } from 'consts';
import { showError, showSuccess } from 'helpers/toast';
import { useDeleteCategory } from 'hooks/category/useCategoryHooks';
import { ICategory } from 'interfaces/category';
import { DialogI } from 'interfaces/common';
import { RequestCreateNews } from 'services/newsServices';

interface Props extends DialogI<RequestCreateNews> {
  item?: ICategory;
}

const DialogDeleteCategory = (props: Props) => {
  const { isOpen, toggle, item } = props;
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const queryClient = useQueryClient();

  const handleDeleteNews = async () => {
    try {
      await deleteCategory({ id: item?.id || '' });
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
        Are you sure to delete category{'  '}
        <CommonStyles.Typography variant='h6Bold'>{item?.name}</CommonStyles.Typography>?
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

export default DialogDeleteCategory;
