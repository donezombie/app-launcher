import { Rating, useTheme } from '@mui/material';
import ButtonBack from 'components/ButtonBack';
import CommonStyles from 'components/CommonStyles';
import EachReview from 'components/EachReview';
import HeadWithSearching from 'components/HeadWithSearching';
import BaseUrl from 'consts/baseUrl';
import { convertStringToArrayWithComma } from 'helpers';
import { useGetAppIntegrationDetail } from 'hooks/app/useAppHooks';
import Launcher from 'pages/Launcher';
import { useTabHandler } from 'providers/TabHandlerProvider';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InfoAppReport = () => {
  //! State
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNewTab } = useTabHandler();
  const { data: resDetailApp, isLoading: isLoadingApp } = useGetAppIntegrationDetail(id || '');

  const detailData = useMemo(() => {
    return resDetailApp?.data?.data;
  }, [resDetailApp]);
  const tagsData = convertStringToArrayWithComma(detailData?.tags || '');
  const reviewsData = detailData?.reviews || [];
  //! Function

  const onClickLaunch = () => {
    const url = encodeURIComponent(detailData.launchUri);
    navigate(BaseUrl.Launcher.AppWithdDetail(url, detailData.id));

    addNewTab({
      label: detailData?.name || '',
      value: detailData?.id || '',
      content: <Launcher idApp={detailData?.id} launchUri={detailData?.launchUri} />,
      openNewTab: true,
    });

    if (!location.pathname.includes(BaseUrl.AppManagement)) {
      navigate(BaseUrl.AppManagement);
    }
  };

  //! Render
  const renderAction = () => {
    return (
      <CommonStyles.Box>
        <CommonStyles.Button onClick={onClickLaunch}>Launch</CommonStyles.Button>
      </CommonStyles.Box>
    );
  };

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
        <img src={detailData?.icon || ''} alt='example-logo-app' />
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
          {detailData?.name || ''}
        </CommonStyles.Typography>
        <CommonStyles.Typography
          className='feature__card__information__description'
          variant='captionLRegular'
          component='p'
          sx={{ color: theme.colors?.text2, mb: 2.5 }}
        >
          {detailData?.summary || ''}
        </CommonStyles.Typography>
        <CommonStyles.Typography
          isLink
          className='feature__card__information__website is-hover'
          variant='captionLMedium'
        >
          <a href={detailData?.homepage} target='_blank' className='unstyle-link' rel='noreferrer'>
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
          <CommonStyles.Typography>{detailData?.avgerageRating || 0}</CommonStyles.Typography>
          <Rating
            name='size-small'
            defaultValue={detailData?.avgerageRating || 0}
            size='small'
            sx={{ color: theme.colors?.black }}
          />
        </CommonStyles.Box>

        {renderAction()}

        <CommonStyles.Box
          className='feature__card__review__badge'
          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
        >
          {tagsData.map((el) => (
            <CommonStyles.Badge key={el}>{el}</CommonStyles.Badge>
          ))}
        </CommonStyles.Box>
      </CommonStyles.Box>
    );
  };

  if (isLoadingApp) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box
      className='component:InfoAppReport'
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
          <CommonStyles.Typography>{detailData?.description}</CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box className='info-app__reviews'>
        <HeadWithSearching title='Reviews' />

        <CommonStyles.Box sx={{ mt: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {reviewsData.map((el: any) => {
            return <EachReview item={el} key={el.title} />;
          })}
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default InfoAppReport;
