import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import Searching from 'components/Searching';
import BaseUrl from 'consts/baseUrl';
import { SortOrder } from 'consts/enum';
import { Form, Formik } from 'formik';
import { useGetListHelp } from 'hooks/staticPage/useStaticPageHook';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { IStaticPage } from 'interfaces/staticPage';
import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface HelpDrawerProps {
  handleClose: (value: React.SetStateAction<boolean>) => void;
}

const initialValues = {
  page: 1,
  textSearch: '',
  sortOrder: SortOrder.ASC,
  sortField: 'createdAt',
  topic: '',
  category: '',
};

const HelpDrawer: React.FC<HelpDrawerProps> = ({ handleClose }) => {
  const { filters, handleSearch } = useFiltersHandler(initialValues);
  const { data: resListHelp, isLoading } = useGetListHelp(filters);
  const data = useMemo(() => resListHelp?.data?.data?.items || [], [resListHelp]);
  const theme = useTheme();
  const navigate = useNavigate();

  const topics = useMemo(() => {
    const categoryMap: { [key: string]: IStaticPage[] } = {};

    data.forEach((item) => {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = [];
      }
      categoryMap[item.category].push(item);
    });

    return Object.values(categoryMap);
  }, [data]);

  const handleClick = (item: IStaticPage) => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else if (item.description) {
      handleClose(false);
      navigate(BaseUrl.Help.DescriptionHelpWithID(item.id));
    }
  };

  const renderHelp = (el: IStaticPage) => (
    <CommonStyles.Box
      key={el.id}
      sx={{ display: 'flex', color: theme.palette.primary.main, gap: 1 }}
    >
      <CommonStyles.Typography
        sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
        onClick={() => handleClick(el)}
      >
        {el.description}
      </CommonStyles.Typography>
      <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CommonIcons.BookmarkAddOutlinedIcon fontSize='small' />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );

  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box role='presentation' sx={{ width: '40vw', paddingTop: '76px' }}>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          padding: '1.5rem',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderLeft: `1px solid ${theme.colors?.textGray}`,
          borderBottom: `1px solid ${theme.colors?.textGray}`,
        }}
      >
        <CommonStyles.Typography fontWeight={'bold'}>Help</CommonStyles.Typography>
        <CommonIcons.IoHeartOutline size={24} />
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ margin: '1rem 1.5rem' }}>
        <CommonStyles.Typography mb={1}>Find answers quickly</CommonStyles.Typography>
        <Formik initialValues={{ search: '' }} onSubmit={(values) => handleSearch(values.search)}>
          <Form>
            <Searching nameField='search' placeholder='How can we help?' fullWidth />
          </Form>
        </Formik>
      </CommonStyles.Box>
      {!isEmpty(topics[0]) && (
        <CommonStyles.Box mt={2}>
          <CommonStyles.Typography fontWeight={'bold'} sx={{ marginLeft: '1.5rem' }}>
            Discover more
          </CommonStyles.Typography>
          <CommonStyles.Box
            sx={{
              p: 1,
              display: 'flex',
              gap: 2,
              ml: 1,
              flexWrap: 'nowrap',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {topics[0]?.map((el) => (
              <CommonStyles.Box
                key={el.id}
                sx={{
                  boxShadow:
                    'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                  padding: 2,
                  minWidth: '20rem',
                  marginY: 2,
                  borderRadius: '10px',
                }}
              >
                <CommonStyles.Typography fontWeight={'bold'}>{el.title}</CommonStyles.Typography>
                <CommonStyles.Typography>{el.body}</CommonStyles.Typography>
              </CommonStyles.Box>
            ))}
          </CommonStyles.Box>
        </CommonStyles.Box>
      )}
      <CommonStyles.Box sx={{ marginLeft: '1.5rem' }}>
        {!isEmpty(topics[1]) && (
          <>
            <CommonStyles.Typography fontWeight={'bold'}>
              Explore help topics
            </CommonStyles.Typography>
            <CommonStyles.Box sx={{ display: 'grid', gap: 0.5, p: 1 }}>
              {topics[1]?.map(renderHelp)}
            </CommonStyles.Box>
          </>
        )}
        {!isEmpty(topics[2]) && (
          <CommonStyles.Box>
            <CommonStyles.Typography fontWeight={'bold'}>Help categories</CommonStyles.Typography>
            <CommonStyles.Box sx={{ display: 'grid', gap: 0.5, p: 1 }}>
              {topics[2]?.map(renderHelp)}
            </CommonStyles.Box>
          </CommonStyles.Box>
        )}
        {Object.keys(topics)
          .slice(3)
          ?.map((topicKey) => {
            const newTopic = topics[topicKey as keyof typeof topics] as IStaticPage[];
            return (
              <CommonStyles.Box key={topicKey}>
                <CommonStyles.Typography fontWeight={'bold'}>
                  {newTopic[0]?.category}
                </CommonStyles.Typography>
                <CommonStyles.Box sx={{ display: 'grid', gap: 0.5, p: 1 }}>
                  {newTopic?.map(renderHelp)}
                </CommonStyles.Box>
              </CommonStyles.Box>
            );
          })}
      </CommonStyles.Box>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          paddingY: 4,
          paddingX: '1.5rem',
          borderTop: `1px solid ${theme.colors?.textGray}`,
          justifyContent: 'space-between',
          mt: 1,
        }}
      >
        <CommonStyles.Box
          sx={{ display: 'flex', alignItems: 'center', color: theme.palette.primary.main, gap: 1 }}
        >
          <CommonStyles.Typography sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}>
            Help requests
          </CommonStyles.Typography>
          <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CommonIcons.BookmarkAddOutlinedIcon fontSize='small' />
          </CommonStyles.Box>
        </CommonStyles.Box>
        <CommonStyles.Button variant='outlined'>Live chat</CommonStyles.Button>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default HelpDrawer;
