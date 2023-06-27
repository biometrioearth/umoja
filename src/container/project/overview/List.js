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

  const { projectsData } = props;

  const dataSource = [];
  const onShowSizeChange = () => {};

  const onHandleChange = () => {
    // You can create pagination in here
  };

  if (projectsData && projectsData?.items && projectsData?.items?.length)
    projectsData?.items.map((value) => {
      const { id, title, shortname, temporality, projectConfiguration, createdAt } = value;
      return dataSource.push({
        key: id,
        title: (
          <>
            <Heading as="h4" className="mb-[5px] text-dark dark:text-white87 text-[15px] font-medium">
              <Link to={`/dashboard/project/projectDetails/${id}`} className="text-dark dark:text-white87">
                {title}
              </Link>
            </Heading>
          </>
        ),
        shortname: <span className="text-body dark:text-white60 text-[15px] font-medium">{shortname}</span>,
        projectConfiguration: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">
            {projectConfiguration.description}
          </span>
        ),
        temporality: <span className="text-body dark:text-white60 text-[15px] font-medium">{temporality}</span>,
        createdAt: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">
            {new Date(createdAt).toDateString()}
          </span>
        ),
      });
    });

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      className: 'text-light dark:text-white60 text-[15px] py-2.5 last:text-end border-none before:hidden',
    },
    {
      title: 'Short Name',
      dataIndex: 'shortname',
      key: 'shortname',
      className: 'text-light dark:text-white60 text-[15px] py-2.5 last:text-end border-none before:hidden',
    },
    {
      title: 'Project Configuration',
      dataIndex: 'projectConfiguration',
      key: 'projectConfiguration',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Temporality',
      dataIndex: 'temporality',
      key: 'temporality',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
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
            {projectsData?.items?.length ? (
              <div className="ant-pagination-custom-style text-end mt-[30px] mb-[25px]">
                <Pagination
                  onChange={onHandleChange}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  pageSize={projectsData.pageInfo.pageSize}
                  defaultCurrent={projectsData.pageInfo.currentPage}
                  total={projectsData.pageInfo.totalPages}
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
  projectsData: PropTypes.object,
};
export default ProjectLists;
