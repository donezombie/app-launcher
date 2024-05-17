import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import EachItemSidebar from './EachItemSidebar';
import { uniqueId } from 'lodash';
import CommonIcons from 'components/CommonIcons';
import BaseUrl from 'consts/baseUrl';

const Sidebar = () => {
  //! State
  const theme = useTheme();
  const items = [
    {
      id: uniqueId('side-bar'),
      label: 'Marketplace',
      icon: CommonIcons.BagHandleIcon,
      path: BaseUrl.Marketplace.Index,
      children: [
        {
          label: 'Products',
          path: BaseUrl.Marketplace.Products,
        },
        {
          label: 'Integrations',
          path: '/apps/marketplace/integrations',
        },
        {
          label: 'Quote',
          path: BaseUrl.Marketplace.Quote,
        },
        {
          label: 'Search Ordering',
          path: '/apps/marketplace/search-ordering',
        },
      ],
    },
    {
      id: uniqueId('side-bar'),
      label: 'My Apps',
      icon: CommonIcons.SparkesIcon,
      path: BaseUrl.MyApps.Index,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Settings',
      icon: CommonIcons.SettingsIcon,
      path: BaseUrl.Setting.Index,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Develop',
      icon: CommonIcons.SparkesIcon,
      path: BaseUrl.Develop.Index,
      children: [
        {
          label: 'Upload App',
          path: BaseUrl.Develop.UploadApps,
        },
        {
          label: 'Manage Your Apps',
          path: BaseUrl.Develop.ManageYourApps,
        },
      ],
    },
    {
      id: uniqueId('side-bar'),
      label: 'Event Management',
      icon: CommonIcons.MedalIcon,
      path: '/apps/event-management',
    },
    {
      id: uniqueId('side-bar'),
      label: 'News',
      icon: CommonIcons.PiNewspaperLight,
      path: BaseUrl.News.Index,
    },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Sidebar side-bar'
      sx={{
        position: 'fixed',
        height: `calc(100vh - ${theme.sizes?.heightNavbar}px)`,
        width: theme.sizes?.widthSidebar,
        backgroundColor: theme.colors?.gray,
        top: theme.sizes?.heightNavbar,
        left: 0,
      }}
    >
      <CommonStyles.Box className='sidebar__container' sx={{ py: 2, px: 1 }}>
        {items.map((el) => {
          return <EachItemSidebar key={el.id} item={el} />;
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Sidebar;
