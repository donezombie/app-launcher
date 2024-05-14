import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';

const Marketplace = () => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  const renderHeader = () => {
    return (
      <CommonStyles.Box
        sx={{ p: 3, backgroundColor: '#d5f2e4', borderRadius: 3 }}
        className='alert-information'
      >
        <CommonStyles.Box sx={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CommonStyles.Typography variant='h5'>Verify 365</CommonStyles.Typography>

          <CommonStyles.Typography
            sx={{ lineHeight: '1.6', color: theme.colors?.grayText, fontSize: '1rem' }}
          >
            Get all your identification check needs all in one place and integrate as part of your
            Convey transaction. Simple enable and order within case.
          </CommonStyles.Typography>

          <CommonStyles.Box>
            <CommonStyles.Button>More Information</CommonStyles.Button>
          </CommonStyles.Box>
        </CommonStyles.Box>
      </CommonStyles.Box>
    );
  };
  return (
    <CommonStyles.Box
      className='component:Marketplace'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      {renderHeader()}

      <CommonStyles.Box>
        <HeadWithSearching title='Market place' onSubmitSearch={() => {}} />
      </CommonStyles.Box>

      <ListApp />
    </CommonStyles.Box>
  );
};

export default Marketplace;
