import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import SearchAndFilters from 'components/SearchAndFilters';
import { SortOrder } from 'consts/enum';
import { FastField } from 'formik';
import { filterAppType } from 'helpers';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { cloneDeep } from 'lodash';
import { useMemo } from 'react';
import CellActions from './Components/CellActions';

const initialValues = {
  page: 1,
  perPage: 5,
  textSearch: '',
  sortOrder: SortOrder.ASC,
  sortField: 'createdAt',
};

const ApiDocs = () => {
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
  const { data: resListApp, isLoading } = useGetListApp({ ...filters, type: filterAppType });
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
            label: 'Name',
            id: 'name',
          },
          {
            label: 'Api Doc Uri',
            id: 'apiDoc',
          },

          {
            label: '',
            id: 'actions',
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

export default ApiDocs;
