import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import { Field, Form, Formik } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { useTheme } from '@mui/material';

const AppAuthentication = () => {
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

      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                <Field
                  component={TextField}
                  name='clientID'
                  placeholder='dwaej3r8y92yr793yf9hyfqh80'
                  label='Authentication Client ID'
                  fullWidth
                  helperText='Helper text'
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

                <Field
                  component={TextField}
                  name='clientSecret'
                  placeholder='dwaej3r8y92yr793yf9hyfqh80'
                  label='Authentication Client Secret'
                  fullWidth
                  helperText='Helper text'
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

                <Field
                  component={TextField}
                  name='clientName'
                  placeholder='dwaej3r8y92yr793yf9hyfqh80'
                  label='App Client Name'
                  fullWidth
                  helperText='Helper text'
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
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default AppAuthentication;
