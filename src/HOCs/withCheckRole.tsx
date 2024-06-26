import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { PERMISSION_ENUM } from 'consts/index';
import { useAuth } from 'providers/AuthenticationProvider';
import httpService from 'services/httpService';

const withCheckRole = (
  ComponentWrapped:
    | typeof React.Component
    | React.LazyExoticComponent<React.MemoExoticComponent<any>>
    | React.ExoticComponent<any>,
  permission?: (PERMISSION_ENUM | '' | string)[]
) => {
  return () => {
    const user = httpService.getUserStorage();
    const role = user?.role || PERMISSION_ENUM.USER;
    const havePermission =
      permission?.includes(role) || permission?.includes(PERMISSION_ENUM.PUBLIC);

    if (havePermission) {
      return <ComponentWrapped />;
    }

    return (
      <CommonStyles.Typography>{`You're not have permission to access this!`}</CommonStyles.Typography>
    );
  };
};

export default withCheckRole;
