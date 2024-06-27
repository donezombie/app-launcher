import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import { NewsType } from 'consts/enum';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import ItemNew from './ItemNew';

interface NewsTabProps {}
const initialValues = {
  textSearch: '',
  page: 1,
  rowsPerPage: 15,
  order: Order.desc,
  orderBy: '',
  type: NewsType.NEWS,
};
const NewsTab = (props: NewsTabProps) => {
  //! State
  const theme = useTheme();

  const { filters, setFilters, handleResetToInitial } = useFiltersHandler(initialValues);

  const { data: resData, isLoading: isInstalledLoading } = useGetNewsListHooks(filters);

  const data = resData?.data?.data?.items || [];

  //! Function
  const falseItems = data.filter((item) => item?.isNew === true);
  falseItems.forEach((item) => {
    item.title = 'new';
  });
  //! Render
  if (isInstalledLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box className='component:NewsTab'>
      <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {data?.map((item, ind: number) => {
          return <ItemNew key={ind} item={item} />;
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default NewsTab;
