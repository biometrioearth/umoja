/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */
import React, { useEffect, useState, lazy } from 'react';
import { useSelector, Provider } from 'react-redux';
import './static/css/style.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
// import { ApolloClient, InMemoryCache } from '@apollo/client';
import Admin from './routes/admin';
import Auth from './routes/auth';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import 'antd/dist/antd.less';
import store from './redux/store';

const NotFound = lazy(() => import('./container/pages/404'));

const { theme } = config;

// const client = new ApolloClient({
//   uri: process.env.REACT_APP_BALAM_URL,
//   cache: new InMemoryCache(),
// });

function ProviderConfig() {
  const { rtl, isLoggedIn, topMenu, mainContent } = useSelector((state) => {
    return {
      rtl: false,
      topMenu: false,
      mainContent: 'lightMode',
      isLoggedIn: state.auth.login,
    };
  });

  const [path, setPath] = useState(window.location.pathname);
  const token = localStorage.getItem('authData');

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction="ltr">
      <ThemeProvider theme={{ ...theme, rtl, topMenu, mainContent }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn || !token ? (
            <Routes>
              <Route path="/login" element={<Auth />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/dashboard/*" element={<ProtectedRoute path="/*" Component={Admin} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
          {(isLoggedIn && path === process.env.PUBLIC_URL) ||
            (path === `${process.env.PUBLIC_URL}/` && (
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
              </Routes>
            ))}
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />;
    </Provider>
  );
}

export default App;
