import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import SearchAndFilters from 'components/SearchAndFilters';
import { NUMBER_DEFAULT_PAGE } from 'consts';
import { FastField } from 'formik';
import { useGetListApp, useGetListAppForManager } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { cloneDeep } from 'lodash';
import { useAuth } from 'providers/AuthenticationProvider';
import React, { Fragment, useMemo } from 'react';
import EachApp from '../../pages/Apps/AppsForUser/Components/EachApp';

const initialValues = {
  page: NUMBER_DEFAULT_PAGE,
  // rowsPerPage: 999,
  textSearch: '',
};

const ListAvailableApps = () => {
  //! State
  const { isAppManager } = useAuth();
  const theme = useTheme();
  const { filters, setFilters, handleResetToInitial } = useFiltersHandler(initialValues);
  const useGetListData = isAppManager ? useGetListAppForManager : useGetListApp;

  const { data: resData, isLoading: isInstalledLoading } = useGetListData(filters);
  const data =
    useMemo(() => {
      return resData?.data?.data?.items;
    }, [resData]) || [];
  const total = resData?.data?.data?.totalItems || 0;

  //! Function

  //! Render
  const renderListAppInstalled = () => {
    return (
      <Fragment>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
          }}
        >
          <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
            Store ({total})
          </CommonStyles.Typography>
          <SearchAndFilters
            sxContainer={{ mb: 2 }}
            initialValues={initialValues}
            onSubmit={(values) => {
              setFilters(cloneDeep(values));
            }}
            onReset={() => {
              handleResetToInitial();
            }}
            renderFilterFields={() => {
              return <FastField component={TextField} name='textSearch' label='Search apps' />;
            }}
          />
        </CommonStyles.Box>

        {isInstalledLoading ? (
          <CommonStyles.Loading />
        ) : (
          <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {data.length <= 0 && <CommonStyles.Typography>No app found...</CommonStyles.Typography>}
            {data?.map((el) => {
              return <EachApp key={el.id} item={el} />;
            })}
          </CommonStyles.Box>
        )}
      </Fragment>
    );
  };

  return (
    <CommonStyles.Box
      sx={{
        [theme.breakpoints.down('sm')]: {
          paddingTop: '70px',
        },
      }}
    >
      <CommonStyles.Box sx={{ mb: 2 }}>{renderListAppInstalled()}</CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(ListAvailableApps);
