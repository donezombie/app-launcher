import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { queryKeys } from 'consts';
import { FastField, Form, Formik } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useCreateCategory, useUpdateCategory } from 'hooks/category/useCategoryHooks';
import { ICategory } from 'interfaces/category';
import { DialogI } from 'interfaces/common';
import { RequestCreateNews } from 'services/newsServices';
import * as Yup from 'yup';

interface Props extends DialogI<RequestCreateNews> {
  item?: ICategory;
}

const validateAddNew = Yup.object().shape({
  name: Yup.string().required('Category Name is required field!'),
});

const DialogAddCategory = (props: Props) => {
  //! State
  const { isOpen, toggle, item } = props;
  const { mutateAsync: createNew } = useCreateCategory();
  const { mutateAsync: updateNew } = useUpdateCategory();
  const queryClient = useQueryClient();

  const initialValues = {
    name: item ? item?.name : '',
  };

  const isEdit = !!item?.id;

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateAddNew}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          try {
            setSubmitting(true);
            isEdit ? await updateNew({ id: item?.id, name: values.name }) : createNew(values.name);
            toggle();
            showSuccess(isEdit ? 'Edit news successfully!' : 'Add news successfully!');
            setSubmitting(false);
            queryClient.refetchQueries([queryKeys.getListNew]);
          } catch (error) {
            showError(error);
            setSubmitting(false);
          }
        })();
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <DialogMui scroll='paper' open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
            <DialogContent>
              <Form>
                <CommonStyles.Box>
                  <CommonStyles.Typography variant='h6Bold'>New Category</CommonStyles.Typography>
                  <CommonStyles.Box
                    sx={{
                      '& > div': {
                        mt: 2,
                      },
                    }}
                  >
                    <FastField
                      component={TextField}
                      name='name'
                      label='Category Name'
                      required
                      autoFocus
                      fullWidth
                    />
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </Form>
            </DialogContent>
            <DialogActions>
              <CommonStyles.Button variant='text' onClick={toggle}>
                Cancel
              </CommonStyles.Button>
              <CommonStyles.Button
                loading={isSubmitting}
                type='submit'
                onClick={() => handleSubmit()}
              >
                Submit
              </CommonStyles.Button>
            </DialogActions>
          </DialogMui>
        );
      }}
    </Formik>
  );
};

export default DialogAddCategory;
