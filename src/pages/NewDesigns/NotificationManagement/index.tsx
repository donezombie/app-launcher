import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import { CategoryType } from 'consts/enum';
import { useGetNotificationListHooks } from 'hooks/notification/useNotificationHook';
import useFiltersHandler from 'hooks/useFiltersHandler';
import useToggleDialog from 'hooks/useToggleDialog';
import { Order } from 'interfaces/common';
import { Notification } from 'interfaces/notification';
import CellActions from './Components/CellActions';
import DialogAddNotification from './Components/DialogAddNotification';

const tabs = [
  {
    label: 'Notification',
    value: 'Notification',
  },
];

const initialValues = {
  extSearch: '',
  page: 1,
  perPage: 10,
  sortOrder: Order.asc,
  sortField: '',
  type: CategoryType.DEFAULT,
};

const NotificationManagement = () => {
  //! State
  const {
    open: openDialog,
    toggle: toggleDialog,
    shouldRender: shouldRenderDialog,
  } = useToggleDialog();

  const {
    filters,
    setFilters,
    selected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleResetToInitial,
    handleCheckBox,
  } = useFiltersHandler(initialValues);

  const { data: resData, isLoading } = useGetNotificationListHooks(filters);
  console.log('resData', resData);

  const data = resData?.data?.data?.items || [];

  //! Function
  const renderTab = () => {
    return (
      <CommonStyles.Box sx={{ display: 'flex', mb: 2 }}>
        <CommonStyles.Box
          key={tabs[0].value}
          sx={{
            padding: 1,
            marginRight: 2,
            borderBottom: '2px solid',
            cursor: 'pointer',
          }}
        >
          <CommonStyles.Typography sx={{ fontWeight: 'bold' }}>
            {tabs[0].label}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>
    );
  };

  const headCells = [
    {
      label: 'Title',
      id: 'title',
      disableSort: true,
      Cell: (row: Notification) => {
        return <CommonStyles.Box>{row.title}</CommonStyles.Box>;
      },
    },
    {
      label: 'ImageUrl',
      id: 'imageUrl',
      disableSort: true,
      Cell: (row: Notification) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Avatar src={row.imageUrl} />
          </CommonStyles.Box>
        );
      },
    },
    {
      label: 'Type',
      id: 'type',
      disableSort: true,
      Cell: (row: Notification) => {
        return <CommonStyles.Box>{row.type}</CommonStyles.Box>;
      },
    },
    {
      label: 'Created At',
      id: 'createdAt',
      disableSort: true,
    },
    {
      label: 'Updated At',
      id: 'updatedAt',
      disableSort: true,
    },
    {
      label: 'Action',
      id: 'action',
      disableSort: true,
      Cell: (row: Notification) => {
        return <CellActions item={row} />;
      },
    },
  ];

  //! Render
  return (
    <CommonStyles.Box className='component:NotificationManagement'>
      <HeadWithSearching
        title='Notification Management'
        // onSubmitSearch={({ search }) => {
        //   handleSearch(search);
        // }}
        placeholder='Search Notification Management...'
      />
      <CommonStyles.Button sx={{ mb: 2 }} onClick={toggleDialog}>
        Add New Notification
      </CommonStyles.Button>
      {renderTab()}
      <CommonStyles.Table
        headCells={headCells}
        order={filters?.order || Order.desc}
        orderBy={filters?.orderBy}
        selected={selected}
        page={filters?.page || 1}
        rowsPerPage={filters?.perPage || 10}
        totalCount={resData?.data?.data?.totalItems || 0}
        rows={data || []}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAllClick}
        isLoading={isLoading}
      />
      {shouldRenderDialog && <DialogAddNotification isOpen={openDialog} toggle={toggleDialog} />}
    </CommonStyles.Box>
  );
};

export default NotificationManagement;
