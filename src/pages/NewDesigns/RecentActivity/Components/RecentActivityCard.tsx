import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { Order } from 'interfaces/common';
import { NewsType } from 'consts/enum';
import { upperFirst } from 'lodash';
import useToggleDialog from 'hooks/useToggleDialog';
import useFiltersHandler from 'hooks/useFiltersHandler';
import HeadWithSearching from 'components/HeadWithSearching';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import ItemNews from 'pages/NewDesigns/News/Components/ItemNews';
import DialogAddNews from 'pages/NewDesigns/News/Components/DialogAddNews';
import { News } from 'interfaces/news';

interface RecentActivityCardProps {}

const initialValues = {
  extSearch: '',
  page: 0,
  perPage: 15,
  sortOrder: Order.desc,
  sortField: '',
  type: NewsType.ACTIVITY,
};

const tabs = [
  {
    label: upperFirst(NewsType.ACTIVITY.toLocaleLowerCase()),
    value: NewsType.ACTIVITY,
  },
];

const RecentActivityCard = (props: RecentActivityCardProps) => {
  const { filters, setFilters, handleResetToInitial, handleSearch } =
    useFiltersHandler(initialValues);

  const { data: resData, isLoading, refetch: refetchListNews } = useGetNewsListHooks(filters);

  const data = resData?.data?.data?.items || [];

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
        <CommonStyles.Box
          key={tabs[0].value}
          sx={{
            padding: 1,
            marginRight: 2,
            borderBottom: '2px solid',
            cursor: 'pointer',
          }}
        >
          <CommonStyles.Typography sx={{ fontWeight: 'bold' }}>
            {tabs[0].label}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>
    );
  };

  //! Render
  return (
    <CommonStyles.Box className='component:RecentActivityCard'>
      <HeadWithSearching
        title='Recent Activity'
        onSubmitSearch={({ search }) => {
          handleSearch(search);
        }}
        placeholder='Search Recent Activity...'
      />
      <CommonStyles.Button sx={{ mb: 2 }} onClick={toggleDialog}>
        Add Recent Activity
      </CommonStyles.Button>
      {renderTab()}
      <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {isLoading ? (
          <CommonStyles.Loading />
        ) : (
          data?.map((item: News, ind: number) => {
            return <ItemNews key={ind} item={item} isRecent />;
          })
        )}
      </CommonStyles.Box>
      {shouldRenderDialog && <DialogAddNews isRecent isOpen={openDialog} toggle={toggleDialog} />}
    </CommonStyles.Box>
  );
};

export default RecentActivityCard;
