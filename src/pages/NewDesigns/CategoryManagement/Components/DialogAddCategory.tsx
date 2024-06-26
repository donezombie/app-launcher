import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import SelectField from 'components/CustomFields/SelectField';
import TextField from 'components/CustomFields/TextField';
import { queryKeys } from 'consts';
import { AppType, CategoryType } from 'consts/enum';
import { FastField, Form, Formik } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useCreateCategory, useUpdateCategory } from 'hooks/category/useCategoryHooks';
import { Category } from 'interfaces/category';
import { DialogI } from 'interfaces/common';
import { useCallback } from 'react';
import { RequestCreateNews } from 'services/newsServices';
import * as Yup from 'yup';

interface Props extends DialogI<RequestCreateNews> {
  item?: Category;
}

const validateAddNew = Yup.object().shape({
  name: Yup.string().required('Category Name is required field!'),
  categoryType: Yup.string().required('Category Type is required field!'),
});

const DialogAddCategory = (props: Props) => {
  //! State
  const { isOpen, toggle, item } = props;
  const { mutateAsync: createNew } = useCreateCategory();
  const { mutateAsync: updateNew } = useUpdateCategory();
  const queryClient = useQueryClient();

  const initialValues = {
    name: item ? item?.name : '',
    categoryType: item ? item?.categoryType : CategoryType.DEFAULT,
  };

  const categoryTypes = Object.values(CategoryType).map((el) => {
    return {
      label: el,
      value: el,
    };
  });

  const isEdit = !!item?.id;

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateAddNew}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          try {
            const body = {
              name: values.name || '',
              categoryType: values.categoryType || '',
            };
            setSubmitting(true);
            isEdit ? await updateNew({ id: String(item?.id), body }) : await createNew(body);
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
                  <CommonStyles.Box sx={{ display: 'flex' }}>
                    <CommonStyles.Box sx={{ flex: 1, marginRight: '1rem' }}>
                      <FastField
                        component={TextField}
                        name='name'
                        label='Category Name'
                        required
                        autoFocus
                        fullWidth
                      />
                    </CommonStyles.Box>
                    <CommonStyles.Box
                      sx={{
                        flex: 1,
                        div: {
                          width: '100%',
                        },
                      }}
                    >
                      <CommonStyles.Typography
                        component='p'
                        variant='captionLMedium'
                        sx={{ mb: 1.5 }}
                      >
                        Type
                      </CommonStyles.Typography>
                      <FastField
                        component={SelectField}
                        name='categoryType'
                        options={categoryTypes}
                        sx={{ height: '42px' }}
                      />
                    </CommonStyles.Box>
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
