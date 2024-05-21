import CommonStyles from 'components/CommonStyles';
import NewsCard from './Components/NewsCard';

interface NewsScreenProps {}

const NewsScreen = (props: NewsScreenProps) => {
  //! State
  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Quote'
      sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
    >
      <NewsCard />
    </CommonStyles.Box>
  );
};

export default NewsScreen;
