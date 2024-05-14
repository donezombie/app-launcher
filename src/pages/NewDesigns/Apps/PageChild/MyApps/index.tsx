import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';

const MyApps = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Quote'
      sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
    >
      <HeadWithSearching title='My Apps' onSubmitSearch={() => {}} placeholder='Search App...' />

      <ListApp isInstalled />
    </CommonStyles.Box>
  );
};

export default MyApps;
