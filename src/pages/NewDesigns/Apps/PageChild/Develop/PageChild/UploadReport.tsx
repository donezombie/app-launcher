import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import SelectField from 'components/CustomFields/SelectField';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import BaseUrl from 'consts/baseUrl';
import { AppType, CategoryType } from 'consts/enum';
import { FastField, Form, Formik, FormikProps } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import {
  useCreateAppIntegration,
  useGetAppIntegrationDetail,
  useUpdateAppIntegration,
} from 'hooks/app/useAppHooks';
import { useGetCategoryList } from 'hooks/category/useGetListCategory';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Category } from 'interfaces/category';
import { isEmpty, isNull } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const validateCreateApp = Yup.object().shape({
  name: Yup.string().required('Name is required field!'),
  launchUri: Yup.string().required('Launch Uri is required field!'),
  //   type: Yup.string()
  //     .required('Type is required field!')
  //     .test('type', 'Invalid Type', function (value) {
  //       if (value && !Object.values(ReportType).includes(value as ReportType)) return false;
  //       return true;
  //     }),
  categoryId: Yup.number()
    .typeError('Category is required field!')
    .required('Category is required field!'),
});
interface Iprops {
  isEdit: boolean;
}
const UploadReport = (props: Iprops) => {
  const { isEdit = false } = props;

  //! State
  const { id } = useParams();
  const { data: resDetailApp, isLoading } = useGetAppIntegrationDetail(id || '');
  const appDetail = useMemo(() => resDetailApp?.data?.data, [isLoading]);

  const { mutateAsync: createApp } = useCreateAppIntegration();
  const { mutateAsync: updateAppIntegration } = useUpdateAppIntegration();
  // const { mutateAsync: updateAppIDCategory } = useUpdateAppIDCategory();
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<any>>(null);
  const { filters } = useFiltersHandler({ categoryType: CategoryType.REPORT });
  const { data: category, isLoading: loadingCategory } = useGetCategoryList(filters);

  const categoryOptions = useCallback(() => {
    return category?.data?.data?.items?.map((el: Category) => {
      return {
        key: el.id,
        label: el.name,
        value: el.id,
      };
    });
  }, [category, loadingCategory]);
  // //! Function
  const initialValues = {
    name: appDetail ? appDetail.name : '',
    launchUri: appDetail ? appDetail.launchUri : '',
    description: appDetail ? appDetail.description : '',
    categoryId: appDetail ? appDetail.categoryId : null,
  };

  //! Render
  if (loadingCategory) {
    return <CommonStyles.Loading />;
  }

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
        innerRef={formikRef}
        validationSchema={validateCreateApp}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              const body = {
                ...values,
                appType: AppType.REPORT,
              };
              isEdit
                ? await updateAppIntegration({ id: String(id), body: body })
                : await createApp(body);

              setSubmitting(true);
              showSuccess(isEdit ? 'Edit successfully!' : 'Create successfully!');
              navigate(BaseUrl.MyReport.Index);
              setSubmitting(false);
            } catch (error) {
              setSubmitting(false);
              showError(error);
            }
          })();
        }}
      >
        {({ isSubmitting, handleSubmit, values }) => {
          return (
            <Form>
              <CommonStyles.Box>
                <HeadWithSearching title='Upload Report' />
                <CommonStyles.Box
                  sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 2 }}
                >
                  <FastField
                    component={TextField}
                    name='name'
                    label='Name'
                    fullWidth
                    autoFocus
                    required
                  />
                  <FastField
                    component={TextField}
                    name='launchUri'
                    label='Launch Uri'
                    fullWidth
                    placeholder='https://your-domain.com'
                    required
                  />
                </CommonStyles.Box>
                <CommonStyles.Box
                  sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1 }}
                >
                  <FastField
                    component={TextField}
                    name='description'
                    label='Description'
                    fullWidth
                  />
                  <CommonStyles.Box>
                    <CommonStyles.Typography
                      component='p'
                      variant='captionLMedium'
                      sx={{ mb: '12px' }}
                    >
                      Category <span style={{ color: 'red' }}>*</span>
                    </CommonStyles.Typography>
                    <FastField
                      name='categoryId'
                      component={SelectField}
                      options={categoryOptions() || []}
                      fullWidth
                      sx={{ height: '42px' }}
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
                  disabled={
                    isEmpty(values?.launchUri) ||
                    isEmpty(values?.name) ||
                    isNull(values?.categoryId)
                  }
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

export default UploadReport;
