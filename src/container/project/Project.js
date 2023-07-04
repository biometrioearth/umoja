import React, { lazy, useState, Suspense, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Row, Col, Spin, Input } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { SearchOutlined } from '@ant-design/icons';
import CreateProject from './overview/CreateProject';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
// import { ProjectFieldEnum, InputTypeEnum, SearchOperatorEnum } from '../../redux/mutation';

const List = lazy(() => import('./overview/List'));

function Project() {
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState('');

  const GET_ALL_PROJECTS = gql`
    query allProjects(
      $search: String
      $sort: [ProjectSortTypeInput]
      $filters: ProjectFilterTypeInput
      $page: Int!
      $pageSize: Int!
    ) {
      allProjects(search: $search, sort: $sort, filters: $filters, page: $page, pageSize: $pageSize) {
        pageInfo {
          totalCount
          totalPages
          hasNextPage
          hasPrevPage
          pageSize
          currentPage
        }
        items {
          id
          updatedAt
          createdAt
          title
          shortname
          projectHash
          sequenceInterval
          description
          countries {
            name
          }
          contacts
          duration
          temporality
          projectConfiguration {
            value
            description
          }
        }
      }
    }
  `;

  const { data, error, loading, refetch } = useQuery(GET_ALL_PROJECTS, {
    variables: {
      search: searchText,
      // filters: {
      //   filters: [
      //     {
      //       field: null,
      //       value: null,
      //     },
      //   ],
      // },
      // filters: {
      //   field: ProjectFieldEnum.title,
      //   value: searchText,
      //   valueType: InputTypeEnum.string,
      //   operator: SearchOperatorEnum.contains,
      // },
      sort: [
        { order: 'DESC', field: 'countries' },
        { order: 'ASC', field: 'title' },
        // Add more sorting configurations as needed
      ],
      pageSize: 10,
      page: 1,
    },
  });

  useEffect(() => {
    if (!error && !loading) {
      setProjects(data.allProjects);
    }
    if (error) {
      window.notify('error', error);
    }
  }, [data]);

  const handleRefetch = () => {
    refetch();
  };
  const searchData = useSelector((state) => state.headerSearchData);

  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    visibledelete: false,
    projectId: '',
    categoryActive: 'all',
  });

  // const handleAlertClose = () => {
  //   setShowErrorAlert(false);
  // };

  const { visible } = state;

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    handleRefetch();
    refetch({ search: searchText });
  }, [searchText]);

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const handleCreateProject = async () => {
    try {
      handleRefetch();
      onCancel();
    } catch (errors) {
      onCancel();
    }
  };

  const paginateData = async (current, pageSize) => {
    refetch({ page: current, pageSize });
  };

  const filterSort = async (pagination, filters, sorter) => {
    const { column, columnKey, ...sortFields } = sorter;
    const renamedSortFields = {
      ...sortFields,
      order: sortFields.order === 'descend' ? 'DESC' : 'ASC',
    };
    // const updatedFilters = filters?.title?.map((item) => {
    //   return {
    //     field: 'title',
    //     value: item,
    //   };
    // });
    // console.log({ updatedFilters });
    refetch({ sort: renamedSortFields });
  };

  return (
    <>
      {/* {showErrorAlert && <CustomAlert type="error" message={error.message} onClose={handleAlertClose} />} */}
      <div className="flex items-center justify-between flex-wrap gap-[20px] ssm:flex-col pt-[42px] pb-[35px] px-[25px] text-dark dark:text-white87 font-medium text-[17px]">
        <div className="inline-flex items-center">
          <Heading as="h4" className="text-dark dark:text-white87 text-[22px] font-semibold mb-0">
            Projects
          </Heading>
          {/* <span className="relative ltr:ml-3 rtl:mr-3 ltr:pl-[15px] rtl:pr-[15px] text-body dark:text-white60 text-[15px] font-medium before:absolute before:top-0 ltr:before:left-0 rtl:before:right-0 before:w-[1px] before:h-6 before:bg-normal dark:before:bg-white10">
            Projects
          </span> */}
        </div>
        <Button
          onClick={showModal}
          className="px-5 text-sm  font-semibold text-white rounded-full h-11"
          size="default"
          type="primary"
          key="1"
        >
          <Link to="#" className="flex items-center gap-[6px]">
            <UilPlus className="w-[14px] h-[14px]" /> Create Projects
          </Link>
        </Button>
      </div>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xs={24}>
            <div className="flex items-center w-full mb-[25px] flex-wrap justify-between">
              <div className="flex items-center flex-wrap gap-[20px]  lg:justify-center">
                <div className="min-3xl:[&>div.ant-select]:w-[350px] ssm:[&>div.ant-select]:w-full [&>div>div.ant-select-selector]:border-0">
                  <Input
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search projects"
                    className="bg-white px-5 border outline-none border-regular dark:border-primary shadow-none rounded-[100px] [&>input]:!bg-transparent dark:[&>input]:!bg-transparent h-[38px]"
                    suffix={
                      <SearchOutlined className="flex text-light dark:text-white87 [&>svg]:text-light dark:[&>svg]:text-white87" />
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <Suspense
                fallback={
                  <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
                    <Spin />
                  </div>
                }
              >
                <Routes>
                  {/* <Route index element={<List projectsData={data.allProjects} />} />
                  <Route path="list" element={<List projectsData={data.allProjects} />} /> */}
                  <Route
                    index
                    element={<List projectsData={projects} filterSort={filterSort} paginateData={paginateData} />}
                  />
                  <Route
                    path="list"
                    element={<List projectsData={projects} filterSort={filterSort} paginateData={paginateData} />}
                  />
                </Routes>
              </Suspense>
            </div>
          </Col>
        </Row>
        <CreateProject onCancel={onCancel} visible={visible} onCreateProject={handleCreateProject} />
        {/* <DeleteModal
          onCancel={onDeleteCancel}
          visible={visibledelete}
          id={projectId}
          onDeleteModal={handleDeleteProject}
        /> */}
      </main>
    </>
  );
}

export default Project;
