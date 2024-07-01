import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';
import { NUMBER_DEFAULT_PAGE } from 'consts';
import { AppType } from 'consts/enum';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useMemo } from 'react';

const initialValues = {
  page: NUMBER_DEFAULT_PAGE,
  // rowsPerPage: 999,
  textSearch: '',
  myApp: true,
  type: AppType.REPORT,
};

const ManageYourReport = () => {
  //! State
  const { filters, handleSearch } = useFiltersHandler(initialValues);
  const { data: resListApp, isLoading: isCreatedLoading } = useGetListApp(filters);
  const dataInstallApp =
    useMemo(() => {
      return resListApp?.data?.data?.items;
    }, [isCreatedLoading]) || [];

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:ManageYourApps'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <HeadWithSearching
        title='Manage Your Report'
        onSubmitSearch={({ search }) => {
          handleSearch(search);
        }}
        placeholder='Search App...'
      />

      {isCreatedLoading ? (
        <CommonStyles.Loading />
      ) : (
        <ListApp apps={dataInstallApp} isYourApp isReport />
      )}
    </CommonStyles.Box>
  );
};

export default ManageYourReport;
