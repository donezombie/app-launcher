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
import { useTheme } from '@mui/material';
import SearchAndFilters from 'components/SearchAndFilters';
import TextField from 'components/CustomFields/TextField';
import { FastField, Field } from 'formik';
import { cloneDeep } from 'lodash';

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
  const theme = useTheme();

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
  const data = resData?.data?.data?.items || [];

  //! Function
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
      <CommonStyles.Box
        sx={{
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0.3rem 1rem',
          borderRadius: '4px',
          padding: '1rem',
        }}
      >
        <CommonStyles.Box sx={{ borderBottom: `1px solid ${theme.colors?.gray3}` }} pl={2} mb={2}>
          <CommonStyles.Typography
            pb={1}
            sx={{
              width: 'fit-content',
              borderBottom: '2px solid blue',
              cursor: 'default',
            }}
          >
            Notification
          </CommonStyles.Typography>
        </CommonStyles.Box>
        <SearchAndFilters
          initialValues={initialValues}
          onSubmit={(values) => {
            setFilters(cloneDeep(values));
          }}
          sxContainer={{ marginBottom: '2rem' }}
          enableReinitialize
          onReset={() => {
            handleResetToInitial();
          }}
          renderFilterFields={() => (
            <CommonStyles.Box
              id='search-n-filters'
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                width: '85%',
                gap: '4px',
              }}
            >
              <FastField fullWidth component={TextField} name='extSearch' placeholder={'Search'} />
            </CommonStyles.Box>
          )}
        />
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
      </CommonStyles.Box>

      {shouldRenderDialog && <DialogAddNotification isOpen={openDialog} toggle={toggleDialog} />}
    </CommonStyles.Box>
  );
};

export default NotificationManagement;
