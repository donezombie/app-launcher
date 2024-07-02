import CommonIcons, { IconApplication1, IconApplication2 } from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import EachApplication from 'components/EachApplication';
import { SIZE_ICON_DEFAULT } from 'consts';
import { AppStatus } from 'consts/enum';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useAuth } from 'providers/AuthenticationProvider';
import { useMemo } from 'react';
import ContentOfSection from './Components/ContentOfSection';
import { filterAppType } from 'helpers';
import HeadWithSearching from 'components/HeadWithSearching';

interface AllApplicationProps {
  onClickClose: () => void;
  textSearch?: string;
}

const initialValues = {
  isLive: true,
  status: AppStatus.APPROVED,
  type: filterAppType,
};

const AllApplicationDialog = (props: AllApplicationProps) => {
  const { onClickClose, textSearch } = props;

  //! State
  const { isAdmin } = useAuth();
  const { filters, setFilters } = useFiltersHandler(initialValues);
  const { data: resListApp, isLoading } = useGetListApp({
    ...filters,
    canAccess: isAdmin ? null : true,
    textSearch: textSearch || '',
  });
  const dataInstallApp =
    useMemo(() => {
      return resListApp?.data?.data?.items;
    }, [resListApp]) || [];

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
      <CommonStyles.Box mt={2}>
        <HeadWithSearching
          onSubmitSearch={({ search }) => {
            setFilters((prev) => ({
              ...prev,
              textSearch: search,
            }));
          }}
        />
      </CommonStyles.Box>
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
              return (
                <EachApplication key={el.label} application={el} onClickClose={onClickClose} />
              );
            })
        )}
      </ContentOfSection>
    </CommonStyles.Box>
  );
};

export default AllApplicationDialog;
