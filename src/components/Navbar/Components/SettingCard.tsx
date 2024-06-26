import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import BaseUrl from 'consts/baseUrl';
import { useAuth } from 'providers/AuthenticationProvider';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingCard = ({ handleClose }: { handleClose: () => void }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const menuSetting = [
    {
      label: 'Account Settings',
      icon: <CommonIcons.SettingsIcon />,
      onClick: () => {
        navigate(BaseUrl.AccountSetting);
        handleClose();
      },
    },
    {
      label: 'Platform Settings',
      icon: <CommonIcons.SettingsIcon />,
      onClick: () => {},
    },
    {
      label: 'Logout',
      icon: <CommonIcons.LogoutIcon sx={{ width: 20, height: 20 }} />,
      onClick: () => auth.logout(),
    },
  ];
  return (
    <CommonStyles.Box>
      {menuSetting.map((item) => {
        return (
          <CommonStyles.Box
            key={item.label}
            sx={{
              display: 'flex',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#ccc',
              },
            }}
            onClick={item.onClick}
          >
            <CommonStyles.Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 1,
              }}
            >
              {item.icon}
            </CommonStyles.Box>
            <CommonStyles.Typography>{item.label}</CommonStyles.Typography>
          </CommonStyles.Box>
        );
      })}
    </CommonStyles.Box>
  );
};

export default SettingCard;
