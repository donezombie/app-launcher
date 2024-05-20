import { Badge, Popover, Switch } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import Avatar from 'components/CommonStyles/Avatar';
import { SIZE_ICON_DEFAULT } from 'consts';
import { useAuth } from 'providers/AuthenticationProvider';
import React, { useId } from 'react';
import ItemNotification from './ItemNotification';
import NotificationCard from './NotificationCard';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const RightSide = () => {
  //! State
  const auth = useAuth();
  const id = useId();
  const [anchorElNoti, setAnchorElNoti] = React.useState<HTMLButtonElement | null>(null);
  const openNoti = Boolean(anchorElNoti);

  //! Function
  const handleClickNoti = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNoti(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElNoti(null);
  };

  const onClickNavigateNotiScreen = () => {
    setAnchorElNoti(null);
  };

  //! Render
  return (
    <CommonStyles.Box
      className='component:RightSide'
      sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
    >
      <CommonIcons.NotificationIcon
        className='is-hover'
        size={SIZE_ICON_DEFAULT}
        onClick={(e: any) => {
          handleClickNoti(e);
        }}
        style={{ cursor: 'pointer' }}
      />
      <CommonIcons.HelpIcon className='is-hover' size={SIZE_ICON_DEFAULT + 3} />
      <CommonIcons.SettingsIcon className='is-hover' size={SIZE_ICON_DEFAULT} />

      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'
        color='success'
      >
        <Avatar sx={{ width: 35, height: 35 }} src='https://mui.com/static/images/avatar/1.jpg' />
      </StyledBadge>

      <CommonStyles.Typography className='is-hover' isLink onClick={() => auth.logout()}>
        Logout
      </CommonStyles.Typography>

      <Popover
        sx={{ mt: 2 }}
        id={id}
        open={openNoti}
        anchorEl={anchorElNoti}
        onClose={handleClose}
        keepMounted={false}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NotificationCard onClickNavigateNotiScreen={onClickNavigateNotiScreen} />
      </Popover>
    </CommonStyles.Box>
  );
};

export default React.memo(RightSide);
