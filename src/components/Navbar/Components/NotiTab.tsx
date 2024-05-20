import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import ItemNotification from './ItemNotification';

interface NotiTabProps {}

const NotiTab = (props: NotiTabProps) => {
  //! State
  const theme = useTheme();

  const data = {
    old: [
      {
        avatar:
          'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
        title: 'donzombie work form home ',
        code: '#828284774',
        time: '20 hours ago',
        read: true,
      },
      {
        avatar:
          'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
        title: 'thanh in holiday',
        code: '#828284774',
        time: '18 hours ago',
        read: false,
      },
      {
        avatar:
          'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
        title: 'donzombie work form home',
        code: '#828284774',
        time: '16 hours ago',
        read: false,
      },
      {
        avatar:
          'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
        title: 'thanh in holiday',
        code: '#828284774',
        time: '14 hours ago',
        read: true,
      },
    ],
    new: [
      {
        avatar:
          'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
        title: 'donzombie work form home',
        code: '#828284774',
        time: '1 hours ago',
        read: true,
      },
      {
        avatar:
          'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
        title: 'donzombie work form home',
        code: '#828284774',
        time: '2 hours ago',
        read: true,
      },
    ],
  };
  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ p: 3, pt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
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
        const isAllRead = value.every((item: any) => item.read);

        return (
          <CommonStyles.Box className='each-notification' key={ind}>
            <CommonStyles.Box
              sx={{ alignContent: 'center', display: 'flex', justifyContent: 'space-between' }}
            >
              <CommonStyles.Typography
                sx={{
                  color: theme.colors?.text3,
                  textTransform: 'uppercase',
                }}
                variant='captionMBold'
              >
                {title}
              </CommonStyles.Typography>

              {isAllRead && (
                <CommonStyles.Typography className='is-hover' isLink variant='captionLMedium'>
                  Mark all as read
                </CommonStyles.Typography>
              )}
            </CommonStyles.Box>

            <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              {value?.map((item: any, ind: number) => {
                return <ItemNotification key={ind} item={item} />;
              })}
            </CommonStyles.Box>
          </CommonStyles.Box>
        );
      })}
    </CommonStyles.Box>
  );
};

export default NotiTab;
