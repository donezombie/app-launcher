import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import NewsCard from './Components/NewsCard';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';

interface NewsScreenProps {}

const tabs = [
  { label: 'Direct', component: 'snsnsn' },
  { label: 'News', component: 'snsnsn' },
];
const initialValues = {
  search: '',
  page: 0,
  rowsPerPage: 5,
  order: Order.desc,
  orderBy: '',
};

const NewsScreen = (props: NewsScreenProps) => {
  //! State

  const { filters, setFilters, handleResetToInitial } = useFiltersHandler(initialValues);

  const {
    data: resData,
    isLoading: isInstalledLoading,
    refetch: refetchListNews,
  } = useGetNewsListHooks({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });

  console.log('resData', resData);

  const data = resData?.data?.items || [];
  const total = resData?.data?.totalCount || 0;

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Quote'
      sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
    >
      <HeadWithSearching title='News' onSubmitSearch={() => {}} placeholder='Search News...' />
      <NewsCard data={data} tabs={tabs} />
    </CommonStyles.Box>
  );
};

export default NewsScreen;
