import React, { lazy, useState, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Select } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import CreateProject from './overview/CreateProject';
import Heading from '../../components/heading/heading';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { sortingProjectByCategory } from '../../redux/project/actionCreator';

const SamplingAreas = lazy(() => import('./overview/SamplingAreas'));

function Project() {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.headerSearchData);

  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',
  });

  const { notData, visible } = state;
  const handleSearch = (searchText) => {
    const data = searchData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = (selectedItems) => {
    dispatch(sortingProjectByCategory(selectedItems));
  };
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
  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-[20px] ssm:flex-col pt-[42px] pb-[35px] px-[25px] text-dark dark:text-white87 font-medium text-[17px]">
        <div className="inline-flex items-center">
          <Heading as="h4" className="text-dark dark:text-white87 text-[22px] font-semibold mb-0">
            Projects | Sites | Sampling Areas | Sampling Points
          </Heading>
          <span className="relative ltr:ml-3 rtl:mr-3 ltr:pl-[15px] rtl:pr-[15px] text-body dark:text-white60 text-[15px] font-medium before:absolute before:top-0 ltr:before:left-0 rtl:before:right-0 before:w-[1px] before:h-6 before:bg-normal dark:before:bg-white10">
            12 Running Projects
          </span>
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
            <div className="flex items-center w-full mb-[25px] flex-wrap justify-between 3xl:justify-center gap-[15px]">
              <div className="flex items-center flex-wrap gap-[20px]  lg:justify-center">
                <div className="min-3xl:[&>div.ant-select]:w-[350px] ssm:[&>div.ant-select]:w-full [&>div>div.ant-select-selector]:border-0">
                  <AutoComplete onSearch={handleSearch} dataSource={notData} placeholder="Search projects" patterns />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center lg:justify-center gap-[20px]">
                  <span className="text-body dark:text-white60">Sort By:</span>
                  <Select
                    onChange={onSorting}
                    defaultValue="category"
                    className="min-w-[260px] ltr:ml-[5px] rtl:mr-[5px] [&>div.ant-select-selector]:border-none [&>div>span.ant-select-selection-item]:text-body dark:[&>div>span.ant-select-selection-item]:text-white60 dark:text-white60 [&>span>span>svg]:text-body dark:[&>span>span>svg]:text-white60 "
                  >
                    <Select.Option value="category">Country</Select.Option>
                    <Select.Option value="rate">Germany</Select.Option>
                    <Select.Option value="popular">Mexico</Select.Option>
                  </Select>
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
                  <Route path="sampling-areas" element={<SamplingAreas />} />
                </Routes>
              </Suspense>
            </div>
          </Col>
        </Row>
        <CreateProject onCancel={onCancel} visible={visible} projectType="sampling-area" />
      </main>
    </>
  );
}

export default Project;
