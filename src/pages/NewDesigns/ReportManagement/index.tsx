import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import { AppType, SortOrder } from 'consts/enum';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { useMemo } from 'react';
import CellActions from './Components/CellActions';

const initialValues = {
  page: 1,
  perPage: 5,
  textSearch: '',
  sortOrder: SortOrder.ASC,
  sortField: 'createdAt',
  type: AppType.REPORT,
};

const ReportManagement = () => {
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
    handleSearch,
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
      className='component:AppsReport'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <HeadWithSearching
        title='Report Apps'
        onSubmitSearch={({ search }) => {
          handleSearch(search);
        }}
        placeholder='Search Report...'
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
            label: 'Description',
            id: 'description',
          },
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

export default ReportManagement;
