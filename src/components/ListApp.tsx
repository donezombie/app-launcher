import React from 'react';
import CommonStyles from 'components/CommonStyles';
import EachApp from './EachApp';
import { App, NewApp } from 'interfaces/apps';
import { useTheme } from '@mui/material';

interface ListAppProps {
  isMyApps?: boolean;
  isYourApp?: boolean;
  apps?: NewApp[];
  isReport?: boolean;
}

const ListApp = ({
  isMyApps = false,
  isYourApp = false,
  apps = [],
  isReport = false,
}: ListAppProps) => {
  //! State
  const theme = useTheme();
  //! Function
  //! Render
  if (apps.length <= 0) {
    return (
      <CommonStyles.Typography variant='captionLMedium' sx={{ color: theme.colors?.text2 }}>
        No Application found!
      </CommonStyles.Typography>
    );
  }

  return (
    <CommonStyles.Box
      className='component:ListApp'
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 3,
        [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr' },
      }}
    >
      {apps.map((el, ind) => {
        return (
          <EachApp
            key={el.id}
            item={el}
            isMyApps={isMyApps}
            isYourApp={isYourApp}
            ind={ind}
            isReport={isReport}
          />
        );
      })}
    </CommonStyles.Box>
  );
};

export default React.memo(ListApp);
