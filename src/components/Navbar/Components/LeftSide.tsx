import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { SIZE_ICON_DEFAULT } from 'consts';
import { Link } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';
import Logo from 'assets/logo.svg';
import { useGetCompanyDetail } from 'hooks/company/useCompanyHooks';
import { useAuth } from 'providers/AuthenticationProvider';

const LeftSide = () => {
  //! State
  const { user } = useAuth();
  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:LeftSide'
      sx={{ display: 'flex', gap: 3, alignItems: 'center' }}
    >
      <Link
        to={BaseUrl.Marketplace.Index}
        className='unstyle-link'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <CommonIcons.AppsIcon className='is-hover' size={SIZE_ICON_DEFAULT} />
      </Link>

      <img src={Logo} alt='logo' />

      <Link
        to={BaseUrl.Homepage}
        className='unstyle-link'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <CommonIcons.HomeIcon className='is-hover' size={SIZE_ICON_DEFAULT} />
      </Link>
    </CommonStyles.Box>
  );
};

export default React.memo(LeftSide);
