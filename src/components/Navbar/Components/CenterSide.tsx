import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Field, Form, Formik } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { Dialog } from '@mui/material';
import AllApplicationDialog from 'pages/NewDesigns/AllApplication';

const CenterSide = () => {
  //! State
  const [open, setOpen] = React.useState(false);
  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:CenterSide'>
      <Formik initialValues={{ search: '' }} onSubmit={() => setOpen(true)}>
        {({ values }) => {
          return (
            <Form>
              <Field
                component={TextField}
                name='search'
                placeholder='Search for reference...'
                sx={{ minWidth: 500 }}
              />

              <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
                <AllApplicationDialog
                  onClickClose={() => setOpen(false)}
                  textSearch={values.search}
                />
              </Dialog>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default React.memo(CenterSide);
