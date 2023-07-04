import React from 'react';
import { Row, Col, Table, Pagination } from 'antd';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Heading from '../../../components/heading/heading';
import { GlobalUtilityStyle, PaginationStyle } from '../../styled';

function DeviceLists(props) {
  const { devicesData, filterSort, paginateData } = props;

  const dataSource = [];

  if (devicesData && devicesData?.items && devicesData?.items?.length)
    devicesData?.items.map((value) => {
      const { id, serialNumber, additionalIdentifier, deviceType, brand, status, createdAt } = value;
      const url = `/dashboard/device/deviceDetails/${id}`;
      return dataSource.push({
        key: id,
        serial_number: (
          <>
            <Heading as="h4" className="mb-[5px] text-dark dark:text-white87 text-[15px] font-medium">
              <Link to={url} state={{ device: value }} className="text-dark dark:text-white87">
                {serialNumber}
              </Link>
            </Heading>
          </>
        ),
        additionalIdentifier: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">{additionalIdentifier}</span>
        ),
        deviceType: <span className="text-body dark:text-white60 text-[15px] font-medium">{deviceType}</span>,
        brand: <span className="text-body dark:text-white60 text-[15px] font-medium">{brand}</span>,
        status: <span className="text-body dark:text-white60 text-[15px] font-medium">{status}</span>,
        created_at: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">
            {new Date(createdAt).toDateString()}
          </span>
        ),
      });
    });

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'serial_number',
      key: 'serial_number',
      className: 'text-light dark:text-white60 text-[15px] py-2.5 last:text-end border-none before:hidden',
      sorter: (a, b) => a.serial_number.length - b.serial_number.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Additional Identifier',
      dataIndex: 'additionalIdentifier',
      key: 'additionalIdentifier',
      className: 'text-light dark:text-white60 text-[15px] py-2.5 last:text-end border-none before:hidden',
    },
    {
      title: 'Device Type',
      dataIndex: 'deviceType',
      key: 'deviceType',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
      sorter: (a, b) => a.created_at - b.created_at,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  function onChange(pagination, filters, sorter) {
    filterSort(pagination, filters, sorter);
  }
  const onShowSizeChange = (current, pageSize) => {
    paginateData(current, pageSize);
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    paginateData(current, pageSize);
  };

  return (
    <GlobalUtilityStyle>
      <Row gutter={25}>
        <Col xs={24}>
          <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
            <div className="table-responsive table-th-shape-none table-head-rounded table-th-text-light hover-tr-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
              <Table pagination={false} dataSource={dataSource} columns={columns} onChange={onChange} />
            </div>
          </div>
        </Col>
        <Col xs={24} className="pb-30">
          <PaginationStyle>
            {devicesData?.items?.length ? (
              <div className="ant-pagination-custom-style text-end mt-[30px] mb-[25px]">
                <Pagination
                  onChange={onHandleChange}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  current={devicesData.pageInfo.currentPage}
                  pageSize={devicesData.pageInfo.pageSize}
                  defaultCurrent={devicesData.pageInfo.currentPage}
                  total={devicesData.pageInfo.totalCount}
                />
              </div>
            ) : null}
          </PaginationStyle>
        </Col>
      </Row>
    </GlobalUtilityStyle>
  );
}
DeviceLists.propTypes = {
  devicesData: PropTypes.object,
  filterSort: PropTypes.func,
  paginateData: PropTypes.func,
};
export default DeviceLists;
