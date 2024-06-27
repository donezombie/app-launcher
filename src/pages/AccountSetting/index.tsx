import { useQueryClient } from '@tanstack/react-query';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import SelectField from 'components/CustomFields/SelectField';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import { FastField, Form, Formik } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useGetCompanyList } from 'hooks/company/useCompanyHooks';
import { useUpdateUserInfo } from 'hooks/users/useUsersHooks';
import { useAuth } from 'providers/AuthenticationProvider';
import React, { Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import httpService from 'services/httpService';
import userService, { RequestUpdateUserInfo } from 'services/userService';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phone: Yup.string().required('Phone is required field!'),
  email: Yup.string().required('Email is required field!'),
  firstName: Yup.string().required('First Name Background is required field!'),
  lastName: Yup.string().required('Last Name is required field!'),
});

const AccountSetting = () => {
  //! State
  const { user, setUserData } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { data: resListCompany, isLoading } = useGetCompanyList();
  const navigate = useNavigate();
  const companyOptions =
    useMemo(() => {
      return resListCompany?.data?.data?.items?.map((item) => ({
        key: item.id,
        label: item.name,
        value: item.id,
      }));
    }, [resListCompany]) || [];

  const initialValues: RequestUpdateUserInfo = {
    // password: user ? user.password : '',
    phone: user ? user.phone : '',
    email: user ? user.email : '',
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    companyId: user ? user.companyId : null,
  };
  //! Function

  //! Render
  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              setSubmitting(true);
              const res = await updateUserInfo({ id: String(user?.id), body: values });
              const responseUser = await userService.profile();
              const userData = responseUser?.data?.data;
              httpService.saveUserStorage(userData);
              setUserData(userData);
              showSuccess('Update successfully!');
              navigate('/');
              setSubmitting(false);
            } catch (error) {
              setSubmitting(false);
              showError(error);
            }
          })();
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <CommonStyles.Box>
                <CommonStyles.Box>
                  <HeadWithSearching title='Account' />
                  <CommonStyles.Box
                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 2 }}
                  >
                    <FastField
                      component={TextField}
                      name='firstName'
                      label='First Name'
                      fullWidth
                      required
                    />
                    <FastField
                      component={TextField}
                      name='lastName'
                      label='Last Name'
                      fullWidth
                      required
                    />
                  </CommonStyles.Box>
                  <CommonStyles.Box
                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1 }}
                  >
                    <FastField
                      component={TextField}
                      name='email'
                      label='Email'
                      fullWidth
                      required
                    />
                    <FastField
                      component={TextField}
                      name='phone'
                      label='Phone'
                      fullWidth
                      required
                    />
                  </CommonStyles.Box>
                  <CommonStyles.Box
                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 2 }}
                  >
                    {/* <FastField
                      component={TextField}
                      name='password'
                      label='Password'
                      fullWidth
                      required
                    /> */}
                    <CommonStyles.Box>
                      <CommonStyles.Typography
                        component='p'
                        variant='captionLMedium'
                        sx={{ mb: '12px' }}
                      >
                        Company
                      </CommonStyles.Typography>
                      <FastField
                        name='companyId'
                        component={SelectField}
                        options={companyOptions}
                        fullWidth
                        sx={{ height: '42px' }}
                      />
                    </CommonStyles.Box>
                  </CommonStyles.Box>
                </CommonStyles.Box>
                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <CommonStyles.Button
                    type='submit'
                    loading={isSubmitting}
                    startIcon={<CommonIcons.SaveIcon />}
                  >
                    Save
                  </CommonStyles.Button>
                </CommonStyles.Box>
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default React.memo(AccountSetting);
