import { Dialog } from '@mui/material';
import { IconApplication1, IconApplication2 } from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import EachApplication from 'components/EachApplication';
import { AppStatus } from 'consts/enum';
import { filterAppType } from 'helpers';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import AllApplicationDialog from 'pages/NewDesigns/AllApplication';
import { useAuth } from 'providers/AuthenticationProvider';
import React, { useMemo } from 'react';
import ContentOfSection from './ContentOfSection';
import HeaderOfSection from './HeaderOfSection';

const initialValues = {
  page: 1,
  perPage: 10,
  textSearch: '',
  isLive: true,
  status: AppStatus.APPROVED,
};

const ApplicationSection = () => {
  //! State
  const [open, setOpen] = React.useState(false);
  const { isAdmin } = useAuth();

  const { filters } = useFiltersHandler(initialValues);
  const { data: resListApp, isLoading } = useGetListApp({
    ...filters,
    canAccess: isAdmin ? null : true,
    type: filterAppType,
  });
  const dataInstallApp =
    useMemo(() => {
      return resListApp?.data?.data?.items;
    }, [resListApp]) || [];

  //! Function
  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //! Render
  return (
    <CommonStyles.Box className='component:ApplicationSection'>
      <HeaderOfSection
        title='Applications'
        subTitle={
          <CommonStyles.Typography className='is-hover' isLink onClick={handleClickOpen}>
            Show all products
          </CommonStyles.Typography>
        }
      />

      <ContentOfSection>
        {isLoading ? (
          <CommonStyles.Loading />
        ) : (
          dataInstallApp
            .map((el, index) => ({
              label: el.name,
              href: el.launchUri,
              idApp: el.id,
              icon: index % 2 === 0 ? IconApplication1 : IconApplication2,
            }))
            .map((el) => {
              return <EachApplication key={el.label} application={el} />;
            })
        )}
      </ContentOfSection>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AllApplicationDialog onClickClose={handleClose} />
      </Dialog>
    </CommonStyles.Box>
  );
};

export default React.memo(ApplicationSection);
