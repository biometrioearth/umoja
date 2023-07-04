import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Project = lazy(() => import('../../container/project/Project'));
const ProjectSamplingPoints = lazy(() => import('../../container/project/ProjectSamplingPoints'));
const ProjectDetails = lazy(() => import('../../container/project/ProjectDetails'));
const NotFound = lazy(() => import('../../container/pages/404'));

function ProjectRoutes() {
  return (
    <Routes>
      <Route path="projectDetails/:id/*" element={<ProjectDetails />} />
      <Route path="view/*" element={<Project />} />
      <Route path="samplingPoints/:id/*" element={<ProjectSamplingPoints />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ProjectRoutes;
