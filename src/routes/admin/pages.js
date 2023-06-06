import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Settings = lazy(() => import('../../container/profile/settings/Settings'));

function PagesRoute() {
  return (
    <Routes>
      <Route path="settings/*" element={<Settings />} />
    </Routes>
  );
}

export default PagesRoute;
