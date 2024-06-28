import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { NewsType } from 'consts/enum';
import { Field, Form, Formik } from 'formik';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import { News } from 'interfaces/news';
import React, { useMemo } from 'react';
import HeadEachSection from './HeaderOfSection';

const initialValues = {
  search: '',
  page: 0,
  rowsPerPage: 5,
  order: Order.asc,
  orderBy: 'CreatedDate',
  type: NewsType.ACTIVITY,
};

const RecentActivity = () => {
  //! State
  const {
    filters,
    selected,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
  } = useFiltersHandler(initialValues);

  //! Function
  const { data: resData, isLoading } = useGetNewsListHooks(filters);

  const data = resData?.data?.data?.items || [];

  const headCells = [
    {
      label: 'ID',
      id: 'id',
      disableSort: true,
      Cell: (row: News) => {
        return <CommonStyles.Box>{row.id}</CommonStyles.Box>;
      },
    },
    {
      label: 'Thumbnail',
      id: 'thumbnail',
      disableSort: true,
      Cell: (row: News) => {
        return (
          <CommonStyles.Box>
            <CommonStyles.Avatar src={row.thumbUrl} />
          </CommonStyles.Box>
        );
      },
    },
    {
      label: 'Title',
      id: 'title',
      disableSort: true,
      Cell: (row: News) => {
        return <CommonStyles.Box textTransform='uppercase'>{row.title}</CommonStyles.Box>;
      },
    },
    {
      label: 'Body',
      id: 'body',
      disableSort: true,
      Cell: (row: News) => {
        return <CommonStyles.Box>{row.body}</CommonStyles.Box>;
      },
    },
  ];

  //! Render

  const renderSearch = useMemo(() => {
    return (
      <Formik initialValues={{ search: '' }} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <Field
                component={TextField}
                name='search'
                placeholder='Filter for reference...'
                sx={{ minWidth: 500 }}
                iconStartInput={<CommonIcons.Search />}
              />
            </Form>
          );
        }}
      </Formik>
    );
  }, []);

  return (
    <CommonStyles.Box className='component:RecentActivity'>
      <HeadEachSection title='Recent Activity' subTitle={renderSearch} />
      <CommonStyles.Box sx={{ mt: 5 }}>
        {isLoading ? (
          <CommonStyles.Loading />
        ) : (
          <CommonStyles.Table
            order={filters?.order || Order.desc}
            orderBy={filters?.orderBy}
            selected={selected}
            page={filters?.page || 0}
            rowsPerPage={filters?.rowsPerPage || 5}
            headCells={headCells}
            totalCount={10}
            rows={data || []}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleRequestSort={handleRequestSort}
            handleSelectAllClick={handleSelectAllClick}
            noPagination
          />
        )}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(RecentActivity);
