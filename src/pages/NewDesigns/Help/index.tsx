import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import SearchAndFilters from 'components/SearchAndFilters';
import BaseUrl from 'consts/baseUrl';
import { SortOrder } from 'consts/enum';
import { FastField } from 'formik';
import { useGetListHelp } from 'hooks/staticPage/useStaticPageHook';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { IStaticPage } from 'interfaces/staticPage';
import { cloneDeep } from 'lodash';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CellActions from './Components/CellActions';

const initialValues = {
  page: 1,
  perPage: 5,
  textSearch: '',
  sortOrder: SortOrder.ASC,
  sortField: 'createdAt',
};

const HelpManagement = () => {
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
  const { data: resListHelp, isLoading } = useGetListHelp(filters);
  const data =
    useMemo(() => {
      return resListHelp?.data?.data?.items;
    }, [resListHelp]) || [];
  const totalCount = resListHelp?.data?.data?.totalItems || 0;
  const navigate = useNavigate();
  //! Render
  return (
    <CommonStyles.Box
      className='component:AppsReport'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CommonStyles.Box>
          <CommonStyles.Button onClick={() => navigate(BaseUrl.Help.AddHelp)}>
            Create new
          </CommonStyles.Button>
        </CommonStyles.Box>
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
      </CommonStyles.Box>
      <CommonStyles.Table
        order={filters?.order || Order.desc}
        orderBy={filters?.orderBy}
        selected={selected}
        page={filters?.page || 0}
        rowsPerPage={filters?.rowsPerPage || 5}
        headCells={[
          {
            label: 'Title',
            id: 'title',
          },
          {
            label: 'Url',
            id: 'url',
          },
          {
            label: 'Description',
            id: 'description',
          },
          {
            label: 'Topic',
            id: 'topic',
          },
          {
            label: '',
            id: 'actions',
            disableSort: true,
            Cell: (row: IStaticPage) => {
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

export default HelpManagement;
