import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import { Field, Formik } from 'formik';
import { App } from 'interfaces/apps';
import SwitchField from 'components/CustomFields/SwitchField';
import { Link, useNavigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';
import { useMemo, useState } from 'react';
import { useCreateApproval, useInstallApp, useUninstallApp } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { showError, showSuccess } from 'helpers/toast';
import { queryKeys } from 'consts';
import Launcher from 'pages/Launcher';
import { useTabHandler } from 'providers/TabHandlerProvider';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogListRequesting from 'pages/Apps/Dialogs/DialogListRequesting';
import { IconApplication1, IconApplication2 } from 'components/CommonIcons';

interface EachAppProps {
  item: App;
  isMyApps?: boolean;
  isYourApp?: boolean;
  ind: number;
}

const EachApp = ({ item, isMyApps = false, isYourApp = false, ind }: EachAppProps) => {
  //! State
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: uninstallApp } = useUninstallApp();
  const { mutateAsync: installApp } = useInstallApp();
  const { mutateAsync: createRequest } = useCreateApproval();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { addNewTab } = useTabHandler();

  //! Function
  const onClickUninstall = async () => {
    try {
      setLoading(true);
      await uninstallApp({ id: item?.id });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppInstalledList] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

      showSuccess('Uninstall app successfully!');
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  const onClickInstall = async () => {
    try {
      setLoading(true);
      await installApp({ id: item?.id });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppInstalledList] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppStore] });

      showSuccess('Install app successfully!');
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  const onClickLaunch = () => {
    navigate(BaseUrl.Launcher.AppWithdDetail(item.launchUri, item.id));
    // addNewTab({
    //   label: item.name,
    //   value: item.id,
    //   content: <Launcher idApp={item.id} launchUri={item.launchUri} />,
    //   openNewTab: true,
    // });

    // if (!location.pathname.includes(BaseUrl.AppManagement)) {
    //   navigate(BaseUrl.AppManagement);
    // }
  };

  const onClickRequestAccess = async () => {
    try {
      setLoading(true);
      await createRequest({ appId: item?.id });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppStore] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

      showSuccess('Request access successfully!');
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  //! Render
  const checkIcon = ind % 2 === 0 ? IconApplication1 : IconApplication2;
  const renderActions = () => {
    // if (item.isYourApp) {
    //   return <CommonStyles.Button sx={{ width: 'fit-content' }}>Manage</CommonStyles.Button>;
    // }

    if (isYourApp) {
      const {
        open: openRequesting,
        toggle: toggleRequesting,
        shouldRender: shoulRenderRequesting,
      } = useToggleDialog();
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <Link to={BaseUrl.MyApps.DetailWithID(item.id || '')}>
            <CommonStyles.Button>Edit</CommonStyles.Button>
          </Link>
          <CommonStyles.Button variant='outlined' loading={loading} onClick={toggleRequesting}>
            Requesting App
          </CommonStyles.Button>

          {shoulRenderRequesting && (
            <DialogListRequesting
              isOpen={openRequesting}
              toggle={toggleRequesting}
              appId={item.id}
            />
          )}
        </CommonStyles.Box>
      );
    }

    if (isMyApps) {
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <CommonStyles.Button loading={loading} onClick={onClickLaunch}>
            Launch
          </CommonStyles.Button>
          <CommonStyles.Button variant='outlined' loading={loading} onClick={onClickUninstall}>
            Uninstall
          </CommonStyles.Button>
        </CommonStyles.Box>
      );
    }

    if (item.isInstalled) {
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <CommonStyles.Button loading={loading} onClick={onClickLaunch}>
            Launch
          </CommonStyles.Button>

          <Link to={BaseUrl.Marketplace.InfoWithID(item.id || '')}>
            <CommonStyles.Button variant='outlined'>More Infomation</CommonStyles.Button>
          </Link>
        </CommonStyles.Box>
      );
    }

    if (item.isApproved) {
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <CommonStyles.Button loading={loading} onClick={onClickInstall}>
            Install
          </CommonStyles.Button>

          <Link to={BaseUrl.Marketplace.InfoWithID(item.id || '')}>
            <CommonStyles.Button variant='outlined'>More Infomation</CommonStyles.Button>
          </Link>
        </CommonStyles.Box>
      );
    }

    if (!item.isAssigned) {
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <CommonStyles.Button loading={loading} onClick={onClickRequestAccess}>
            Request Access
          </CommonStyles.Button>
        </CommonStyles.Box>
      );
    }

    return (
      <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
        <CommonStyles.Button loading={loading} onClick={onClickInstall}>
          Install
        </CommonStyles.Button>

        <Link to={BaseUrl.Marketplace.InfoWithID(item.id || '')}>
          <CommonStyles.Button variant='outlined'>More Infomation</CommonStyles.Button>
        </Link>
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
                className='each-application__logo'
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2,
                  boxShadow: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {checkIcon}
                <CommonStyles.Box
                  className='each-application__overlay'
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    transition: '.3s',
                  }}
                />
              </CommonStyles.Box>
            </CommonStyles.Box>
            <CommonStyles.Box
              className='each-app__right'
              sx={{ display: 'flex', gap: 2, flexDirection: 'column', flexGrow: 1 }}
            >
              <CommonStyles.Box
                className='each-app__right__title'
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <CommonStyles.Typography variant='h5'>{item.name}</CommonStyles.Typography>
                {item.isLive && <Field component={SwitchField} name='active' />}
              </CommonStyles.Box>

              <CommonStyles.Typography variant='body2' sx={{ color: theme.colors?.grayText }}>
                {item.summary}
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
