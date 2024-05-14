import { PropsWithChildren, Suspense } from 'react';
import CommonStyles from 'components/CommonStyles';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { useTheme } from '@mui/material';

const AppLayout = (props: PropsWithChildren) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:AppLayout' component='main'>
      <Navbar />
      <Sidebar />

      <Suspense fallback={<CommonStyles.Loading />}>
        <CommonStyles.Box
          className='apps__container'
          sx={{
            paddingLeft: `${(theme.sizes?.widthSidebar || 0) + 8 * 3}px`,
            paddingTop: `${(theme.sizes?.heightNavbar || 0) + 8 * 3}px`,
            pb: 3,
            pr: 3,
          }}
        >
          {props.children}
        </CommonStyles.Box>
      </Suspense>
    </CommonStyles.Box>
  );
};

export default AppLayout;
