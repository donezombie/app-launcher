import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import { News } from 'interfaces/news';
import React from 'react';
import DialogAddNews from './DialogAddNews';
import ItemNews from './ItemNews';
import { Order } from 'interfaces/common';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';
import HeadWithSearching from 'components/HeadWithSearching';

interface NewsCardProps {}
const initialValues = {
  search: '',
  page: 0,
  rowsPerPage: 15,
  order: Order.desc,
  orderBy: '',
};
const NewsCard = (props: NewsCardProps) => {
  const { filters, setFilters, handleResetToInitial, handleSearch } =
    useFiltersHandler(initialValues);

  const {
    data: resData,
    isLoading,
    refetch: refetchListNews,
  } = useGetNewsListHooks({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });

  const data = resData?.data?.items || [];
  const total = resData?.data?.totalCount || 0;

  //! State
  const {
    open: openDialog,
    toggle: toggleDialog,
    shouldRender: shouldRenderDialog,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:NewsCard'>
      <HeadWithSearching
        title='News'
        onSubmitSearch={({ search }) => {
          handleSearch(search);
        }}
        placeholder='Search News...'
      />
      <CommonStyles.Button sx={{ mb: 2 }} onClick={toggleDialog}>
        Add News
      </CommonStyles.Button>
      <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {isLoading ? (
          <CommonStyles.Loading />
        ) : (
          data?.map((item: News, ind: number) => {
            return <ItemNews key={ind} item={item} />;
          })
        )}
      </CommonStyles.Box>
      {shouldRenderDialog && <DialogAddNews isOpen={openDialog} toggle={toggleDialog} />}
    </CommonStyles.Box>
  );
};

export default React.memo(NewsCard);
