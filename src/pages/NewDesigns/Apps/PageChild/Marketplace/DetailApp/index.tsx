import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetAppStore, useGetListApp } from 'hooks/app/useAppHooks';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';
import { useLocation } from 'react-router-dom';
import { useGetDetailCategory } from 'hooks/category/useGetDetailCategory';
import { App } from 'interfaces/apps';
import { useMemo } from 'react';

const initialValues = {
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: 999,
  textSeach: '',
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DetailApp = () => {
  //! State
  const query = useQuery();
  const category = query.get('category');

  const { filters, handleSearch } = useFiltersHandler(initialValues);

  const { categoryDetail } = useGetDetailCategory(category || '');

  // const appIDCategory = categoryDetail?.id;
  // const { data: resList, isLoading: isLoadingList } = useGetAppStore({
  //   skip:
  //     (filters?.page || NUMBER_DEFAULT_PAGE) *
  //     (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
  //   take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
  //   filter: filters?.search,
  // });
  // const data = resList?.data?.items || [];
  const { data: resListApp, isLoading } = useGetListApp({
    categoryId: category ? +category : undefined,
  });
  const listAppFilter =
    useMemo(() => {
      return resListApp?.data?.data?.items;
    }, [resListApp]) || [];

  // const filterAppsByIds = (listApp: App[], AppIDs: string[]) => {
  //   return listApp.filter((app) => AppIDs.includes(app.id));
  // };

  // const dataFiltered = filterAppsByIds(data, appIDCategory);

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:DetailApp'
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

      {isLoading ? <CommonStyles.Loading /> : <ListApp apps={listAppFilter} />}
    </CommonStyles.Box>
  );
};

export default DetailApp;
