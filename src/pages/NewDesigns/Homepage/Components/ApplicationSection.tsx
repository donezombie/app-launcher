import { Dialog } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import EachApplication from 'components/EachApplication';
import AllApplicationDialog from 'pages/NewDesigns/AllApplication';
import React from 'react';
import ContentOfSection from './ContentOfSection';
import HeaderOfSection from './HeaderOfSection';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE, PERMISSION_ENUM } from 'consts';
import { useGetListApp, useGetListInstalledApp } from 'hooks/app/useAppHooks';
import { IconApplication1, IconApplication2 } from 'components/CommonIcons';
import { useAuth } from 'providers/AuthenticationProvider';

const initialValues = {
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: 10,
  search: '',
};

const ApplicationSection = () => {
  //! State
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const role = user?.roles?.[0] || PERMISSION_ENUM.USER;

  const { filters } = useFiltersHandler(initialValues);
  const { data: resListInstalledApp, isLoading: isInstalledLoading } = useGetListInstalledApp({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });
  const { data: resListApp, isLoading } = useGetListApp({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });
  const dataInstallApp =
    role === PERMISSION_ENUM.ADMIN
      ? resListApp?.data?.items || []
      : resListInstalledApp?.data?.items || [];

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
        {isInstalledLoading || isLoading ? (
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
