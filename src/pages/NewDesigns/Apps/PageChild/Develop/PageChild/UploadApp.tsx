import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import UploadField from 'components/CommonStyles/UploadField';
import SwitchField from 'components/CustomFields/SwitchField';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import { Field, Form, Formik } from 'formik';

const UploadApp = () => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:UploadApp'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <HeadWithSearching
        title='Create'
        renderLeftContent={
          <CommonStyles.Button variant='outlined'>
            <CommonIcons.DownArrowIcon /> Download Documentation
          </CommonStyles.Button>
        }
      />

      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                <Field
                  component={TextField}
                  name='name'
                  placeholder='Name of your app.'
                  label='Name'
                  fullWidth
                  helperText='Helper text'
                />
                <Field
                  component={TextField}
                  name='description'
                  placeholder='Place a description of your app...'
                  label='Description'
                  helperText='Helper text'
                  fullWidth
                />
                <UploadField
                  name='images'
                  placeholder='Click here to upload feature images....'
                  label='Images'
                  helperText='Helper text'
                  fullWidth
                />
                <UploadField
                  name='images'
                  placeholder='Upload your app bundle...'
                  label='App Bundle'
                  helperText='Helper text'
                  fullWidth
                />
              </CommonStyles.Box>

              <CommonStyles.Box sx={{ display: 'flex', gap: 2, mt: 4, alignItems: 'baseline' }}>
                <Field
                  component={SwitchField}
                  name='privateApp'
                  sx={{ transform: 'translateY(3px)' }}
                />
                <CommonStyles.Box>
                  <CommonStyles.Typography variant='body2' sx={{ fontWeight: 600 }}>
                    Private App
                  </CommonStyles.Typography>
                  <CommonStyles.Typography variant='caption' sx={{ color: theme.colors?.grayText }}>
                    If you wish this to be a private app for a specific organisation.
                  </CommonStyles.Typography>
                </CommonStyles.Box>
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default UploadApp;
