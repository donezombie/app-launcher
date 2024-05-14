import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import { Field, Formik } from 'formik';
import { IApp } from 'interfaces/apps';
import SwitchField from 'components/CustomFields/SwitchField';
import { Link } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

interface EachAppProps {
  item: IApp;
}

const EachApp = ({ item }: EachAppProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  const renderActions = () => {
    if (item.isYourApp) {
      return <CommonStyles.Button sx={{ width: 'fit-content' }}>Manage</CommonStyles.Button>;
    }

    if (item.isInstalled) {
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <Link to={BaseUrl.MyApps.DetailWithID(item.id || '')}>
            <CommonStyles.Button>Edit</CommonStyles.Button>
          </Link>
          <CommonStyles.Button variant='outlined'>Uninstall</CommonStyles.Button>
        </CommonStyles.Box>
      );
    }

    return (
      <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
        <CommonStyles.Button>Install</CommonStyles.Button>
        <CommonStyles.Button variant='outlined'>More Infomation</CommonStyles.Button>
      </CommonStyles.Box>
    );
  };

  return (
    <Formik initialValues={{ active: true }} onSubmit={() => {}}>
      {() => {
        return (
          <CommonStyles.Box
            className='component:EachApp'
            sx={{
              display: 'flex',
              border: '1px solid',
              borderColor: theme.colors?.border,
              borderRadius: 4,
              p: 2,
              pl: 3,
              gap: 5,
              alignItems: 'center',
            }}
          >
            <CommonStyles.Box className='each-app__left'>
              <CommonStyles.Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: 2,
                  background:
                    'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
                }}
              />
            </CommonStyles.Box>
            <CommonStyles.Box
              className='each-app__right'
              sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}
            >
              <CommonStyles.Box
                className='each-app__right__title'
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <CommonStyles.Typography variant='h5'>{item.title}</CommonStyles.Typography>
                {item.isInstalled && <Field component={SwitchField} name='active' />}
              </CommonStyles.Box>

              <CommonStyles.Typography variant='body2' sx={{ color: theme.colors?.grayText }}>
                {item.description}
              </CommonStyles.Typography>

              {renderActions()}
            </CommonStyles.Box>
          </CommonStyles.Box>
        );
      }}
    </Formik>
  );
};

export default EachApp;
