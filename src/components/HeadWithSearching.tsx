import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik } from 'formik';
import Searching from './Searching';

interface HeadWithSearchingProps {
  title: React.ReactNode;
  onSubmitSearch: () => void;
  placeholder?: string;
}

const HeadWithSearching = (props: HeadWithSearchingProps) => {
  //! State
  const { title, onSubmitSearch, placeholder = 'Search...' } = props;

  //! Function

  //! Render
  return (
    <Formik initialValues={{ search: '' }} onSubmit={onSubmitSearch}>
      {() => {
        return (
          <CommonStyles.Box
            className='component:HeadWithSearching'
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <CommonStyles.Typography variant='h5'>{title}</CommonStyles.Typography>

            <Form>
              <Searching nameField='search' placeholder={placeholder} />
            </Form>
          </CommonStyles.Box>
        );
      }}
    </Formik>
  );
};

export default React.memo(HeadWithSearching);
