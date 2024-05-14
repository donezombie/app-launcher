import CommonStyles from 'components/CommonStyles';
import ButtonBack from 'components/ButtonBack';
import AppAuthentication from './Tabs/AppAuthentication';
import AppInformation from './Tabs/AppInformation';

const MyAppDetail = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:MyAppDetail'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <ButtonBack />

      <CommonStyles.Tabs
        tabs={[
          {
            label: 'App Authentication',
            component: AppAuthentication,
          },
          {
            label: 'App Information',
            component: AppInformation,
          },
        ]}
      />
    </CommonStyles.Box>
  );
};

export default MyAppDetail;
