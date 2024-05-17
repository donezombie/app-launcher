import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { queryKeys } from 'consts';
import { FastField, Form, Formik } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useCreateNews, useUpdateNew } from 'hooks/news/useNewsHooks';
import { DialogI } from 'interfaces/common';
import { News } from 'interfaces/news';
import { RequestCreateNews } from 'services/newsServices';
import * as Yup from 'yup';

interface Props extends DialogI<RequestCreateNews> {
  item?: News;
}

const validateAddNew = Yup.object().shape({
  title: Yup.string().required('Title is required field!'),
  body: Yup.string().required('Body is required field!'),
});

const DialogAddNews = (props: Props) => {
  //! State
  const { isOpen, toggle, item } = props;
  const { mutateAsync: createNew } = useCreateNews();
  const { mutateAsync: updateNew } = useUpdateNew();
  const queryClient = useQueryClient();

  const initialValues = {
    title: item ? item?.title : '',
    body: item ? item?.body : '',
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
            isEdit ? await updateNew({ id: item?.id, body: values }) : await createNew(values);
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
                  <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
                    Add News
                  </CommonStyles.Typography>
                  <CommonStyles.Box
                    sx={{
                      '& > div': {
                        mb: 2,
                      },
                    }}
                  >
                    <FastField
                      component={TextField}
                      name='title'
                      label='Title'
                      required
                      autoFocus
                      fullWidth
                    />

                    <FastField component={TextField} name='body' label='Body ' required fullWidth />
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

export default DialogAddNews;
