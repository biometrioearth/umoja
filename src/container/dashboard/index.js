import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { GlobalUtilityStyle } from '../styled';

const OverviewDataList = lazy(() => import('./overview/index/OverviewDataList'));
const SiteReport = lazy(() => import('./overview/index/SiteReport'));
const ProectBySamplingArea = lazy(() => import('./overview/index/ProectBySamplingArea'));

function Dashboard() {
  const PageRoutes = [
    {
      path: 'dashboard',
      breadcrumbName: 'Dashboard',
    },
  ];
  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Dashboard"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <GlobalUtilityStyle>
        <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row>
            <Col xxl={24} xs={24}>
              <Suspense
                fallback={
                  <Cards headless className="mb-[25px]">
                    <Skeleton active />
                  </Cards>
                }
              >
                <OverviewDataList />
              </Suspense>
            </Col>
            <Col xxl={24} xs={24} className="mb-[25px]">
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <SiteReport />
              </Suspense>
            </Col>
            <Col xxl={24} xs={24} className="mb-[25px]">
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <ProectBySamplingArea />
              </Suspense>
            </Col>
          </Row>
        </div>
      </GlobalUtilityStyle>
    </>
  );
}

export default Dashboard;
