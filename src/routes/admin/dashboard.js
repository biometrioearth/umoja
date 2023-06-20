import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('../../container/dashboard'));
const NotFound = lazy(() => import('../../container/pages/404'));
const Test = lazy(() => import('../../components/Test'));

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route
        path="/PufferFish"
        element={
          <Suspense fallback="Loading...">
            <Test />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DashboardRoutes;
