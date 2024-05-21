import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetAppStore } from 'hooks/app/useAppHooks';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';
import { useLocation } from 'react-router-dom';
import { useGetDetailCategory } from 'hooks/category/useGetDetailCategory';

const initialValues = {
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: 999,
  search: '',
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

  const { data: resList, isLoading: isLoadingList } = useGetAppStore({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });
  const data = resList?.data?.items || [];

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:DetailApp'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <CommonStyles.Box>
        <HeadWithSearching
          title={`Market Place ${categoryDetail?.name}`}
          onSubmitSearch={({ search }) => {
            handleSearch(search);
          }}
        />
      </CommonStyles.Box>

      {isLoadingList ? <CommonStyles.Loading /> : <ListApp apps={data} />}
    </CommonStyles.Box>
  );
};

export default DetailApp;
