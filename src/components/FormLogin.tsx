import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import TextField from './CustomFields/TextField';
import CommonIcons from './CommonIcons';
import { SIZE_ICON_DEFAULT } from 'consts';
import { InputAdornment } from '@mui/material';
import TextBetweenLine from './TextBetweenLine';
import { useAuth } from 'providers/AuthenticationProvider';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface FormLoginProps {
  onSubmit: (values: LoginFormValues, helpersFormik: FormikHelpers<LoginFormValues>) => void;
}

const FormLogin = (props: FormLoginProps) => {
  //! State
  const auth = useAuth();
  const { onSubmit } = props;

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:FormLogin'
      sx={{
        minWidth: 600,
        '& > form': {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
      }}
    >
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
        {() => {
          return (
            <Form>
              <CommonStyles.Typography component='h5' variant='h5'>
                Login
              </CommonStyles.Typography>
              <CommonStyles.Typography variant='caption' component='p'>
                Enter your email or Single Sign On to login to your account
              </CommonStyles.Typography>

              <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Field
                  component={TextField}
                  name='email'
                  placeholder='name@company.com'
                  label='Email'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CommonIcons.AtIcon size={SIZE_ICON_DEFAULT} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Field
                  component={TextField}
                  name='password'
                  type='password'
                  placeholder='password'
                  label='Password'
                  fullWidth
                  isShowHidePassword
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CommonIcons.LockIcon size={SIZE_ICON_DEFAULT} />
                      </InputAdornment>
                    ),
                  }}
                />
              </CommonStyles.Box>

              <CommonStyles.Button fullWidth type='submit'>
                Login
                <CommonIcons.RightArrowIcon size={SIZE_ICON_DEFAULT} />
              </CommonStyles.Button>

              <TextBetweenLine text='or continue with' />

              <CommonStyles.Button
                fullWidth
                variant='outlined'
                onClick={() => {
                  auth.loginRedirect();
                }}
              >
                <CommonIcons.LogoWindow11Icon size={SIZE_ICON_DEFAULT} />
                Sign in with Microsoft
              </CommonStyles.Button>

              <CommonStyles.Typography
                className='is-hover'
                isLink
              >{`Can't login?`}</CommonStyles.Typography>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default FormLogin;
