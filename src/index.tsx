import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import AuthProvider from 'providers/AuthenticationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

import './index.css';
import './styles/temp.scss';
import ToggleThemeProvider from 'providers/ToggleThemeProvider';
import CachedProvider from 'providers/CachedProvider';
import { AuthProvider as OIDCAuthProvider } from 'oidc-react';
import { ToastContainer } from 'react-toastify';
import configAWS from 'consts/configAWS';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CachedProvider>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ToggleThemeProvider>
          <OIDCAuthProvider {...configAWS}>
            <App />
            <ToastContainer theme='colored' />
          </OIDCAuthProvider>
        </ToggleThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  </CachedProvider>
);