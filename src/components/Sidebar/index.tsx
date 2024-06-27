import { CircularProgress, useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import BaseUrl from 'consts/baseUrl';
import { useGetCategoryList } from 'hooks/category/useGetListCategory';
import { Category } from 'interfaces/category';
import { uniqueId } from 'lodash';
import { useAuth } from 'providers/AuthenticationProvider';
import { useSearchParams } from 'react-router-dom';
import EachItemSidebar from './EachItemSidebar';
import { CategoryType } from 'consts/enum';
import useFiltersHandler from 'hooks/useFiltersHandler';

const initialValues = {
  categoryType: CategoryType.DEFAULT,
};

const Sidebar = () => {
  //! State
  const theme = useTheme();
  const { isAdmin, isUser, isAppManager } = useAuth();
  const { filters, handleSearch } = useFiltersHandler(initialValues);
  const { data: category, isLoading: isLoadingList } = useGetCategoryList(filters);
  const data = category?.data?.data?.items;
  const [searchParams] = useSearchParams({ category: '' });
  const childrenCategory = data || ([] as Category[]);
  const categoryFromURL = searchParams.get('category');

  const items = [
    {
      id: uniqueId('side-bar'),
      label: 'Marketplace',
      icon: CommonIcons.BagHandleIcon,
      path: BaseUrl.Marketplace.Index,
      show: isAdmin || isUser || isAppManager,
      // children: [
      //   {
      //     label: 'Products',
      //     path: BaseUrl.Marketplace.Products,
      //     showChildren: isAdmin || isUser || isAppManager,
      //   },
      //   {
      //     label: 'Integrations',
      //     path: '/apps/marketplace/integrations',
      //     showChildren: isAdmin || isUser || isAppManager,
      //   },
      //   {
      //     label: 'Quote',
      //     path: BaseUrl.Marketplace.Quote,
      //     showChildren: isAdmin || isUser || isAppManager,
      //   },
      //   {
      //     label: 'Search Ordering',
      //     path: '/apps/marketplace/search-ordering',
      //     showChildren: isAdmin || isUser || isAppManager,
      //   },
      // ],
      children: childrenCategory.map((item: Category) => {
        return {
          key: item.id,
          label: item.name,
          path: BaseUrl.Marketplace.AppMarketPlaceWithID(String(item.id)),
          showChildren: isAdmin || isUser || isAppManager,
          forceActive: categoryFromURL === String(item.id),
        };
      }),
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
          label: 'Upload Report',
          path: BaseUrl.Develop.UploadReport,
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
      label: 'News',
      icon: CommonIcons.PiNewspaperLight,
      path: BaseUrl.News.Index,
      show: isAdmin,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Event Management',
      icon: CommonIcons.MedalIcon,
      path: BaseUrl.EvenManagement.Index,
      show: isAdmin,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Apps Management',
      icon: CommonIcons.BagHandleIcon,
      path: BaseUrl.AppsManagement,
      show: isAdmin,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Category Management',
      icon: CommonIcons.IoListOutline,
      path: BaseUrl.CategoryManagement,
      show: isAdmin,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Report Apps',
      icon: CommonIcons.ReportIcon,
      path: BaseUrl.Report.Index,
      show: isAdmin || isUser || isAppManager,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Company Management',
      icon: CommonIcons.Company,
      path: BaseUrl.Company.Index,
      show: isAdmin,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Static Content Management',
      icon: CommonIcons.HelpIcon,
      path: BaseUrl.Help.Index,
      show: isAdmin,
    },
    {
      id: uniqueId('side-bar'),
      label: 'Recent Activity',
      icon: CommonIcons.Company,
      path: BaseUrl.RecentActivity.Index,
      show: isAdmin,
    },
  ];

  //! Function
  if (isLoadingList) {
    return <CommonStyles.Loading />;
  }
  //! Render
  return (
    <CommonStyles.Box
      className='component:Sidebar side-bar'
      sx={{
        position: 'fixed',
        height: `calc(100vh - ${theme.sizes?.heightNavbar}px)`,
        width: theme.sizes?.widthSidebar,
        backgroundColor: theme.colors?.gray3,
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
