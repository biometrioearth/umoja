import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './dashboard';
import Pages from './pages';
import withAdminLayout from '../../layout/withAdminLayout';

const Charts = lazy(() => import('./charts'));
const Projects = lazy(() => import('./projects'));
const Devices = lazy(() => import('./devices'));
const NotFound = lazy(() => import('../../container/pages/404'));

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin flex items-center justify-center bg-white dark:bg-dark h-screen w-full fixed z-[999] ltr:left-0 rtl:right-0 top-0">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/*" element={<Dashboard />} />
        <Route path="pages/*" element={<Pages />} />
        <Route path="charts/*" element={<Charts />} />
        <Route path="project/*" element={<Projects />} />
        <Route path="device/*" element={<Devices />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
