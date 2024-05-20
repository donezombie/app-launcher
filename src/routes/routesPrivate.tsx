import { lazy } from 'react';
import BaseUrl from 'consts/baseUrl';
import withCheckRole from 'HOCs/withCheckRole';
import { PERMISSION_ENUM } from 'consts/index';
import { Route } from 'interfaces/common';

// Bash importHere
const DefaultLayout = lazy(() => import('layouts/DefaultLayout'));
const Homepage = lazy(() => import('pages/NewDesigns/Homepage'));
const Users = lazy(() => import('pages/Users'));
// const Settings = lazy(() => import('pages/Settings'));

// const Laucher = lazy(() => import('pages/Launcher'));
// const AppManagement = lazy(() => import('pages/Apps'));
// const DetailApp = lazy(() => import('pages/DetailApp'));
const Launcher = lazy(() => import('pages/NewDesigns/Launcher'));

const AppsLayout = lazy(() => import('layouts/AppsLayout'));

//! Marketplace
const Marketplace = lazy(() => import('pages/NewDesigns/Apps/PageChild/Marketplace'));
const Products = lazy(
  () => import('pages/NewDesigns/Apps/PageChild/Marketplace/PageChild/Products')
);
const Quote = lazy(() => import('pages/NewDesigns/Apps/PageChild/Marketplace/PageChild/Quote'));
const InfoApp = lazy(() => import('pages/NewDesigns/Apps/PageChild/Marketplace/PageChild/InfoApp'));

//! Develop
const DevelopPage = lazy(() => import('pages/NewDesigns/Apps/PageChild/Develop'));
const UploadApps = lazy(
  () => import('pages/NewDesigns/Apps/PageChild/Develop/PageChild/UploadApp')
);
const ManageYourApps = lazy(
  () => import('pages/NewDesigns/Apps/PageChild/Develop/PageChild/ManageYourApps')
);

//! My Apps
const MyApps = lazy(() => import('pages/NewDesigns/Apps/PageChild/MyApps'));
const MyAppDetail = lazy(() => import('pages/NewDesigns/Apps/PageChild/MyApps/MyAppDetail'));

//! Settings
const Settings = lazy(() => import('pages/NewDesigns/Apps/PageChild/Settings'));

//! Notification
const NotificationScreen = lazy(() => import('pages/NewDesigns/NotificationScreen'));

//! News
const NewsScreen = lazy(() => import('pages/NewDesigns/News'));

//! Apps Management
const AppsManagement = lazy(() => import('pages/NewDesigns/AppsManagement'));

const routes: Route[] = [
  {
    name: 'Home Layout',
    path: '/',
    layout: DefaultLayout,
    routeChild: [
      // Bash appendHere
      {
        name: 'Homepage',
        path: BaseUrl.Homepage,
        component: withCheckRole(Homepage, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },
      // {
      //   name: 'App Management',
      //   path: BaseUrl.AppManagement,
      //   component: withCheckRole(AppManagement, [
      //     PERMISSION_ENUM.ADMIN,
      //     PERMISSION_ENUM.APP_MANAGER,
      //     PERMISSION_ENUM.USER,
      //   ]),
      //   isPrivateRoute: true,
      // },
      // {
      //   name: 'App Launcher',
      //   path: BaseUrl.AppLauncher,
      //   component: withCheckRole(Laucher, [
      //     PERMISSION_ENUM.ADMIN,
      //     PERMISSION_ENUM.APP_MANAGER,
      //     PERMISSION_ENUM.USER,
      //   ]),
      //   isPrivateRoute: true,
      // },
      // {
      //   name: 'Detail App',
      //   path: BaseUrl.AppDetail,
      //   component: withCheckRole(DetailApp, [PERMISSION_ENUM.APP_MANAGER, PERMISSION_ENUM.ADMIN]),
      //   isPrivateRoute: true,
      // },
      {
        name: 'Users',
        path: BaseUrl.Users,
        component: withCheckRole(Users, [PERMISSION_ENUM.ADMIN]),
        isPrivateRoute: true,
      },
      {
        name: 'Settings',
        path: BaseUrl.Settings,
        component: withCheckRole(Settings, [PERMISSION_ENUM.PUBLIC]),
        isPrivateRoute: true,
      },
      {
        name: 'Notification',
        path: BaseUrl.Notification.Index,
        component: NotificationScreen,
      },
      {
        name: 'Launcher',
        path: BaseUrl.Launcher.App,
        component: Launcher,
      },
    ],
  },
  {
    name: 'Apps Layout',
    path: BaseUrl.Apps,
    layout: AppsLayout,
    routeChild: [
      {
        name: 'Marketplace',
        path: BaseUrl.Marketplace.Index,
        component: withCheckRole(Marketplace, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },
      {
        name: 'Products',
        path: BaseUrl.Marketplace.Products,
        component: withCheckRole(Products, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },
      {
        name: 'Quote',
        path: BaseUrl.Marketplace.Quote,
        component: withCheckRole(Quote, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },
      {
        name: 'Info App',
        path: BaseUrl.Marketplace.Info,
        component: withCheckRole(InfoApp, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },

      {
        name: 'MyApps',
        path: BaseUrl.MyApps.Index,
        component: withCheckRole(MyApps, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },
      {
        name: 'MyApp Detail',
        path: BaseUrl.MyApps.Detail,
        component: withCheckRole(MyAppDetail, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
          PERMISSION_ENUM.USER,
        ]),
        isPrivateRoute: true,
      },

      {
        name: 'Settings',
        path: BaseUrl.Setting.Index,
        component: withCheckRole(Settings, [PERMISSION_ENUM.ADMIN]),
        isPrivateRoute: true,
      },

      {
        name: 'Develop',
        path: BaseUrl.Develop.Index,
        component: withCheckRole(DevelopPage, [PERMISSION_ENUM.ADMIN, PERMISSION_ENUM.APP_MANAGER]),
      },
      {
        name: 'Upload apps',
        path: BaseUrl.Develop.UploadApps,
        component: withCheckRole(UploadApps, [PERMISSION_ENUM.ADMIN, PERMISSION_ENUM.APP_MANAGER]),
      },
      {
        name: 'Manage your apps',
        path: BaseUrl.Develop.ManageYourApps,
        component: withCheckRole(ManageYourApps, [
          PERMISSION_ENUM.ADMIN,
          PERMISSION_ENUM.APP_MANAGER,
        ]),
      },
      {
        name: 'News screen',
        path: BaseUrl.News.Index,
        component: NewsScreen,
      },
      {
        name: 'Apps Management',
        path: BaseUrl.AppsManagement,
        component: withCheckRole(AppsManagement, [PERMISSION_ENUM.ADMIN]),
        isPrivateRoute: true,
      },
    ],
  },
];

export default routes;
