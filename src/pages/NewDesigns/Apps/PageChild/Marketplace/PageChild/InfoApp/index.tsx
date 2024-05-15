import CommonStyles from 'components/CommonStyles';
import ButtonBack from 'components/ButtonBack';
import { Rating, useTheme } from '@mui/material';
import HeadWithSearching from 'components/HeadWithSearching';
import exampleLogoApp from 'assets/example-img-app.png';
import preview1 from 'assets/preview1.png';
import preview2 from 'assets/preview2.png';
import EachReview from 'components/EachReview';

const InfoApp = () => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  const renderImage = () => {
    return (
      <CommonStyles.Box
        className='feature__card__img'
        sx={{
          width: 170,
          height: '100%',
          '& img': { width: '100%', height: '100%', objectFit: 'cover' },
        }}
      >
        <img src={exampleLogoApp} alt='example-logo-app' />
      </CommonStyles.Box>
    );
  };

  const renderInformation = () => {
    return (
      <CommonStyles.Box className='feature__card__information' sx={{ p: 3 }}>
        <CommonStyles.Typography
          className='feature__card__information__name'
          variant='h6Bold'
          component='p'
          sx={{ mb: 1 }}
        >
          LMS Integration
        </CommonStyles.Typography>
        <CommonStyles.Typography
          className='feature__card__information__description'
          variant='captionLRegular'
          component='p'
          sx={{ color: theme.colors?.text2, mb: 2.5 }}
        >
          Simply, easily, efficiently. We’ve created a solution that streamlines a range of
          essential LMS products and services and embeds them within your case management system.
        </CommonStyles.Typography>
        <CommonStyles.Typography
          isLink
          className='feature__card__information__website is-hover'
          variant='captionLMedium'
        >
          <a href={'https://google.com'} target='_blank' className='unstyle-link' rel='noreferrer'>
            Website
          </a>
        </CommonStyles.Typography>
      </CommonStyles.Box>
    );
  };

  const renderReview = () => {
    return (
      <CommonStyles.Box
        className='feature__card__review'
        sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CommonStyles.Typography>4.8</CommonStyles.Typography>
          <Rating
            name='size-small'
            defaultValue={4.8}
            size='small'
            sx={{ color: theme.colors?.black }}
          />
        </CommonStyles.Box>

        <CommonStyles.Box>
          <CommonStyles.Button>Install</CommonStyles.Button>
        </CommonStyles.Box>

        <CommonStyles.Box
          className='feature__card__review__badge'
          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
        >
          {['API1', 'iOS', 'Integration'].map((el) => (
            <CommonStyles.Badge key={el}>{el}</CommonStyles.Badge>
          ))}
        </CommonStyles.Box>
      </CommonStyles.Box>
    );
  };

  return (
    <CommonStyles.Box
      className='component:InfoApp'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <ButtonBack />

      <CommonStyles.Box
        className='feature__card'
        sx={{
          display: 'grid',
          gridTemplateColumns: '170px 2fr 250px',
          borderRadius: 2,
          border: `1px solid ${theme?.colors?.borderBaseAlpha}`,
        }}
      >
        {renderImage()}
        {renderInformation()}
        {renderReview()}
      </CommonStyles.Box>

      <CommonStyles.Box className='info-app__preview'>
        <HeadWithSearching title='Preview' />

        <CommonStyles.Box
          sx={{
            mt: 2.5,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 3,
            '& img': {
              width: '100%',
              borderRadius: 2,
            },
          }}
        >
          <img src={preview1} />
          <img src={preview2} />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box className='info-app__reviews'>
        <HeadWithSearching title='Reviews' />

        <CommonStyles.Box sx={{ mt: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <EachReview />
          <EachReview />
          <EachReview />
          <EachReview />
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default InfoApp;
