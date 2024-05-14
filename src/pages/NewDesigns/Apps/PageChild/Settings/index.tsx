import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Field, Form, Formik } from 'formik';
import HeadWithSearching from 'components/HeadWithSearching';
import TextField from 'components/CustomFields/TextField';
import UploadField from 'components/CommonStyles/UploadField';

const Settings = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Settings'
      sx={{
        '& > form': {
          mt: 3,
        },
      }}
    >
      <HeadWithSearching title='Settings' />

      <Formik initialValues={{ companyName: '', image: '' }} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <CommonStyles.Box sx={{ display: 'flex', gap: 4 }}>
                <Field
                  component={TextField}
                  name='companyName'
                  placeholder='Company Name'
                  label='Organisation Name'
                  sxContainer={{ flexGrow: 1 }}
                  fullWidth
                />

                <UploadField
                  name='image'
                  placeholder='Upload here...'
                  label='Logo Upload'
                  sxContainer={{ flexGrow: 1 }}
                  fullWidth
                />
                {/* <Field
                  component={TextField}
                  name='image'
                  placeholder='Upload here...'
                  label='Logo Upload'
                  sxContainer={{ flexGrow: 1 }}
                  fullWidth
                /> */}
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default React.memo(Settings);
