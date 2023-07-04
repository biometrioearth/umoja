import React from 'react';
import { Row, Col, Table, Pagination } from 'antd';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Heading from '../../../components/heading/heading';
import { GlobalUtilityStyle, PaginationStyle } from '../../styled';
// import { fetchAllProject } from '../../../redux/project/actionCreator';

function ProjectLists(props) {
  // const handleAlertClose = () => {
  //   setShowErrorAlert(false);
  // };

  const { samplingData } = props;

  const dataSource = [];
  const onShowSizeChange = () => {};

  const onHandleChange = () => {
    // You can create pagination in here
  };

  if (samplingData && samplingData?.items && samplingData?.items?.length)
    samplingData?.items.map((value) => {
      const { id, identifier, dateDeployment, dateCollected, location, altitude, device, createdAt } = value;
      return dataSource.push({
        key: id,
        identifier: (
          <>
            <Heading as="h4" className="mb-[5px] text-dark dark:text-white87 text-[15px] font-medium">
              <Link to={`/dashboard/project/projectDetails/${id}`} className="text-dark dark:text-white87">
                {identifier}
              </Link>
            </Heading>
          </>
        ),
        dateDeployment: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">
            {new Date(dateDeployment).toLocaleString()}
          </span>
        ),
        dateCollected: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">
            {new Date(dateCollected).toLocaleString()}
          </span>
        ),
        location: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">
            {location?.coordinates.join(', ')}
          </span>
        ),
        altitude: <span className="text-body dark:text-white60 text-[15px] font-medium">{altitude}</span>,
        device: <span className="text-body dark:text-white60 text-[15px] font-medium">{device}</span>,
        createdAt: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">
            {new Date(createdAt).toDateString()}
          </span>
        ),
      });
    });

  const columns = [
    {
      title: 'Identifier',
      dataIndex: 'identifier',
      key: 'identifier',
      className: 'text-light dark:text-white60 text-[15px] py-2.5 last:text-end border-none before:hidden',
    },
    {
      title: 'Date of Deployment',
      dataIndex: 'dateDeployment',
      key: 'dateDeployment',
      className: 'text-light dark:text-white60 text-[15px] py-2.5 last:text-end border-none before:hidden',
    },
    {
      title: 'Date Collected',
      dataIndex: 'dateCollected',
      key: 'dateCollected',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Altitude',
      dataIndex: 'altitude',
      key: 'altitude',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
  ];

  return (
    <GlobalUtilityStyle>
      <Row gutter={25}>
        <Col xs={24}>
          <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
            <div className="table-responsive table-th-shape-none table-head-rounded table-th-text-light hover-tr-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
              <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
          </div>
        </Col>
        <Col xs={24} className="pb-30">
          <PaginationStyle>
            {samplingData?.items?.length ? (
              <div className="ant-pagination-custom-style text-end mt-[30px] mb-[25px]">
                <Pagination
                  onChange={onHandleChange}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  pageSize={samplingData.pageInfo.pageSize}
                  defaultCurrent={samplingData.pageInfo.currentPage}
                  total={samplingData.pageInfo.totalPages}
                />
              </div>
            ) : null}
          </PaginationStyle>
        </Col>
      </Row>
    </GlobalUtilityStyle>
  );
}
ProjectLists.propTypes = {
  samplingData: PropTypes.any,
};
export default ProjectLists;
