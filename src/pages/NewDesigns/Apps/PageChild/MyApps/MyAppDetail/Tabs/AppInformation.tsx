import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import { Field, Form, Formik } from 'formik';
import TextField from 'components/CustomFields/TextField';

const AppInformation = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:AppInformation'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <HeadWithSearching title='Application Information' />

      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                <Field
                  component={TextField}
                  name='appName'
                  placeholder='Application Name'
                  label='App Name'
                  fullWidth
                />

                <Field
                  component={TextField}
                  name='createdBy'
                  placeholder='DeveloperName'
                  label='Created by'
                  fullWidth
                />
              </CommonStyles.Box>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default AppInformation;
