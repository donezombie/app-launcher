import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import BaseUrl from 'consts/baseUrl';
import { useAuth } from 'providers/AuthenticationProvider';
import { useSettingsTheme } from 'providers/SettingsThemeProvider';
import { useNavigate } from 'react-router-dom';

const SettingCard = ({ handleClose }: { handleClose: () => void }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { toggleTheme } = useSettingsTheme();
  const theme = useTheme();

  const menuSetting = [
    {
      id: 1,
      label: 'Account Settings',
      icon: <CommonIcons.SettingsIcon />,
      onClick: () => {
        navigate(BaseUrl.AccountSetting);
        handleClose();
      },
    },
    {
      id: 2,
      label: 'Platform Settings',
      icon: <CommonIcons.SettingsIcon />,
      onClick: () => {},
    },
    // {
    //   id: 3,
    //   label: (
    //     <CommonStyles.Box
    //       sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    //     >
    //       <CommonStyles.Typography>Dark Theme</CommonStyles.Typography>
    //       <Switch onChange={toggleTheme} />
    //     </CommonStyles.Box>
    //   ),
    //   icon: <CommonIcons.SettingsIcon />,
    //   onClick: () => {},
    // },
    {
      id: 4,
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
            key={item.id}
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
                color: `${theme.colors?.text1}`,
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
