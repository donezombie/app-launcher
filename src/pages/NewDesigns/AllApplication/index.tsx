import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons, { IconApplication1, IconApplication2 } from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import ContentOfSection from './Components/ContentOfSection';
import EachApplication from 'components/EachApplication';
import {
  NUMBER_DEFAULT_PAGE,
  NUMBER_DEFAULT_ROW_PER_PAGE,
  PERMISSION_ENUM,
  SIZE_ICON_DEFAULT,
} from 'consts';
import { useAuth } from 'providers/AuthenticationProvider';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetListApp, useGetListInstalledApp } from 'hooks/app/useAppHooks';

interface AllApplicationProps {
  onClickClose: () => void;
}

const initialValues = {
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: 999,
  search: '',
};

const AllApplicationDialog = (props: AllApplicationProps) => {
  const { onClickClose } = props;
  //! State

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

  //! Render
  return (
    <CommonStyles.Box sx={{ mx: 10, mt: 4 }}>
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CommonStyles.Typography fontWeight={600} fontSize='1.2rem'>
          All application
        </CommonStyles.Typography>
        <CommonIcons.IoClose
          style={{ cursor: 'pointer' }}
          size={SIZE_ICON_DEFAULT}
          onClick={onClickClose}
        />
      </CommonStyles.Box>
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
    </CommonStyles.Box>
  );
};

export default AllApplicationDialog;
