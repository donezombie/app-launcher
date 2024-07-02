import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik } from 'formik';
import Searching from './Searching';

interface HeadWithSearchingProps {
  title?: React.ReactNode;
  onSubmitSearch?: ({ search }: { search: string }) => void;
  placeholder?: string;
  renderLeftContent?: React.ReactNode;
}

const HeadWithSearching = (props: HeadWithSearchingProps) => {
  //! State
  const { title, onSubmitSearch, placeholder = 'Search...', renderLeftContent } = props;

  //! Function

  //! Render
  return (
    <Formik initialValues={{ search: '' }} onSubmit={onSubmitSearch || function () {}}>
      {() => {
        return (
          <CommonStyles.Box
            className='component:HeadWithSearching'
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <CommonStyles.Typography variant='h6Bold'>{title}</CommonStyles.Typography>

            {onSubmitSearch && (
              <Form>
                <Searching nameField='search' placeholder={placeholder} />
              </Form>
            )}

            {renderLeftContent}
          </CommonStyles.Box>
        );
      }}
    </Formik>
  );
};

export default React.memo(HeadWithSearching);
