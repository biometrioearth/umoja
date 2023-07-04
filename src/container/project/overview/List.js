/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Row, Col, Table, Pagination } from 'antd';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Heading from '../../../components/heading/heading';
import { GlobalUtilityStyle, PaginationStyle } from '../../styled';
// import { fetchAllProject } from '../../../redux/project/actionCreator';

function ProjectLists(props) {
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const searchInput = useRef(null);
  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };
  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText('');
  // };

  const { projectsData, filterSort, paginateData } = props;

  const dataSource = [];
  if (projectsData?.items && projectsData?.items && projectsData?.items?.length)
    projectsData?.items.map((value) => {
      const { id, title, shortname, temporality, projectConfiguration, createdAt } = value;
      const url = `/dashboard/project/projectDetails/${id}`;
      return dataSource.push({
        key: id,
        title: (
          <>
            <Heading as="h4" className="mb-[5px] text-dark dark:text-white87 text-[15px] font-medium">
              <Link to={url} state={{ project: value }} className="text-dark dark:text-white87">
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
        created_at: (
          <span className="text-body dark:text-white60 text-[15px] font-medium">
            {new Date(createdAt).toDateString()}
          </span>
        ),
      });
    });
  // const filteredArray = projectsData?.items?.reduce((accumulator, current) => {
  //   const existingItem = accumulator.find((item) => item.title === current.title);
  //   if (!existingItem) {
  //     accumulator.push(current);
  //   }
  //   return accumulator;
  // }, []);

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //       onKeyDown={(e) => e.stopPropagation()}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: 'block',
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: false,
  //             });
  //             setSearchText(selectedKeys[0]);
  //             setSearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             close();
  //           }}
  //         >
  //           close
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? '#1677ff' : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: '#ffc069',
  //           padding: 0,
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      className: 'text-light dark:text-white60 text-[15px] py-2.5 last:text-end border-none before:hidden',
      // filters: filteredArray?.map((data) => {
      //   return {
      //     text: data.title,
      //     value: data.title,
      //   };
      // }),
      // onFilter: (value, record) => {
      //   const { title } = record;
      //   if (typeof title === 'string') {
      //     return title.includes(value);
      //   }
      //   return false;
      // },
      // ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend', 'ascend'],
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
      dataIndex: 'created_at',
      key: 'created_at',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
      sorter: (a, b) => a.created_at - b.created_at,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      className: 'text-light dark:text-white60 text-[15px] last:text-end border-none before:hidden',
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
              <Table dataSource={dataSource} columns={columns} onChange={onChange} pagination={false} />
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
                  current={projectsData.pageInfo.currentPage}
                  pageSize={projectsData.pageInfo.pageSize}
                  defaultCurrent={projectsData.pageInfo.totalPages}
                  total={projectsData.pageInfo.totalCount}
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
  projectsData: PropTypes.any,
  filterSort: PropTypes.func,
  paginateData: PropTypes.func,
};
export default ProjectLists;
