import React, { lazy, useState, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Select } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import CreateDevice from './overview/CreateDevice';
import Heading from '../../components/heading/heading';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { fetchAllDevice } from '../../redux/device/actionCreator';

const List = lazy(() => import('./overview/List'));

function Device() {
  const dispatch = useDispatch();
  const { data, refetch } = useSelector((state) => state.devices);

  useEffect(() => {
    dispatch(fetchAllDevice());
  }, []);

  console.log({ data });

  const [searchText, setSearchText] = useState('');

  const searchData = useSelector((state) => state.headerSearchData);

  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    visibledelete: false,
    categoryActive: 'all',
  });

  // const handleAlertClose = () => {
  //   setShowErrorAlert(false);
  // };

  const { notData, visible } = state;
  const handleSearch = () => {
    const newdata = searchData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: newdata,
    });
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

  const handleCreateDevice = async () => {
    try {
      // showDeleteModal(id);
      await refetch();
      dispatch(fetchAllDevice());
      onCancel();
    } catch (errors) {
      onCancel();
    }
  };
  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-[20px] ssm:flex-col pt-[42px] pb-[35px] px-[25px] text-dark dark:text-white87 font-medium text-[17px]">
        <div className="inline-flex items-center">
          <Heading as="h4" className="text-dark dark:text-white87 text-[22px] font-semibold mb-0">
            Devices
          </Heading>
        </div>
        <Button
          onClick={showModal}
          className="px-5 text-sm  font-semibold text-white rounded-full h-11"
          size="default"
          type="primary"
          key="1"
        >
          <Link to="#" className="flex items-center gap-[6px]">
            <UilPlus className="w-[14px] h-[14px]" /> Add Device
          </Link>
        </Button>
      </div>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xs={24}>
            <div className="flex items-center w-full mb-[25px] flex-wrap justify-between">
              <div className="flex items-center flex-wrap gap-[20px]  lg:justify-center">
                <div className="min-3xl:[&>div.ant-select]:w-[350px] ssm:[&>div.ant-select]:w-full [&>div>div.ant-select-selector]:border-0">
                  <AutoComplete
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onSearch={handleSearch}
                    dataSource={notData}
                    placeholder="Search devices"
                    patterns
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center lg:justify-center gap-[20px]">
                  <span className="text-body dark:text-white60">Sort By:</span>
                  <Select
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
                  <Route index element={<List devicesData={data} />} />
                  <Route path="list" element={<List devicesData={data} />} />
                </Routes>
              </Suspense>
            </div>
          </Col>
        </Row>
        <CreateDevice onCancel={onCancel} visible={visible} onCreateDevice={handleCreateDevice} />
      </main>
    </>
  );
}

export default Device;
