import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import SearchAndFilters from 'components/SearchAndFilters';
import BaseUrl from 'consts/baseUrl';
import { SortOrder } from 'consts/enum';
import { FastField } from 'formik';
import { useGetCompanyList } from 'hooks/company/useCompanyHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { ICompany } from 'interfaces/company';
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

const Company = () => {
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
  const navigate = useNavigate();
  //! Function
  const { data: resListCompany, isLoading } = useGetCompanyList(filters);
  const data =
    useMemo(() => {
      return resListCompany?.data?.data?.items;
    }, [resListCompany]) || [];

  const totalCount = resListCompany?.data?.data?.totalItems || 0;

  //! Render
  return (
    <CommonStyles.Box
      className='component:AppsManagement'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CommonStyles.Box>
          <CommonStyles.Button onClick={() => navigate(BaseUrl.Company.AddCompany)}>
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
            label: 'Name',
            id: 'name',
          },
          {
            label: 'Logo',
            id: 'logo',
            Cell: (row) => {
              const { logo } = row;
              return (
                <img
                  src={`${logo}`}
                  style={{ width: 56, height: 56, borderRadius: 999 }}
                  alt='companyLogo'
                />
              );
            },
          },
          {
            label: 'Color Background',
            id: 'colorBackground',
            Cell: (row) => {
              const { colorBackground } = row;
              return (
                <CommonStyles.Box
                  sx={{
                    width: 100,
                    height: 10,
                    backgroundColor: colorBackground,
                    borderRadius: 999,
                    border: '1px solid #ccc',
                  }}
                />
              );
            },
          },
          {
            label: 'Color Header',
            id: 'colorHeader',
            Cell: (row) => {
              const { colorHeader } = row;
              return (
                <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CommonStyles.Box
                    sx={{
                      width: 100,
                      height: 10,
                      backgroundColor: colorHeader,
                      borderRadius: 999,
                      border: '1px solid #ccc',
                    }}
                  />
                </CommonStyles.Box>
              );
            },
          },
          {
            label: 'Color Text',
            id: 'colorText',
            Cell: (row) => {
              const { colorText } = row;
              return (
                <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CommonStyles.Box
                    sx={{
                      width: 100,
                      height: 10,
                      backgroundColor: colorText,
                      borderRadius: 999,
                      border: '1px solid #ccc',
                    }}
                  />
                </CommonStyles.Box>
              );
            },
          },

          {
            label: '',
            id: '',
            Cell: (row: ICompany) => {
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

export default Company;
