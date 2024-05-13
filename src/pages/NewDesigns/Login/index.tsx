import React, { useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import FormLogin from 'components/FormLogin';
import FormVerify from 'components/FormVerify';
import { useAuth } from 'providers/AuthenticationProvider';

const Login = () => {
  //! State
  const theme = useTheme();
  const auth = useAuth();
  const [needVerify, setNeedVerify] = useState(false);

  //! Function

  //! Render
  if (auth.isLogged) {
    return <Navigate to={auth.initialPathName} replace />;
  }

  return (
    <CommonStyles.Box className='component:Login' sx={{ display: 'flex', height: '100vh' }}>
      <CommonStyles.Box
        className='login__left'
        sx={{
          width: '30%',
          height: '100%',
          backgroundColor: theme.palette.primary.main,
          flexShrink: 0,
        }}
      />

      <CommonStyles.Box
        className='login__right'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          p: 4,
        }}
      >
        <CommonStyles.Box
          className='login__right__head'
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'flex-end',
            visibility: needVerify ? 'hidden' : 'visible',
          }}
        >
          <CommonStyles.Typography variant='caption'>{`Don't have account?`}</CommonStyles.Typography>
          <CommonStyles.Button variant='secondary'>Sign up</CommonStyles.Button>
        </CommonStyles.Box>

        <CommonStyles.Box
          className='login__right__form'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {needVerify ? (
            <FormVerify onSubmit={() => {}} />
          ) : (
            <FormLogin
              onSubmit={() => {
                setNeedVerify(true);
              }}
            />
          )}
        </CommonStyles.Box>

        <CommonStyles.Box
          className='login__right__footer'
          sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <Link to='/privacy'>
            <CommonStyles.Typography className='is-hover' isLink>
              Privacy Policy
            </CommonStyles.Typography>
          </Link>

          <Link to='/user-notice'>
            <CommonStyles.Typography className='is-hover' isLink>
              User Notice
            </CommonStyles.Typography>
          </Link>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Login);
