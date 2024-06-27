import CommonStyles from 'components/CommonStyles';
import RecentActivityCard from './Components/RecentActivityCard';

interface RecentActivityProps {}

const RecentActivity = (props: RecentActivityProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Quote'
      sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
    >
      <RecentActivityCard />
    </CommonStyles.Box>
  );
};

export default RecentActivity;
