import ButtonBack from 'components/ButtonBack';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import UploadField from 'components/CommonStyles/UploadField';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import { FastField, Form, Formik } from 'formik';
import { handleUpload } from 'helpers';
import { showError, showSuccess } from 'helpers/toast';
import {
  BodyCreateCompany,
  useCreateCompany,
  useGetCompanyDetail,
  useUpdateCompany,
} from 'hooks/company/useCompanyHooks';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const validateCreateApp = Yup.object().shape({
  name: Yup.string().required('Name is required field!'),
  logo: Yup.string().required('Logo is required field!'),
  colorBackground: Yup.string().required('Color Background is required field!'),
  colorHeader: Yup.string().required('Color Header is required field!'),
  colorText: Yup.string().required('Color Text is required field!'),
});

const AddEditCompany = () => {
  //! State
  const { id } = useParams();
  const isEdit = !!id;

  const { data: resDetailCompany, isLoading, refetch } = useGetCompanyDetail(id || '');
  const appDetail = useMemo(() => resDetailCompany?.data?.data, [isLoading]);

  const { mutateAsync: createCompany } = useCreateCompany();
  const { mutateAsync: updateCompany } = useUpdateCompany();
  const navigate = useNavigate();

  // //! Function
  const initialValues: BodyCreateCompany = {
    name: appDetail ? appDetail?.name : '',
    address: appDetail ? appDetail?.address : '',
    hotline: appDetail ? appDetail?.hotline : null,
    website: appDetail ? appDetail?.website : '',
    description: appDetail ? appDetail?.description : '',
    logo: appDetail ? appDetail?.logo : '',
    colorBackground: appDetail ? appDetail?.colorBackground : '',
    colorHeader: appDetail ? appDetail?.colorHeader : '',
    colorText: appDetail ? appDetail?.colorText : '',
  };

  //! Render

  return (
    <CommonStyles.Box
      className='component:UploadReport'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validateOnBlur
        validateOnMount
        validationSchema={validateCreateApp}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              const res = isEdit
                ? await updateCompany({ id: String(id), body: values })
                : await createCompany(values);
              refetch();
              navigate(-1);

              setSubmitting(true);
              showSuccess(isEdit ? 'Edit successfully!' : 'Create successfully!');
              setSubmitting(false);
            } catch (error) {
              setSubmitting(false);
              showError(error);
            }
          })();
        }}
      >
        {({ isSubmitting, handleSubmit, setFieldValue }) => {
          return (
            <Form>
              <CommonStyles.Box>
                <ButtonBack />
                <HeadWithSearching title='Create Company' />
                <CommonStyles.Box
                  sx={{ p: 2, border: '1px solid #ccc', borderRadius: '10px', mt: 2 }}
                >
                  <CommonStyles.Typography mb={2} fontWeight={'bold'} fontSize={'1.5rem'}>
                    Company infomation
                  </CommonStyles.Typography>
                  <CommonStyles.Box
                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}
                  >
                    <FastField
                      component={TextField}
                      name='name'
                      label='Name'
                      fullWidth
                      autoFocus
                      required
                    />
                    <FastField component={TextField} name='address' label='Address' fullWidth />
                  </CommonStyles.Box>
                  <CommonStyles.Box
                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1, mb: 1 }}
                  >
                    <FastField component={TextField} name='hotline' label='Hotline' fullWidth />
                    <FastField component={TextField} name='website' label='Webiste' fullWidth />
                  </CommonStyles.Box>
                  <FastField
                    component={TextField}
                    name='description'
                    label='Description'
                    fullWidth
                  />
                </CommonStyles.Box>
                <CommonStyles.Box
                  sx={{ p: 2, border: '1px solid #ccc', borderRadius: '10px', mt: 2 }}
                >
                  <CommonStyles.Typography mb={2} fontWeight={'bold'} fontSize={'1.5rem'}>
                    Theme Config
                  </CommonStyles.Typography>
                  <CommonStyles.Box
                    sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4, mt: 1 }}
                  >
                    <UploadField
                      name='logo'
                      placeholder='Upload logo...'
                      label='Logo'
                      fullWidth
                      required
                      onChange={(e) => handleUpload('logo', e, setFieldValue)}
                    />

                    <FastField
                      component={TextField}
                      name='colorBackground'
                      label='Color Background'
                      fullWidth
                      type='color'
                      required
                    />
                    <FastField
                      component={TextField}
                      name='colorHeader'
                      label='Color Header'
                      fullWidth
                      type='color'
                      required
                    />
                    <FastField
                      component={TextField}
                      name='colorText'
                      label='Color Text'
                      fullWidth
                      type='color'
                      required
                    />
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </CommonStyles.Box>
              <CommonStyles.Box
                sx={{ display: 'flex', width: '100%', justifyContent: 'end', mt: 2 }}
              >
                <CommonStyles.Button
                  loading={isSubmitting}
                  type='submit'
                  onClick={() => handleSubmit()}
                  startIcon={<CommonIcons.SaveIcon />}
                >
                  Save
                </CommonStyles.Button>
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default AddEditCompany;
