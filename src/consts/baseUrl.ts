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

  CreateApp: '/create-app',

  Users: '/users',
  Settings: '/settings',
  AppConnect: '/app-connect',

  Apps: '/apps',
  Marketplace: {
    Index: '/apps/marketplace',
    Products: '/apps/marketplace/products',
    Quote: '/apps/marketplace/quote',
  },

  Setting: {
    Index: '/apps/settings',
  },

  MyApps: {
    Index: '/apps/my-apps',
  },

  Develop: {
    Index: '/apps/develop',
    UploadApps: '/apps/develop/upload-apps',
    ManageYourApps: '/apps/develop/manage-apps',
  },
};

export default BaseUrl;
