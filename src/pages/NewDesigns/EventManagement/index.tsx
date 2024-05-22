import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import eventManagement from 'assets/eventManagement.png';

interface EventManagementProps {}

const EventManagement = (props: EventManagementProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:EventManagement'
      sx={{
        width: '100%',
        height: '550px',
        flexShrink: 0,
        p: 3,
        background: ` url(${eventManagement})`,
        backgroundRepeat: 'no-repeat',
      }}
    ></CommonStyles.Box>
  );
};

export default EventManagement;
