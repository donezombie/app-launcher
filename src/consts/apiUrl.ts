import { isDevelopment } from 'consts/index';

const ROOT_URL = `${isDevelopment ? 'http://103.104.122.210:10000' : window.location.origin}/api`;
// export const BASE_URL = 'https://marketplace-mvp.twenty-tech.com/api/v1';
// export const UPLOAD_URL = 'https://marketplace-mvp.twenty-tech.com';
export const BASE_URL = 'http://103.143.142.245:9035/api/v1';
export const UPLOAD_URL = 'http://103.143.142.245:9035';
// export const BASE_URL = 'http://192.168.1.5:8687/api/v1';
// export const UPLOAD_URL = 'http://192.168.1.5:8687';

// Dont remove this command
// ImportAPIURL
export const APP_MANAGEMENT_URL = `${ROOT_URL}/app-management`;
export const APP_MANAGER = `${BASE_URL}/app-manager`;
// export const APP_INTEGRATION_URL = `${ROOT_URL}/app-integration`;
export const APP_INTEGRATION_URL = `${BASE_URL}/app-integration`;
export const USER_URL = `${ROOT_URL}/user`;
export const USER = `${BASE_URL}/user`;
export const PLATFORM_URL = `${ROOT_URL}/platform-management`;
export const LIST_NEW = `${BASE_URL}/news`;
export const AUTH_URL = `${BASE_URL}/auth`;
export const UPLOAD = `${BASE_URL}/upload/single`;
export const LIST_NOTIFICATION = `${BASE_URL}/notification-logs`;
export const LIST_NOTIFICATION_CREATE_NEW = `${BASE_URL}/notification-logs/send-noti`;
export const LIST_USER_RECEIVE_NOTIFICATION = `${BASE_URL}/notification-logs/users-receive-noti`;
export const LIST_NOTIFICATION_MANAGER = `${BASE_URL}/notification-logs/list-manger`;
export const LIST_NOTIFICATION_READ_ALL = `${BASE_URL}/notification-logs/read-all`;
