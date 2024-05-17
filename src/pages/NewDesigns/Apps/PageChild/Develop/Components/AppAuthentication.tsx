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
      <HeadWithSearching
        title='Authentication'
        renderLeftContent={
          <CommonStyles.Button variant='outlined'>Generate New Credentials</CommonStyles.Button>
        }
      />
      <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        <FastField
          component={TextField}
          name='loginRedirectUri'
          label='Authentication Client ID'
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <CommonStyles.Button
                variant='text'
                sx={{
                  color: theme.colors?.black,
                  borderLeft: '1px solid',
                  borderColor: theme.colors?.border,
                  px: 3,
                  height: 43,
                  borderRadius: 0,
                }}
              >
                <CommonStyles.Typography variant='body2'>Copy</CommonStyles.Typography>
              </CommonStyles.Button>
            ),
          }}
        />

        <FastField
          component={TextField}
          name='logoutRedirectUri'
          label='Authentication Client Secret'
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <CommonStyles.Button
                variant='text'
                sx={{
                  color: theme.colors?.black,
                  borderLeft: '1px solid',
                  borderColor: theme.colors?.border,
                  px: 3,
                  height: 43,
                  borderRadius: 0,
                }}
              >
                <CommonStyles.Typography variant='body2'>Copy</CommonStyles.Typography>
              </CommonStyles.Button>
            ),
          }}
        />
        <FastField
          component={TextField}
          name='name'
          label='App Client Name'
          required
          autoFocus
          fullWidth
          InputProps={{
            endAdornment: (
              <CommonStyles.Button
                variant='text'
                sx={{
                  color: theme.colors?.black,
                  borderLeft: '1px solid',
                  borderColor: theme.colors?.border,
                  px: 3,
                  height: 43,
                  borderRadius: 0,
                }}
              >
                <CommonStyles.Typography variant='body2'>Copy</CommonStyles.Typography>
              </CommonStyles.Button>
            ),
          }}
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default AppAuthentication;
