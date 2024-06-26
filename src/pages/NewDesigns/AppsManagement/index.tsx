import CommonStyles from 'components/CommonStyles';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';
import SearchAndFilters from 'components/SearchAndFilters';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { FastField } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { cloneDeep } from 'lodash';
import CellActive from 'pages/Apps/Components/TableListApp/Cells/CellActive';
import CellApproval from 'pages/Apps/Components/TableListApp/Cells/CellApproval';
import CellActions from 'pages/Apps/Components/TableListApp/Cells/CellActions';
import { SortOrder } from 'consts/enum';
import { useMemo } from 'react';

const initialValues = {
  page: 1,
  perPage: 5,
  textSearch: '',
  sortOrder: SortOrder.ASC,
  sortField: 'createdAt',
};

const AppsManagement = () => {
  //! State
  const {
    filters,
    selected,
    setFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleResetToInitial,
  } = useFiltersHandler(initialValues);

  //! Function
  const { data: resListApp, isLoading } = useGetListApp(filters);
  const data =
    useMemo(() => {
      return resListApp?.data?.data?.items;
    }, [resListApp]) || [];
  const totalCount = resListApp?.data?.data?.totalItems || 0;

  //! Render
  return (
    <CommonStyles.Box
      className='component:AppsManagement'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <SearchAndFilters
        initialValues={initialValues}
        onSubmit={(values) => {
          setFilters(cloneDeep(values));
        }}
        onReset={() => {
          handleResetToInitial();
        }}
        renderFilterFields={() => {
          return <FastField component={TextField} name='textSearch' placeholder='Search...' />;
        }}
      />
      <CommonStyles.Table
        order={filters?.order || Order.desc}
        orderBy={filters?.orderBy}
        selected={selected}
        page={filters?.page || 0}
        rowsPerPage={filters?.rowsPerPage || 5}
        headCells={[
          {
            label: 'Icon',
            id: 'icon',
            Cell: (row) => {
              const { icon } = row;
              return <CommonStyles.Avatar src={icon} sx={{ width: 56, height: 56 }} />;
            },
          },
          {
            label: 'Name',
            id: 'name',
          },
          {
            label: 'Developer name',
            id: 'developerName',
          },
          {
            label: 'Summary',
            id: 'summary',
            Cell: (row) => {
              return (
                <CommonStyles.Typography sx={{ maxWidth: 400 }}>
                  {row?.summary || ''}
                </CommonStyles.Typography>
              );
            },
          },
          {
            label: 'Live',
            id: 'isLive',
            Cell: (row) => {
              return <CellActive item={row} />;
            },
          },
          // {
          //   label: 'Approved',
          //   id: 'isApproved',
          //   Cell: (row) => {
          //     return <CellApproval item={row} />;
          //   },
          // },
          {
            label: '',
            id: 'actions',
            disableSort: true,
            Cell: (row) => {
              return <CellActions item={row} />;
            },
          },
        ]}
        totalCount={totalCount}
        rows={data}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAllClick}
        isLoading={isLoading}
      />
    </CommonStyles.Box>
  );
};

export default AppsManagement;
