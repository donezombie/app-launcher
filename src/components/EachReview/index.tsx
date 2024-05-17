import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { Rating, useTheme } from '@mui/material';
import { IReview } from 'interfaces/apps';
import { renderReviewTime } from 'helpers';

interface EachReviewProps {
  item: IReview;
}

const EachReview = ({ item }: EachReviewProps) => {
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
          <CommonStyles.Typography variant='bodyMBold'>{item?.title || ''}</CommonStyles.Typography>

          <Rating
            name='size-small'
            defaultValue={item?.rating || 0}
            size='small'
            sx={{ color: theme.colors?.black }}
          />
        </CommonStyles.Box>
        <CommonStyles.Box
          className='each-review__header__author'
          sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, alignItems: 'flex-end' }}
        >
          <CommonStyles.Typography variant='captionLRegular'>
            {renderReviewTime(item.reviewDateUtc || '')}
          </CommonStyles.Typography>
          <CommonStyles.Typography variant='captionLRegular'>
            {item?.username || ''}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Typography
        className='each-review__content'
        component='p'
        sx={{ mt: 1 }}
        variant='captionMRegular'
      >
        {item?.description || ''}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default EachReview;
