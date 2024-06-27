import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import EachLatestSection from 'components/EachLatestSection';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE, SIZE_ICON_DEFAULT } from 'consts';
import React from 'react';
import ContentOfSectionHorizontal from './ContentOfSectionHorizontal';
import HeaderOfSection from './HeaderOfSection';
import { Order } from 'interfaces/common';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import { NewsType } from 'consts/enum';

const initialValues = {
  search: '',
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: 15,
  order: Order.desc,
  orderBy: '',
  type: NewsType.NEWS,
};

const LatestSection = () => {
  //! State

  const { filters, setFilters, handleResetToInitial, handleSearch } =
    useFiltersHandler(initialValues);

  const { data: resData, isLoading, refetch: refetchListNews } = useGetNewsListHooks(filters);

  const data = resData?.data?.data?.items || [];

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:LatestSection'>
      <HeaderOfSection
        title='Latest'
        subTitle={
          <CommonStyles.Typography className='is-hover' isLink>
            Subscribe
          </CommonStyles.Typography>
        }
      />
      <ContentOfSectionHorizontal>
        {isLoading ? (
          <CommonStyles.Loading />
        ) : (
          data.map((el, ind) => {
            return <EachLatestSection application={el} key={ind} />;
          })
        )}
        {/* <CommonStyles.Box sx={{ alignContent: 'center' }}>
          <CommonIcons.IoArrowForwardOutline size={SIZE_ICON_DEFAULT + 20} />
          <CommonStyles.Typography sx={{ fontSize: 14 }}>Load more</CommonStyles.Typography>
        </CommonStyles.Box> */}
      </ContentOfSectionHorizontal>
    </CommonStyles.Box>
  );
};

export default React.memo(LatestSection);
