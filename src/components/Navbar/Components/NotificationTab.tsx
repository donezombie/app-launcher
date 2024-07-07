import CommonStyles from 'components/CommonStyles';
import { useGetListNoti } from 'hooks/notification/useNotificationHook';
import { Notification } from 'interfaces/notification';
import ItemNotifications from 'pages/NewDesigns/NotificationManagement/Components/ItemNotifications';

const NotificationTab = () => {
  //! State

  //! Fetch Noti Unread
  const { data: resData, isLoading } = useGetListNoti();
  const data = resData?.data?.data?.items || [];

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:NotificationTab'>
      {isLoading ? (
        <CommonStyles.Loading />
      ) : (
        data.map((item: Notification, ind: number) => {
          return <ItemNotifications key={ind} item={item} />;
        })
      )}
    </CommonStyles.Box>
  );
};

export default NotificationTab;
