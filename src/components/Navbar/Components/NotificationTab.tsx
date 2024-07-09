import CommonStyles from 'components/CommonStyles';
import { SortOrder } from 'consts/enum';
import { useGetListNoti } from 'hooks/notification/useNotificationHook';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Notification } from 'interfaces/notification';
import ItemNotifications from 'pages/NewDesigns/NotificationManagement/Components/ItemNotifications';

interface Props {
  isReaded: boolean;
}

const initialValues = {
  sortOrder: SortOrder.ASC,
  sortField: 'createdAt',
};

const NotificationTab = (props: Props) => {
  //! State
  const { isReaded } = props;
  const { filters } = useFiltersHandler(initialValues);

  //! Fetch Noti Unread
  const { data: resData, isLoading } = useGetListNoti({ ...filters, isRead: isReaded });
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
