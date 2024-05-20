import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import EachItemSidebar from './EachItemSidebar';
import { uniqueId } from 'lodash';
import CommonIcons from 'components/CommonIcons';
import BaseUrl from 'consts/baseUrl';
import { useAuth } from 'providers/AuthenticationProvider';

const Sidebar = () => {
  //! State
  const theme = useTheme();
  const { isAdmin, isUser, isAppManager } = useAuth();
  const items = [
    {
      id: uniqueId('side-bar'),
      label: 'Marketplace',
      icon: CommonIcons.BagHandleIcon,
      path: BaseUrl.Marketplace.Index,
      show: isAdmin || isUser || isAppManager,
      children: [
        {
          label: 'Products',
          path: BaseUrl.Marketplace.Products,
          showChildren: isAdmin || isUser || isAppManager,
        },
        {
          label: 'Integrations',
          path: '/apps/marketplace/integrations',
          showChildren: isAdmin || isUser || isAppManager,
        },
        {
          label: 'Quote',
          path: BaseUrl.Marketplace.Quote,
          showChildren: isAdmin || isUser || isAppManager,
        },
        {
          label: 'Search Ordering',
          path: '/apps/marketplace/search-ordering',
          showChildren: isAdmin || isUser || isAppManager,
        },
      ],
    },
    {
      id: uniqueId('side-bar'),
      label: 'My Apps',
      icon: CommonIcons.SparkesIcon,
      path: BaseUrl.MyApps.Index,
      show: isAdmin || isUser || isAppManager,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Settings',
      icon: CommonIcons.SettingsIcon,
      path: BaseUrl.Setting.Index,
      show: isAdmin,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Develop',
      icon: CommonIcons.SparkesIcon,
      path: BaseUrl.Develop.Index,
      show: isAdmin || isAppManager,
      children: [
        {
          label: 'Upload App',
          path: BaseUrl.Develop.UploadApps,
          showChildren: isAdmin || isAppManager,
        },
        {
          label: 'Manage Your Apps',
          path: BaseUrl.Develop.ManageYourApps,
          showChildren: isAdmin || isAppManager,
        },
      ],
    },
    {
      id: uniqueId('side-bar'),
      label: 'Event Management',
      icon: CommonIcons.MedalIcon,
      path: '/apps/event-management',
      show: isAdmin,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Apps Management',
      icon: CommonIcons.LaunchIcon,
      path: BaseUrl.AppsManagement,
      show: isAdmin,
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
