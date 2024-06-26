import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import { News } from 'interfaces/news';
import React, { useState } from 'react';
import DialogAddNews from './DialogAddNews';
import ItemNews from './ItemNews';
import { Order } from 'interfaces/common';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';
import HeadWithSearching from 'components/HeadWithSearching';
import { NewsType } from 'consts/enum';
import { upperFirst } from 'lodash';

interface NewsCardProps {}
const initialValues = {
  textSearch: '',
  page: 0,
  perPage: 15,
  sortOrder: Order.desc,
  sortField: '',
  type: NewsType.NEWS,
};

const tabs = [
  {
    label: upperFirst(NewsType.NEWS.toLocaleLowerCase()),
    value: NewsType.NEWS,
  },
  {
    label: upperFirst(NewsType.DIRECT.toLocaleLowerCase()),
    value: NewsType.DIRECT,
  },
];

const NewsCard = (props: NewsCardProps) => {
  const { filters, setFilters, handleResetToInitial, handleSearch } =
    useFiltersHandler(initialValues);
  const [tab, setTab] = useState(NewsType.NEWS);

  const { data: resData, isLoading, refetch: refetchListNews } = useGetNewsListHooks(filters);

  const data = resData?.data?.data?.items || [];
  const total = resData?.data?.data?.totalCount || 0;

  //! State
  const {
    open: openDialog,
    toggle: toggleDialog,
    shouldRender: shouldRenderDialog,
  } = useToggleDialog();

  //! Function
  const renderTab = () => {
    return (
      <CommonStyles.Box sx={{ display: 'flex', mb: 2 }}>
        {tabs.map((item) => {
          const isActive = tab === item.value;
          return (
            <CommonStyles.Box
              key={item.value}
              sx={{
                padding: 1,
                marginRight: 2,
                borderBottom: isActive ? '2px solid' : '',
                cursor: 'pointer',
              }}
              onClick={() => {
                setTab(item.value);
                setFilters((prev) => ({
                  ...prev,
                  type: item.value,
                }));
              }}
            >
              <CommonStyles.Typography sx={{ fontWeight: 'bold' }}>
                {item.label}
              </CommonStyles.Typography>
            </CommonStyles.Box>
          );
        })}
      </CommonStyles.Box>
    );
  };
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
      {renderTab()}
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
