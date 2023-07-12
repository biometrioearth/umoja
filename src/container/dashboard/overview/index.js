import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { GlobalUtilityStyle } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';

const OverviewDataList = lazy(() => import('./index/OverviewDataList'));
const SiteReport = lazy(() => import('./index/SiteReport'));
const ProectBySamplingArea = lazy(() => import('./index/ProectBySamplingArea'));

function Dashboard() {
  return (
    <>
      <GlobalUtilityStyle>
        <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto pb-[30px] bg-transparent">
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
