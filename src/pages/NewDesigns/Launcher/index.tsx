import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import BaseUrl from 'consts/baseUrl';
import { useAuth } from 'providers/AuthenticationProvider';
import { Navigate, useSearchParams } from 'react-router-dom';

const Launcher = () => {
  //! State
  const auth = useAuth();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const uri = searchParams.get('uri');
  const id = searchParams.get('id');

  //! Function

  //! Render
  if (!uri) {
    return <Navigate to={BaseUrl.Homepage} />;
  }

  return (
    <CommonStyles.Box
      className='component:Launcher'
      sx={{
        position: 'fixed',
        left: 0,
        top: theme.sizes?.heightNavbar,
        overflow: 'hidden',
        height: `calc(100vh - ${theme.sizes?.heightNavbar}px)`,
        width: '100vw',
        '& > iframe': { height: '100% ', width: '100%' },
      }}
    >
      <iframe
        src={`${decodeURIComponent(uri)}?embedded=true&token=${auth.accessToken}&id=${id}` || ''}
        // src={`http://localhost:3001?token=${auth.accessToken}&id=${idApp}` || ''}
        frameBorder={0}
        sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock'
        allow='accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-write;'
      />
    </CommonStyles.Box>
  );
};

export default Launcher;
