import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Project = lazy(() => import('../../container/project/Project'));
const ProjectSites = lazy(() => import('../../container/project/ProjectSties'));
const ProjectSamplingAreas = lazy(() => import('../../container/project/ProjectSamplingArea'));
const ProjectSamplingPoints = lazy(() => import('../../container/project/ProjectSamplingPoints'));
const ProjectDetails = lazy(() => import('../../container/project/ProjectDetails'));
const ProjectCreate = lazy(() => import('../../container/project/ProjectCreate'));
const NotFound = lazy(() => import('../../container/pages/404'));

function ProjectRoutes() {
  return (
    <Routes>
      <Route path="projectDetails/:id/*" element={<ProjectDetails />} />
      <Route path="view/*" element={<Project />} />
      <Route path="site/*" element={<ProjectSites />} />
      <Route path="sampling-point/*" element={<ProjectSamplingPoints />} />
      <Route path="sampling-area/*" element={<ProjectSamplingAreas />} />
      <Route path="create/*" element={<ProjectCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ProjectRoutes;
