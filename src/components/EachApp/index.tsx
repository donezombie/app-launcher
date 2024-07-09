import { Image } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { IconApplication1, IconApplication2 } from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import SwitchField from 'components/CustomFields/SwitchField';
import { queryKeys } from 'consts';
import BaseUrl from 'consts/baseUrl';
import { AppStatus, UserAppStatus } from 'consts/enum';
import { Field, Formik, FormikValues } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useCreateApproval, useSetLiveApp, useUninstallApp } from 'hooks/app/useAppHooks';
import useToggleDialog from 'hooks/useToggleDialog';
import { NewApp } from 'interfaces/apps';
import DialogListRequesting from 'pages/Apps/Dialogs/DialogListRequesting';
import Launcher from 'pages/Launcher';
import { useAuth } from 'providers/AuthenticationProvider';
import { useTabHandler } from 'providers/TabHandlerProvider';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface EachAppProps {
  item: NewApp;
  isMyApps?: boolean;
  isYourApp?: boolean;
  ind: number;
  isReport?: boolean;
}

const EachApp = ({
  item,
  isMyApps = false,
  isYourApp = false,
  ind,
  isReport = false,
}: EachAppProps) => {
  //! State
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: uninstallApp } = useUninstallApp();
  const { mutateAsync: createRequest } = useCreateApproval();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { addNewTab } = useTabHandler();
  const { mutateAsync: setLiveApp } = useSetLiveApp();
  const { user, isUser } = useAuth();
  const isAccess =
    item.typeAccessApp === UserAppStatus.ACCESS ||
    item.ownerUserId === user?.id ||
    (!isUser && isReport);
  const isRequesing = item.typeAccessApp === UserAppStatus.REQUEST;
  const isApproved = item.status === AppStatus.APPROVED;
  const { addNewTab } = useTabHandler();
  const location = useLocation();

  //! Function
  const onClickUninstall = async () => {
    return;
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

  const onClickLaunch = () => {
    const url = encodeURIComponent(item.launchUri);
    isReport
      ? navigate(BaseUrl.Launcher.AppWithdDetail(url))
      : navigate(BaseUrl.Launcher.AppWithdDetail(item.launchUri, item.id));
    addNewTab({
      label: item.name,
      value: item.id,
      content: <Launcher idApp={item.id} launchUri={item.launchUri} />,
      openNewTab: true,
    });

    if (!location.pathname.includes(BaseUrl.AppManagement)) {
      navigate(BaseUrl.AppManagement);
    }
  };

  const onClickRequestAccess = async () => {
    try {
      setLoading(true);
      await createRequest(item?.id);
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
    if (isYourApp) {
      const {
        open: openRequesting,
        toggle: toggleRequesting,
        shouldRender: shoulRenderRequesting,
      } = useToggleDialog();
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <Link
            to={
              isReport
                ? BaseUrl.MyReport.DetailWithID(item.id || '')
                : BaseUrl.MyApps.DetailWithID(item.id || '')
            }
          >
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

    if (isAccess) {
      return (
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <CommonStyles.Button loading={loading} onClick={onClickLaunch}>
            Launch
          </CommonStyles.Button>

          <Link
            to={
              isReport
                ? BaseUrl.ReportApp.InfoWithID(item.id || '')
                : BaseUrl.Marketplace.InfoWithID(item.id || '')
            }
          >
            <CommonStyles.Button variant='outlined'>More Infomation</CommonStyles.Button>
          </Link>
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

    if (isRequesing) {
      return (
        <CommonStyles.Box sx={{ display: 'flex' }}>
          <CommonStyles.Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div
              style={{
                height: '1rem',
                width: '1rem',
                borderRadius: '10px',
                backgroundColor: 'yellow',
                marginRight: '0.5rem',
              }}
            />
          </CommonStyles.Box>
          <CommonStyles.Typography>Waiting Access</CommonStyles.Typography>
        </CommonStyles.Box>
      );
    }

    return (
      <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
        <CommonStyles.Button loading={loading} onClick={onClickRequestAccess}>
          Request Access
        </CommonStyles.Button>

        <Link
          to={
            isReport
              ? BaseUrl.ReportApp.InfoWithID(item.id || '')
              : BaseUrl.Marketplace.InfoWithID(item.id || '')
          }
        >
          <CommonStyles.Button variant='outlined'>More Infomation</CommonStyles.Button>
        </Link>
      </CommonStyles.Box>
    );
  };

  const handleSubmit = async (
    values: FormikValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      setSubmitting(true);
      await setLiveApp({
        appId: item?.id || '',
        isAlive: !item.isLive,
      });

      if (!values.isAlive) {
        showSuccess(`Active [${item.name}] successfully!`);
      } else {
        showSuccess(`InActive [${item.name}] successfully!`);
      }
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      showError(error);
    }
  };

  return (
    <Formik
      initialValues={{ isAlive: item.isLive }}
      onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
      enableReinitialize
    >
      {({ values, setSubmitting, isSubmitting }) => {
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
            {!item.icon ? (
              <>
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
              </>
            ) : (
              <CommonStyles.Box className='each-app__left'>
                <CommonStyles.Box
                  className='each-application__logo'
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    boxShadow: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src={item.icon} alt='image' style={{ width: '100%', height: '100%' }} />
                </CommonStyles.Box>
              </CommonStyles.Box>
            )}
            <CommonStyles.Box
              className='each-app__right'
              sx={{ display: 'flex', gap: 2, flexDirection: 'column', flexGrow: 1 }}
            >
              <CommonStyles.Box
                className='each-app__right__title'
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <CommonStyles.Typography variant='h5'>{item.name}</CommonStyles.Typography>
                {!isUser && (
                  <Field
                    component={SwitchField}
                    name='isAlive'
                    afterOnChange={() => {
                      handleSubmit(values, setSubmitting);
                    }}
                    disabled={!(isApproved && item?.ownerUserId === user?.id)}
                    loading={isSubmitting}
                  />
                )}
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
