import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import React from 'react';

interface ItemNewsProps {
  item: any;
}

const sizeAva = 36;
const ItemNews = (props: ItemNewsProps) => {
  const { item } = props;
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', my: 2, px: '12px' }}>
      <CommonStyles.Avatar src={item?.thumbUrl} sx={{ width: sizeAva, height: sizeAva }} />
      <CommonStyles.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 2,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <CommonStyles.Box maxWidth={250}>
          <CommonStyles.Typography sx={{ flexShrink: 1 }} variant='body2' component='h3'>
            {item.title}
          </CommonStyles.Typography>
          <CommonStyles.Typography
            variant='captionMRegular'
            sx={{ color: theme.colors?.text2 }}
            component='h2'
          >
            {item?.body}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(ItemNews);
