import SearchAndFilters from 'components/SearchAndFilters';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';

import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogI } from 'interfaces/common';
import { FastField } from 'formik';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';
import CellActions from './Cells/CellActions';
import { useGetListRequestingApp } from 'hooks/app/useAppHooks';
import { UserAccess } from 'interfaces/apps';
import { useMemo } from 'react';

interface Props extends DialogI<{ username: string }> {
  appId: string;
}

const initialValues = {
  textSearch: '',
  page: NUMBER_DEFAULT_PAGE,
  perPage: NUMBER_DEFAULT_ROW_PER_PAGE,
  sortOrder: Order.desc,
  sortField: '',
};

const DialogListRequesting = (props: Props) => {
  const { isOpen, toggle, appId } = props;

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
  const { data: resList, isLoading: isLoadingList } = useGetListRequestingApp(appId, filters);

  const data =
    useMemo(() => {
      return resList?.data?.data?.items;
    }, [resList]) || [];
  const totalCount = resList?.data?.data?.totalItems || 0;

  //! Function

  const headCells = [
    {
      label: 'Username',
      id: 'username',
      Cell: (row: UserAccess) => {
        return <CommonStyles.Typography>{row?.user?.username}</CommonStyles.Typography>;
      },
    },
    {
      label: 'First name',
      id: 'firstname',
      Cell: (row: UserAccess) => {
        return <CommonStyles.Typography>{row?.user?.firstName}</CommonStyles.Typography>;
      },
    },
    {
      label: 'Last name',
      id: 'lastname',
      Cell: (row: UserAccess) => {
        return <CommonStyles.Typography>{row?.user?.lastName}</CommonStyles.Typography>;
      },
    },
    {
      label: 'Actions',
      id: 'actions',
      Cell: (row: UserAccess) => {
        return <CellActions item={row} />;
      },
    },
  ];

  return (
    <DialogMui open={isOpen} onClose={toggle} fullWidth maxWidth='xl'>
      <DialogContent>
        <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
          User(s) Requesting
        </CommonStyles.Typography>

        <SearchAndFilters
          initialValues={initialValues}
          onSubmit={(values) => {
            setFilters(values);
          }}
          onReset={() => {
            handleResetToInitial();
          }}
          renderFilterFields={() => {
            return (
              <CommonStyles.Box sx={{ gap: 2, display: 'flex' }}>
                <FastField component={TextField} name='textSearch' placeholder='Search...' />
              </CommonStyles.Box>
            );
          }}
        />

        <CommonStyles.Box sx={{ mt: 3 }}>
          <CommonStyles.Typography variant='h6' sx={{ mb: 1 }}>
            Total record(s): {totalCount}
          </CommonStyles.Typography>
          <CommonStyles.Table
            isLoading={isLoadingList}
            order={filters?.order || Order.desc}
            orderBy={filters?.orderBy}
            selected={selected}
            page={filters?.page || 0}
            rowsPerPage={filters?.rowsPerPage || 5}
            headCells={headCells}
            totalCount={totalCount}
            rows={data || []}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleRequestSort={handleRequestSort}
            handleSelectAllClick={handleSelectAllClick}
            handleCheckBox={handleCheckBox}
          />
        </CommonStyles.Box>
      </DialogContent>
      <DialogActions>
        <CommonStyles.Button variant='text' onClick={toggle}>
          Cancel
        </CommonStyles.Button>
      </DialogActions>
    </DialogMui>
  );
};

export default DialogListRequesting;
