import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import ItemNotification from 'components/Navbar/Components/ItemNotification';
import { Field, Form, Formik } from 'formik';
import { useMemo } from 'react';
import HeaderOfSection from './Components/HeaderOfSection';

interface NotificationScreenProps {}

const tabs = [
  { label: 'Direct', component: 'snsnsn' },
  { label: 'News', component: 'snsnsn' },
];
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
      read: true,
    },
    {
      avatar:
        'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
      title: 'donzombie work form home',
      code: '#828284774',
      time: '16 hours ago',
      read: true,
    },
    {
      avatar:
        'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
      title: 'thanh in holiday',
      code: '#828284774',
      time: '14 hours ago',
      read: true,
    },
    {
      avatar:
        'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
      title: 'thanh in holiday',
      code: '#828284774',
      time: '14 hours ago',
      read: true,
    },
    {
      avatar:
        'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
      title: 'thanh in holiday',
      code: '#828284774',
      time: '2 days ago',
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
      read: false,
    },
  ],
};

const NotificationScreen = (props: NotificationScreenProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render

  const renderSearch = useMemo(() => {
    return (
      <Formik initialValues={{ search: '' }} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <Field
                component={TextField}
                name='search'
                placeholder='Filter for reference...'
                sx={{ minWidth: 330 }}
                iconStartInput={<CommonIcons.Search />}
              />
            </Form>
          );
        }}
      </Formik>
    );
  }, []);

  return (
    <CommonStyles.Box className='component:NotificationScreen' sx={{ mx: 10, mt: 1 }}>
      <HeaderOfSection title='Notifications' subTitle={renderSearch} />
      <CommonStyles.Box
        sx={{
          mb: 4,
          border: `1px solid ${theme.colors?.borderIcon}`,
          borderWidth: '0px 0px 1px 0px',
        }}
      >
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
        const isAllRead = value.every((item) => item.read);

        return (
          <CommonStyles.Box key={ind} sx={{ px: 2, pb: 1 }}>
            <CommonStyles.Box
              sx={{ alignContent: 'center', display: 'flex', justifyContent: 'space-between' }}
            >
              <CommonStyles.Typography
                sx={{
                  color: theme.colors?.textGray,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                }}
              >
                {title}
              </CommonStyles.Typography>
              {isAllRead && (
                <CommonStyles.Typography className='is-hover' isLink fontSize={'0.9rem'} mr={3.5}>
                  Mark all as read
                </CommonStyles.Typography>
              )}
            </CommonStyles.Box>
            {value?.map((item, ind: number) => {
              return <ItemNotification key={ind} item={item} />;
            })}
          </CommonStyles.Box>
        );
      })}
    </CommonStyles.Box>
  );
};

export default NotificationScreen;
