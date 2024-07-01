import React from 'react';
import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';
import ButtonBack from 'components/ButtonBack';
import BaseUrl from 'consts/baseUrl';

const Quote = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Quote'
      sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
    >
      <ButtonBack href={BaseUrl.Marketplace.Index} />

      <HeadWithSearching title='Quote' onSubmitSearch={() => {}} placeholder='Search Quote...' />

      <ListApp isReport />
    </CommonStyles.Box>
  );
};

export default React.memo(Quote);
