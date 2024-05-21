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

const initialValues = {
  search: '',
  page: 0,
  rowsPerPage: 15,
  order: Order.desc,
  orderBy: '',
};

const LatestSection = () => {
  //! State

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

  const SectionMock = [
    { title: 'Convey', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Atomic', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Quote', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Manage', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Reports', subTitle: 'We have update Cases and the way we handle them', href: '/' },
    { title: 'Verify', subTitle: 'We have update Cases and the way we handle them', href: '/' },
  ];

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
