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
  AppDetail: '/apps/detail/:id',
  AppDetailWithID: (id: string) => `/apps/detail/${id}`,
  AppsManagement: 'apps/apps-management',

  CreateApp: '/create-app',

  Users: '/users',
  Settings: '/settings',
  AppConnect: '/app-connect',

  Apps: '/apps',
  Marketplace: {
    Index: '/apps/marketplace',
    Products: '/apps/marketplace/products',
    Quote: '/apps/marketplace/quote',
    Info: '/apps/marketplace/app/:id',
    InfoWithID: (id: string | number) => `/apps/marketplace/app/${id}`,
  },

  Setting: {
    Index: '/apps/settings',
  },

  MyApps: {
    Index: '/apps/my-apps',
    Detail: '/apps/my-apps/:id',
    DetailWithID: (id: string | number) => `/apps/my-apps/${id}`,
  },

  Develop: {
    Index: '/apps/develop',
    UploadApps: '/apps/develop/upload-apps',
    ManageYourApps: '/apps/develop/manage-apps',
  },
  Notification: {
    Index: '/apps/notification',
  },
  Launcher: {
    App: '/apps/launcher',
    AppWithdDetail: (launchUri?: string | number, idApp?: string | number) =>
      `/apps/launcher?uri=${launchUri}&id=${idApp}`,
  },
  News: {
    Index: '/apps/news',
  },
};

export default BaseUrl;
