import React, { useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import FormLogin from 'components/FormLogin';
import FormVerify from 'components/FormVerify';
import { useAuth } from 'providers/AuthenticationProvider';
import logoWithText from 'assets/logo-with-text.svg';
import imageLogin from 'assets/image-login.png';

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
          width: 380,
          height: '100%',
          flexShrink: 0,
          p: 3,
          background: `linear-gradient(to bottom, rgba(20, 123, 119, 0.8), rgba(20, 123, 119, 0.8)), url(${imageLogin}) lightgray 50% / cover no-repeat`,
        }}
      >
        <CommonStyles.Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <img src={logoWithText} alt='logoWithText' style={{ height: 30, width: 140 }} />

          <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <CommonStyles.Typography variant='captionLBold' sx={{ color: theme.colors?.white }}>
              “We thrive on creating the property transaction clearer, faster and easier every day.”
            </CommonStyles.Typography>

            <CommonStyles.Typography variant='captionLRegular' sx={{ color: theme.colors?.white }}>
              tmgroup Product Team
            </CommonStyles.Typography>
          </CommonStyles.Box>
        </CommonStyles.Box>
      </CommonStyles.Box>

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

export default Login;
