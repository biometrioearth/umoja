import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('../../container/dashboard'));
const NotFound = lazy(() => import('../../container/pages/404'));
const PufferFish = lazy(() => import('../../components/Pufferfish'));

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/PufferFish" element={<PufferFish />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DashboardRoutes;
