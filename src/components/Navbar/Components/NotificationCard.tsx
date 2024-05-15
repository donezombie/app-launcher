import { Switch, useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { SIZE_ICON_DEFAULT } from 'consts';
import React from 'react';
import ItemNotification from './ItemNotification';
import { useNavigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

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
  tabs: ITab[];
  data: DataItem;
  onClickNavigateNotiScreen?: () => void;
}

const NotificationCard = (props: NotificationCardProps) => {
  const { tabs, data, onClickNavigateNotiScreen } = props;
  //! State
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const theme = useTheme();
  const navigate = useNavigate();

  //! Function

  const onOpenNotiSreen = () => {
    navigate(BaseUrl.Notification.Index);
    onClickNavigateNotiScreen && onClickNavigateNotiScreen();
  };

  //! Render
  return (
    <CommonStyles.Box sx={{ minWidth: 500, px: '24px' }}>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          my: 2,
        }}
      >
        <CommonStyles.Typography fontWeight={600} fontSize='1.2rem'>
          Notification
        </CommonStyles.Typography>
        <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
          <Switch {...label} defaultChecked size='small' />
          <CommonStyles.Typography fontWeight={500} fontSize='14px' mr='12px' ml='8px'>
            Only show unread
          </CommonStyles.Typography>
          <CommonIcons.MdOutlineLaunch
            size={SIZE_ICON_DEFAULT + 2}
            style={{ cursor: 'pointer' }}
            onClick={onOpenNotiSreen}
          />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box sx={{ mb: 1 }}>
        <CommonStyles.Tabs tabs={tabs} />
      </CommonStyles.Box>
      {Object.entries(data)?.map((el, ind) => {
        const key: string = el[0];
        const value = el[1];
        let title = '';
        switch (key) {
          case 'old':
            title = `Yesterday`;
            break;
          case 'new':
            title = `Older`;
            break;
        }
        const isAllRead = value.every((item: INotification) => item.read);

        return (
          <CommonStyles.Box key={ind} sx={{ pb: 1 }}>
            <CommonStyles.Box
              sx={{ alignContent: 'center', display: 'flex', justifyContent: 'space-between' }}
            >
              <CommonStyles.Typography
                sx={{
                  color: theme.colors?.textGray,
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                }}
              >
                {title}
              </CommonStyles.Typography>
              {isAllRead && (
                <CommonStyles.Typography
                  className='is-hover'
                  isLink
                  fontSize={'0.8rem'}
                  mr={5}
                  fontWeight={'600'}
                >
                  Mark all as read
                </CommonStyles.Typography>
              )}
            </CommonStyles.Box>
            {value?.map((item: INotification, ind: number) => {
              return <ItemNotification key={ind} item={item} />;
            })}
          </CommonStyles.Box>
        );
      })}
    </CommonStyles.Box>
  );
};

export default React.memo(NotificationCard);
