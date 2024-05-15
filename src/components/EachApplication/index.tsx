import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

interface EachApplicationProps {
  application: {
    label: string | React.ReactNode;
    href: string;
    idApp?: string;
  };
}

const EachApplication = ({ application }: EachApplicationProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <Link to={BaseUrl.Launcher.AppWithdDetail(application.href, application.idApp)}>
      <CommonStyles.Box
        className='each-application'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.825rem',
          '& .each-application__overlay': {
            opacity: 0,
          },
          '&:hover': {
            cursor: 'pointer',
            '.each-application__overlay': {
              opacity: 1,
            },
          },
        }}
      >
        <CommonStyles.Box
          className='each-application__logo'
          sx={{
            width: 100,
            height: 100,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 2,
            boxShadow: 3,

            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CommonStyles.Box
            className='each-application__overlay'
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              position: 'absolute',
              width: '100%',
              height: '100%',
              transition: '.3s',
            }}
          />
        </CommonStyles.Box>

        <CommonStyles.Typography fontWeight={600} fontSize='1.1rem'>
          {application.label}
        </CommonStyles.Typography>
      </CommonStyles.Box>
    </Link>
  );
};

export default EachApplication;
