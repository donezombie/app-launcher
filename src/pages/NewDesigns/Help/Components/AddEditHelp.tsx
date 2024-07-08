import ButtonBack from 'components/ButtonBack';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import UploadField from 'components/CommonStyles/UploadField';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import { StaticPageType } from 'consts/enum';
import { FastField, Form, Formik } from 'formik';
import { handleUpload } from 'helpers';
import { showError, showSuccess } from 'helpers/toast';
import { useCreateHelp, useGetHelpDetail, useUpdateHelp } from 'hooks/staticPage/useStaticPageHook';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateStaticPage } from 'services/staticPageServices';
import * as Yup from 'yup';

const validateCreateApp = Yup.object().shape({
  title: Yup.string().required('Title is required field!'),
  icon: Yup.string().required('Icon is required field!'),
  body: Yup.string().required('Body Background is required field!'),
  // thumbUrl: Yup.string().required('Thumb Url Header is required field!'),
  // url: Yup.string().required('Url Header is required field!'),
  // description: Yup.string().required('Description Header is required field!'),
  category: Yup.string().required('Category Header is required field!'),
});

const AddEditHelp = () => {
  //! State
  const { id } = useParams();
  const isEdit = !!id;

  const { data: resDetailHelp, isLoading, refetch } = useGetHelpDetail(id || '');
  const helpDetail = useMemo(() => resDetailHelp?.data?.data, [isLoading]);

  const { mutateAsync: createHelp } = useCreateHelp();
  const { mutateAsync: updateHelp } = useUpdateHelp();
  const navigate = useNavigate();

  // //! Function
  const initialValues: CreateStaticPage = {
    title: helpDetail?.title ? helpDetail?.title : '',
    icon: helpDetail?.icon ? helpDetail?.icon : '',
    body: helpDetail?.body ? helpDetail?.body : '',
    thumbUrl: helpDetail?.thumbUrl ? helpDetail?.thumbUrl : '',
    url: helpDetail?.url ? helpDetail?.url : '',
    description: helpDetail?.description ? helpDetail?.description : '',
    category: helpDetail?.category ? helpDetail?.category : '',
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
              const body = {
                ...values,
                type: StaticPageType.HELP,
              };
              const res = isEdit
                ? await updateHelp({ id: String(id), body: values })
                : await createHelp(body);
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
                <HeadWithSearching title='Create Static Page' />
                <CommonStyles.Box
                  sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1, mb: 1 }}
                >
                  <FastField component={TextField} name='title' label='Title' fullWidth required />
                  <FastField component={TextField} name='body' label='Body' fullWidth required />
                </CommonStyles.Box>
                <CommonStyles.Box
                  sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1, mb: 1 }}
                >
                  <FastField component={TextField} name='thumbUrl' label='Thumb Url' fullWidth />
                  <FastField component={TextField} name='url' label='Url' fullWidth />
                </CommonStyles.Box>

                <FastField
                  component={TextField}
                  name='category'
                  label='Category'
                  fullWidth
                  required
                />
                <CommonStyles.Box
                  sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1, mb: 1 }}
                >
                  <FastField
                    component={TextField}
                    name='description'
                    label='Description'
                    fullWidth
                  />
                  <UploadField
                    name='icon'
                    placeholder='Upload logo...'
                    label='Icon'
                    fullWidth
                    required
                    onChange={(e) => handleUpload('icon', e, setFieldValue)}
                  />
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

export default AddEditHelp;
