import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';
import { AppStatus } from 'consts/enum';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useMemo } from 'react';

const initialValues = {
  page: 1,
  perPage: 999,
  textSearch: '',
  canAccess: true,
  status: AppStatus.APPROVED,
};

const MyApps = () => {
  //! State
  const { filters, handleSearch } = useFiltersHandler(initialValues);
  const { data: resListInstalledApp, isLoading: isInstalledLoading } = useGetListApp(filters);
  const dataInstallApp =
    useMemo(() => {
      return resListInstalledApp?.data?.data?.items;
    }, [isInstalledLoading]) || [];

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Quote'
      sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
    >
      <HeadWithSearching
        title='My Apps'
        onSubmitSearch={({ search }) => {
          handleSearch(search);
        }}
        placeholder='Search App...'
      />

      {isInstalledLoading ? <CommonStyles.Loading /> : <ListApp apps={dataInstallApp} isMyApps />}
    </CommonStyles.Box>
  );
};

export default MyApps;
