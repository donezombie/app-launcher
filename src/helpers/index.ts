import { PERMISSION_ENUM } from 'consts/index';
import { isString, upperFirst } from 'lodash';
import moment from 'moment';
import userService from 'services/userService';
import { showError, showSuccess } from './toast';
import { AccessAppType, AppType } from 'consts/enum';
import { UPLOAD, UPLOAD_URL } from 'consts/apiUrl';
export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const convertToFormSelect = (
  list: any[],
  fieldForLabel: string | number | undefined = undefined,
  fieldForValue: string | number | undefined = undefined,
  noneOption: boolean | undefined = false
) => {
  if (!fieldForLabel || !fieldForValue) {
    return [
      ...list.reduce((arr: any, el: any) => {
        return [...arr, { label: el, value: el }];
      }, []),
    ];
  }
  if (typeof list === 'object' && list) {
    const listReturn = [
      ...list.reduce((arr: any, el: any) => {
        return [
          ...arr,
          {
            ...el,
            label: el[fieldForLabel] ?? 'None',
            value: el[fieldForValue] ?? '',
          },
        ];
      }, []),
    ];

    if (noneOption) {
      return [{ label: 'None', value: '' }, ...listReturn];
    }
    return listReturn;
  }
  return [{ label: 'None', value: '' }, ...list];
};

export const getNameRole = (role: string) => {
  let result = '';

  Object.entries(PERMISSION_ENUM).forEach((el) => {
    const [key, value] = el;
    if (role === value) {
      result = key;
    }
  });

  return result;
};

export const copyToClipboard = (text = '') => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const file2Base64 = (file: File | string): string => {
  if (isString(file)) {
    return file;
  }

  return window.URL.createObjectURL(file);
};

export const convertStringToArrayWithComma = (data: string) => {
  return data.split(',');
};

export const renderReviewTime = (dateTimeString: Date | string) => {
  const momentObj = moment(dateTimeString);

  // Get current date and time
  const now = moment();

  // Check if the date is today
  if (momentObj.isSame(now, 'day')) {
    return momentObj.format('HH:mm');
  }

  // Check if the date is within this week
  if (momentObj.isSame(now, 'week')) {
    return momentObj.format('ddd');
  }

  // If not within this week, display month and day
  return momentObj.format('MMM YY');
};

export const removeAppID = (appsDetailData: string[], appID: string) => {
  const index = appsDetailData.indexOf(appID);
  if (index !== -1) {
    appsDetailData.splice(index, 1);
  }
  return appsDetailData;
};

export const handleUpload = async (
  name: string,
  event: any,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
) => {
  try {
    const resUpload = await userService.upload({ file: event.target.files?.[0] });
    setFieldValue(name, `${UPLOAD_URL}/${resUpload.data.data.uri}`);
    showSuccess('Upload success!');
  } catch (error) {
    showError(error);
  }
};

export const filterAppType = Object.values(AppType)
  .filter((el) => el !== AppType.REPORT)
  .join(',');

// export interface NotiFirebase {
//   from: string;
//   messageId: string;
//   notification: Notification;
//   data: Data;
// }

// export interface Data {
//   fromUser: string;
//   accessType: string;
//   appId: string;
// }

// export interface Notification {
//   title: string;
// }

// export const generateNoti = (data: NotiFirebase) => {
//   let notiText = data.notification.title;
//   if (data.data.accessType === AccessAppType.NONE) {
//     notiText = 'deny';
//   }
//   return upperFirst(notiText);
// };
