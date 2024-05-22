import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import { FastField, Field, Form, Formik } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { useGetAppIntegrationDetail, useUpdateAppIntegration } from 'hooks/app/useAppHooks';
import { useParams } from 'react-router-dom';
import { useGetListCategory } from 'hooks/category/useGetListCategory';
import { useCallback } from 'react';
import { ICategory } from 'interfaces/category';
import SelectField from 'components/CustomFields/SelectField';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { showError, showSuccess } from 'helpers/toast';
import { useDeleteAppIDCategory, useUpdateAppIDCategory } from 'hooks/category/useCategoryHooks';
import { AppIntegration } from 'interfaces/apps';

export const validateEditApp = Yup.object().shape({
  name: Yup.string().required('Name is required field!'),
  developerName: Yup.string().required('Create By is required field!'),
});

const AppInformation = () => {
  //! State
  const { id } = useParams();
  const { data: resDetailApp } = useGetAppIntegrationDetail(id || '');
  const { category } = useGetListCategory();
  const { mutateAsync: updateApp } = useUpdateAppIntegration();
  const { mutateAsync: updateAppIDCategory } = useUpdateAppIDCategory();
  const { mutateAsync: deleteAppIDCategory } = useDeleteAppIDCategory();

  const queryClient = useQueryClient();

  const itemFound = resDetailApp?.data as AppIntegration;

  //! Function
  const initialValues = {
    scopes: itemFound?.scopes || '',
    name: itemFound?.name || '',
    developerName: itemFound?.developerName || '',
  };

  const categoryOptions = useCallback(() => {
    return category.map((el: ICategory) => {
      return {
        label: el.name,
        value: el.id,
      };
    });
  }, [category]);

  //! Render
  return (
    <CommonStyles.Box
      className='component:AppInformation'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <HeadWithSearching title='Application Information' />

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validateEditApp}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              setSubmitting(true);
              await updateApp({
                id: (id as string) || '',
                body: {
                  ...itemFound,
                  name: values.name,
                  scopes: values.scopes,
                },
              });
              await updateAppIDCategory({ id: values.scopes, appID: id as string });
              if (itemFound?.scopes) {
                await deleteAppIDCategory({ id: itemFound.scopes || '', appID: id as string });
              }
              await queryClient.refetchQueries({
                queryKey: [queryKeys.getAppList],
              });
              await queryClient.refetchQueries({
                queryKey: [queryKeys.getAppDetail, id],
              });
              showSuccess(`Update app ${itemFound?.name} successfully!`);
              setSubmitting(false);
            } catch (error) {
              showError(error);
            }
          })();
        }}
      >
        {({ handleSubmit, isSubmitting }) => {
          return (
            <Form>
              <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                <FastField
                  component={TextField}
                  name='name'
                  placeholder='Application Name'
                  label='App Name'
                  fullWidth
                />

                <FastField
                  component={TextField}
                  name='developerName'
                  placeholder='DeveloperName'
                  label='Created by'
                  fullWidth
                />

                <CommonStyles.Box>
                  <CommonStyles.Typography component='p' variant='captionLMedium' sx={{ mb: 1.5 }}>
                    Category
                  </CommonStyles.Typography>
                  <Field
                    name='scopes'
                    component={SelectField}
                    options={categoryOptions()}
                    fullWidth
                    sx={{ height: '42px' }}
                  />
                </CommonStyles.Box>
              </CommonStyles.Box>
              <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CommonStyles.Button
                  loading={isSubmitting}
                  type='submit'
                  onClick={() => handleSubmit()}
                >
                  Submit
                </CommonStyles.Button>
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default AppInformation;
