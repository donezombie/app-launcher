import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';
import { Order } from 'interfaces/common';
import { News } from 'interfaces/news';
import ItemNew from './ItemNew';
import { useTheme } from '@mui/material';

interface NewsTabProps {}
const initialValues = {
  search: '',
  page: 0,
  rowsPerPage: 15,
  order: Order.desc,
  orderBy: '',
};
const NewsTab = (props: NewsTabProps) => {
  //! State
  const theme = useTheme();

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

  const data = resData?.data?.items || [];
  console.log('data', data);

  //! Function
  const falseItems = data.filter((item) => item?.isNew === true);
  falseItems.forEach((item) => {
    item.title = 'new';
  });
  //! Render
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
