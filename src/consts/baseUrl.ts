const BaseUrl = {
  // ImportBaseURL
  Homepage: '/',
  Todos: '/todos',
  Login: '/login',
  Callbacks: '/login/callback',
  Logout: '/logout',

  AppManagement: '/apps',
  AppLauncher: '/apps/:id',
  AppLauncherWithID: (id: string) => `/apps/${id}`,
  AppLauncherDetail: '/apps/:id',
  AppDetail: '/apps/detail/:id',
  AppDetailWithID: (id: string) => `/apps/detail/${id}`,
  AppsManagement: 'apps/apps-management',
  ReportManagement: 'apps/report-management',
  CategoryManagement: 'apps/category-management',

  CreateApp: '/create-app',

  Users: '/users',
  Settings: '/settings',
  AppConnect: '/app-connect',

  Apps: '/apps',
  Marketplace: {
    Index: `/apps/marketplace/`,
    Products: '/apps/marketplace/products',
    Quote: '/apps/marketplace/quote',
    Info: '/apps/marketplace/app/:id',
    InfoWithID: (id: string | number) => `/apps/marketplace/app/${id}`,

    AppMarketPlace: '/apps/marketplace/list',
    AppMarketPlaceWithID: (id: string, type?: string) =>
      `/apps/marketplace/list?category=${id}&type=${type}`,
  },
  ReportApp: {
    Index: `/apps/report/`,
    Products: '/apps/report/products',
    Quote: '/apps/report/quote',
    Info: '/apps/report/app/:id',
    InfoWithID: (id: string | number) => `/apps/report/app/${id}`,

    AppReport: '/apps/report/list',
    AppReportWithId: (id: string, type?: string) => `/apps/report/list?category=${id}&type=${type}`,
  },

  Setting: {
    Index: '/apps/settings',
  },

  MyApps: {
    Index: '/apps/my-apps',
    Detail: '/apps/my-apps/:id',
    DetailWithID: (id: string | number) => `/apps/my-apps/${id}`,
  },

  MyReport: {
    Index: '/apps/my-reports',
    Detail: '/apps/my-reports/:id',
    DetailWithID: (id: string | number) => `/apps/my-reports/${id}`,
  },

  Develop: {
    Index: '/apps/develop',
    UploadApps: '/apps/develop/upload-apps',
    ManageYourApps: '/apps/develop/manage-apps',
    ManageYourReport: '/apps/develop/manage-report',
    UploadReport: '/apps/develop/upload-report',
    EditReport: `/apps/develop/edit-report/:id`,
  },
  Notification: {
    Index: '/apps/notification',
  },
  Launcher: {
    App: '/apps/launcher',
    AppWithdDetail: (launchUri?: string | number, idApp?: string | number) => {
      return idApp
        ? `/apps/launcher?uri=${launchUri}&id=${idApp}`
        : `/apps/launcher?uri=${launchUri}`;
    },
  },
  News: {
    Index: '/apps/news',
  },
  EvenManagement: {
    Index: 'apps/event-management',
  },

  Company: {
    Index: 'apps/company',
    AddCompany: '/apps/apps/company/add-company',
    Edit: '/apps/apps/company/edit/:id',
    DetailWithID: (id: string | number) => `/apps/apps/company/edit/${id}`,
  },
  AccountSetting: '/apps/account-setting',

  RecentActivity: {
    Index: '/apps/recent-activity',
  },
  Help: {
    Index: 'app/help',
    AddHelp: '/apps/apps/help/add-help',
    Edit: '/apps/apps/help/edit/:id',
    DetailWithID: (id: string | number) => `/apps/apps/help/edit/${id}`,
    DescriptionHelp: '/apps/apps/help/description/:id',
    DescriptionHelpWithID: (id: string | number) => `/apps/apps/help/description/${id}`,
  },
  NotificationManagement: {
    Index: '/apps/notification-management',
  },
  ApiDocs: {
    Index: 'app/api-docs',
    Detail: 'apps/api-docs/:id',
    DetailReportWithId: (id: string | number) => `/apps/apps/api-docs/${id}`,
  },
};

export default BaseUrl;
