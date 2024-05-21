import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import { FastField } from 'formik';

interface AppAuthenticationProps {}

const AppAuthentication = (props: AppAuthenticationProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:AppAuthentication'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      {/* <HeadWithSearching
        title='Authentication'
        renderLeftContent={
          <CommonStyles.Button variant='outlined'>Generate New Credentials</CommonStyles.Button>
        }
      /> */}
      <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        <FastField
          component={TextField}
          name='name'
          label='Name App'
          required
          autoFocus
          fullWidth
          placeholder='Education report'
        />

        <FastField
          component={TextField}
          name='loginRedirectUri'
          label='Login Redirect URI'
          required
          fullWidth
          placeholder='https://your-domain.com/login/callback'
        />

        <FastField
          component={TextField}
          name='logoutRedirectUri'
          label='Logout Redirect URI'
          required
          fullWidth
          placeholder='https://your-domain.com/logout'
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default AppAuthentication;
