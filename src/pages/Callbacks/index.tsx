import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useAuth } from 'providers/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';
import userService from 'services/userService';
import httpService from 'services/httpService';
import { showError } from 'helpers/toast';

const Callbacks = () => {
  //! State
  const auth = useAuth();
  const navigate = useNavigate();

  //! Function

  React.useEffect(() => {
    auth.loginRedirectCallback().then(async (respone: any) => {
      try {
        const accessTokenCognito = respone.access_token;
        const user = await userService.loginWithCognito(accessTokenCognito);
        if (user.data.statusCode === 200) {
          httpService.saveTokenStorage(user.data.data);
          window.location.href = BaseUrl.Homepage;
        }
      } catch (error) {
        showError(error);
        navigate(BaseUrl.Login);
      }
    });
  }, []);

  //! Render
  return (
    <CommonStyles.Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
      <CommonStyles.Loading size={24} /> Logging in...
    </CommonStyles.Box>
  );
};

export default React.memo(Callbacks);
