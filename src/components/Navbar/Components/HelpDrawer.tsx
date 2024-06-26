import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import Searching from 'components/Searching';
import { Form, Formik } from 'formik';
import ContentOfSectionHorizontal from 'pages/NewDesigns/Homepage/Components/ContentOfSectionHorizontal';
import React from 'react';

const data = [
  {
    label: 'Update 1.5.3',
    value: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    label: 'Local Authority Update',
    value:
      'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  },
  {
    label: 'SDLT Update',
    value:
      'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.',
  },
  {
    label: 'Land Registry',
    value:
      'The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  },
  {
    label: 'Update 1.5.3',
    value:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  },
];

const listTopic = [
  'Create a case',
  'Add product',
  'Create a quote',
  'Find out my case progress',
  'Other feature topic',
];

const listCategories = ['Getting started', 'Using tmgroup platform'];

const HelpDrawer = () => {
  const EachSection = (application: any) => {
    return (
      <CommonStyles.Box
        className='each-application'
        sx={{
          boxShadow:
            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
          padding: 2,
          minWidth: '20rem',
          marginY: 2,
          borderRadius: '10px',
        }}
      >
        <CommonStyles.Typography fontWeight={'bold'}>
          {application.application.label}
        </CommonStyles.Typography>
        <CommonStyles.Typography>{application.application.value}</CommonStyles.Typography>
      </CommonStyles.Box>
    );
  };

  return (
    <CommonStyles.Box role='presentation' sx={{ width: '40vw', paddingTop: '76px' }}>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          padding: '1.5rem',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderLeft: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
        }}
      >
        <CommonStyles.Typography fontWeight={'bold'}>Help</CommonStyles.Typography>
        <CommonIcons.IoHeartOutline size={24} />
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ margin: '1rem 1.5rem' }}>
        <CommonStyles.Typography mb={1}>Find answers quickly</CommonStyles.Typography>
        <Formik initialValues={{ search: '' }} onSubmit={function () {}}>
          {() => {
            return (
              <CommonStyles.Box className='component:HeadWithSearching' sx={{}}>
                <Form>
                  <Searching nameField='search' placeholder={'How can we help?'} fullWidth />
                </Form>
              </CommonStyles.Box>
            );
          }}
        </Formik>
      </CommonStyles.Box>
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
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            position: 'relative',
          }}
        >
          {data.map((el, ind) => {
            return <EachSection application={el} key={ind} />;
          })}
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ marginLeft: '1.5rem' }}>
        <CommonStyles.Typography fontWeight={'bold'}>Explore help topics</CommonStyles.Typography>
        <CommonStyles.Box sx={{ display: 'grid', gap: 0.5, p: 1 }}>
          {listTopic.map((el) => {
            return (
              <CommonStyles.Box key={el} sx={{ display: 'flex', color: '#298784', gap: 1 }}>
                <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CommonIcons.Brightness1OutlinedIcon sx={{ width: '1rem', height: '1rem' }} />
                </CommonStyles.Box>
                <CommonStyles.Typography sx={{ color: '#298784', cursor: 'pointer' }}>
                  {el}
                </CommonStyles.Typography>
              </CommonStyles.Box>
            );
          })}
        </CommonStyles.Box>
        <CommonStyles.Box>
          <CommonStyles.Typography fontWeight={'bold'}>Help categories</CommonStyles.Typography>
          <CommonStyles.Box sx={{ display: 'grid', gap: 0.5, p: 1 }}>
            {listCategories.map((el) => {
              return (
                <CommonStyles.Box key={el} sx={{ display: 'flex', color: '#298784', gap: 1 }}>
                  <CommonStyles.Typography sx={{ color: '#298784', cursor: 'pointer' }}>
                    {el}
                  </CommonStyles.Typography>
                  <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CommonIcons.BookmarkAddOutlinedIcon fontSize='small' />
                  </CommonStyles.Box>
                </CommonStyles.Box>
              );
            })}
          </CommonStyles.Box>
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          paddingY: 4,
          paddingX: '1.5rem',
          borderTop: '1px solid #ccc',
          justifyContent: 'space-between',
        }}
      >
        <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', color: '#298784', gap: 1 }}>
          <CommonStyles.Typography sx={{ color: '#298784', cursor: 'pointer' }}>
            Help requests
          </CommonStyles.Typography>
          <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CommonIcons.BookmarkAddOutlinedIcon fontSize='small' />
          </CommonStyles.Box>
        </CommonStyles.Box>
        <CommonStyles.Box>
          <CommonStyles.Button variant='outlined'>Live chat</CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default HelpDrawer;
