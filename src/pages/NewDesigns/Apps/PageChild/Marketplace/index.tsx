import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import ListApp from 'components/ListApp';
import bannerImage from 'assets/banner.png';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useGetAppStore } from 'hooks/app/useAppHooks';
import { NUMBER_DEFAULT_PAGE, NUMBER_DEFAULT_ROW_PER_PAGE } from 'consts';

const initialValues = {
  page: NUMBER_DEFAULT_PAGE,
  rowsPerPage: 999,
  search: '',
};

const Marketplace = () => {
  //! State
  const theme = useTheme();
  const { filters, handleSearch } = useFiltersHandler(initialValues);

  const { data: resList, isLoading: isLoadingList } = useGetAppStore({
    skip:
      (filters?.page || NUMBER_DEFAULT_PAGE) *
      (filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE),
    take: filters?.rowsPerPage || NUMBER_DEFAULT_ROW_PER_PAGE,
    filter: filters?.search,
  });
  const data = resList?.data?.items || [];

  //! Function

  //! Render
  const renderHeader = () => {
    return (
      <CommonStyles.Box
        sx={{
          p: 3,
          backgroundColor: '#d5f2e4',
          borderRadius: 1.5,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
        className='alert-information'
      >
        <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

        <CommonStyles.Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            '& img': {
              position: 'absolute',
              width: 340,
              top: -40,
            },
          }}
        >
          <img src={bannerImage} />
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
        <HeadWithSearching
          title='Market place'
          onSubmitSearch={({ search }) => {
            handleSearch(search);
          }}
        />
      </CommonStyles.Box>

      {isLoadingList ? <CommonStyles.Loading /> : <ListApp apps={data} />}
    </CommonStyles.Box>
  );
};

export default Marketplace;
