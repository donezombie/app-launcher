import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';
import { AppStatus, AppType } from 'consts/enum';
import { useGetListApp } from 'hooks/app/useAppHooks';
import { useGetDetailCategory } from 'hooks/category/useGetDetailCategory';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const initialValues = {
  status: AppStatus.APPROVED,
  textSeach: '',
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DetailAppReport = () => {
  //! State
  const query = useQuery();
  const category = query.get('category');

  const { filters, handleSearch } = useFiltersHandler(initialValues);

  const { categoryDetail } = useGetDetailCategory(category || '');

  const { data: resListApp, isLoading } = useGetListApp({
    ...filters,
    categoryId: category ? +category : undefined,
    type: AppType.REPORT,
  });
  const listAppFilter =
    useMemo(() => {
      return resListApp?.data?.data?.items;
    }, [resListApp]) || [];
  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:DetailAppReport'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <CommonStyles.Box>
        <HeadWithSearching
          title={`${categoryDetail?.name || ''}`}
          onSubmitSearch={({ search }) => {
            handleSearch(search);
          }}
        />
      </CommonStyles.Box>

      {isLoading ? <CommonStyles.Loading /> : <ListApp apps={listAppFilter} isReport />}
    </CommonStyles.Box>
  );
};

export default DetailAppReport;
