import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import Page404 from 'pages/Page404';
import routes from 'routes/routesPrivate';
import PrivateRoute from 'components/PrivateRoute';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useSettingsTheme } from 'providers/SettingsThemeProvider';
import { ErrorBoundary } from 'react-error-boundary';
import CommonStyles from 'components/CommonStyles';
import routesPublic from 'routes/routesPublic';
import { useAuth } from 'providers/AuthenticationProvider';
import { getMessaging, onMessage } from 'firebase/messaging';
import { showSuccess } from 'helpers/toast';
import { upperFirst } from 'lodash';

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = () => {
  //! State
  const auth = useAuth();
  const { themeOfApp } = useSettingsTheme();

  //! Function
  useEffect(() => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      if (payload.notification) {
        showSuccess(upperFirst(payload.notification.title));
      }
      console.log('Message received. ', payload);
    });
  }, []);
  //! Render
  const renderContent = () => {
    if (auth.loading) {
      return (
        <CommonStyles.Box sx={{ p: 2 }}>
          <CommonStyles.Loading />
        </CommonStyles.Box>
      );
    }

    return (
      <Router>
        <Routes>
          {routesPublic.map((route) => {
            return <Route key={route.name} path={route.path} element={<route.component />} />;
          })}

          {routes.map((route) => {
            return (
              <Route
                key={`${route.path}-layout`}
                path={route.path}
                element={
                  <PrivateRoute>
                    <route.layout>
                      <Outlet />
                    </route.layout>
                  </PrivateRoute>
                }
              >
                {route?.routeChild?.map((child, idx) => {
                  return (
                    <Route
                      key={`${child.path}-${idx}`}
                      path={child.path}
                      element={
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                          {child.isPrivateRoute ? (
                            <PrivateRoute>
                              <child.component />
                            </PrivateRoute>
                          ) : (
                            <child.component />
                          )}
                        </ErrorBoundary>
                      }
                    />
                  );
                })}
              </Route>
            );
          })}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    );
  };

  return (
    <Suspense fallback={<CommonStyles.Loading />}>
      <ThemeProvider theme={themeOfApp}>
        <CssBaseline />
        {renderContent()}
      </ThemeProvider>
    </Suspense>
  );
};

export default React.memo(App);
