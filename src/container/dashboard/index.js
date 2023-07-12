import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Row, Col, Spin } from 'antd';
import OverviewIndex from './overview/index';
import CalendarIndex from './calendar/index';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Tab } from '../../components/tabs/tabs';

function Dashboard() {
  const PageRoutes = [
    {
      path: 'dashboard',
    },
  ];
  const dataIcon = [
    {
      id: 1,
      tabTitle: 'Overview',
      icon: 'UilHome',
      content: (
        <Suspense
          fallback={
            <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
              <Spin />
            </div>
          }
        >
          <Routes>
            <Route index element={<OverviewIndex />} />
          </Routes>
        </Suspense>
      ),
    },
    {
      id: 2,
      tabTitle: 'Calendar',
      icon: 'UilCalendarAlt',
      content: (
        <Suspense
          fallback={
            <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
              <Spin />
            </div>
          }
        >
          <Routes>
            <Route index element={<CalendarIndex />} />
          </Routes>
        </Suspense>
      ),
    },
  ];
  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Dashboard"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={24} xs={24}>
            <Tab data={dataIcon} />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Dashboard;
