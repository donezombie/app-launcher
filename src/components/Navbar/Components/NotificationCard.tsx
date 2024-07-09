import { Switch, useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { SIZE_ICON_DEFAULT } from 'consts';
import BaseUrl from 'consts/baseUrl';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsTab from './NewsTab';
import NotiTab from './NotiTab';
import NotificationTab from './NotificationTab';

interface ITab {
  label: string;
  component: string;
}

interface INotification {
  avatar: string;
  title: string;
  code: string;
  time: string;
  read: boolean;
}

interface DataItem {
  old: INotification[];
  new: INotification[];
}

interface NotificationCardProps {
  onClickNavigateNotiScreen?: () => void;
}

const NotificationCard = (props: NotificationCardProps) => {
  const { onClickNavigateNotiScreen } = props;
  const [isReaded, setIsReaded] = useState(false);

  //! State
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const theme = useTheme();
  const navigate = useNavigate();
  const tabs = [
    { label: 'Direct', component: NotiTab },
    { label: 'News', component: NewsTab },
    {
      label: 'Notification',
      component: () => <NotificationTab isReaded={isReaded} />,
    },
  ];

  //! Function
  const onOpenNotiSreen = () => {
    navigate(BaseUrl.Notification.Index);
    onClickNavigateNotiScreen && onClickNavigateNotiScreen();
  };

  //! Render
  return (
    <CommonStyles.Box className='component:NotificationCard' sx={{ width: 500 }}>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.colors?.borderBaseAlpha}`,
          p: 3,
        }}
      >
        <CommonStyles.Typography fontWeight={600} fontSize='1.2rem'>
          Notifications
        </CommonStyles.Typography>

        <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
          <Switch {...label} size='small' onChange={(e) => setIsReaded(e.target.checked)} />
          <CommonStyles.Typography fontWeight={500} fontSize='14px' mr='32px' ml='16px'>
            Only show readed
          </CommonStyles.Typography>
          <CommonIcons.MdOutlineLaunch
            size={SIZE_ICON_DEFAULT + 2}
            style={{ cursor: 'pointer' }}
            onClick={onOpenNotiSreen}
          />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Tabs tabs={tabs} />
    </CommonStyles.Box>
  );
};

export default React.memo(NotificationCard);
