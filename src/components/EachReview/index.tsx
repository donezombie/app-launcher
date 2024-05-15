import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { Rating, useTheme } from '@mui/material';

interface EachReviewProps {}

const EachReview = (props: EachReviewProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:EachReview'
      sx={{ padding: 3, borderRadius: 2, border: `1px solid ${theme.colors?.borderBaseAlpha}` }}
    >
      <CommonStyles.Box
        className='each-review__header'
        sx={{ display: 'grid', gridTemplateColumns: '1fr 120px' }}
      >
        <CommonStyles.Box
          className='each-review__header__title'
          sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}
        >
          <CommonStyles.Typography variant='bodyMBold'>
            Best e signature app but could be
          </CommonStyles.Typography>

          <Rating
            name='size-small'
            defaultValue={4.8}
            size='small'
            sx={{ color: theme.colors?.black }}
          />
        </CommonStyles.Box>
        <CommonStyles.Box
          className='each-review__header__author'
          sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}
        >
          <CommonStyles.Typography variant='captionLRegular'>2d ago</CommonStyles.Typography>
          <CommonStyles.Typography variant='captionLRegular'>vhampton</CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Typography
        className='each-review__content'
        component='p'
        sx={{ mt: 1 }}
        variant='captionMRegular'
      >
        e-sign is the most popular e signature choice because it just works, its intuitive, comes
        with extensive features and works seamlessly with tmgroup products. you dont have to worry
        about it breaking and you can freely sign any time.
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default EachReview;
