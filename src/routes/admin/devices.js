import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Device = lazy(() => import('../../container/device/Device'));
const DeviceDetails = lazy(() => import('../../container/device/DeviceDetails'));
const NotFound = lazy(() => import('../../container/pages/404'));

function DeviceRoutes() {
  return (
    <Routes>
      <Route path="deviceDetails/:id/*" element={<DeviceDetails />} />
      <Route path="view/*" element={<Device />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DeviceRoutes;
