import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';
import React from 'react';

const ManageYourApps = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:ManageYourApps'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <HeadWithSearching title='Manage Your Apps' />

      <ListApp isYourApp />
    </CommonStyles.Box>
  );
};

export default ManageYourApps;
