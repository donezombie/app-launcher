import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import { News } from 'interfaces/news';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DialogAddNews from './DialogAddNews';
import ItemNews from './ItemNews';

interface ITab {
  label: string;
  component: string;
}

interface NewsCardProps {
  tabs: ITab[];
  data: News[];
}

const NewsCard = (props: NewsCardProps) => {
  const { tabs, data } = props;
  //! State
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    open: openDialog,
    toggle: toggleDialog,
    shouldRender: shouldRenderDialog,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:NewsCard'>
      <CommonStyles.Button sx={{ mb: 2 }} onClick={toggleDialog}>
        Add News
      </CommonStyles.Button>
      <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {data?.map((item: News, ind: number) => {
          return <ItemNews key={ind} item={item} />;
        })}
      </CommonStyles.Box>
      {shouldRenderDialog && <DialogAddNews isOpen={openDialog} toggle={toggleDialog} />}
    </CommonStyles.Box>
  );
};

export default React.memo(NewsCard);

// <CommonStyles.Box sx={{ pt: 1, display: 'flex', flexDirection: 'column' }}>
// {Object.entries(data)?.map((el, ind) => {
//   const key: string = el[0];
//   const value = el[1];
//   let title = '';
//   switch (key) {
//     case 'old':
//       title = `Yesterday`;
//       break;
//     case 'new':
//       title = `Older`;
//       break;
//   }
//   const isAllRead = value.every((item: INews) => item.read);

//   return (
//     <CommonStyles.Box className='each-News' key={ind}>
//       <CommonStyles.Box
//         sx={{ alignContent: 'center', display: 'flex', justifyContent: 'space-between' }}
//       >
//         <CommonStyles.Typography
//           sx={{
//             color: theme.colors?.text3,
//             textTransform: 'uppercase',
//           }}
//           variant='captionMBold'
//         >
//           {title}
//         </CommonStyles.Typography>

//         {/* {isAllRead && (
//           <CommonStyles.Typography className='is-hover' isLink variant='captionLMedium'>
//             Mark all as read
//           </CommonStyles.Typography>
//         )} */}
//       </CommonStyles.Box>

//       <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
//         {data?.map((item: INews, ind: number) => {
//           return <ItemNews key={ind} item={item} />;
//         })}
//       </CommonStyles.Box>
//     </CommonStyles.Box>
//   );
// })}
// </CommonStyles.Box>
