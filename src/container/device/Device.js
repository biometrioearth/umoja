import React, { lazy, useState, Suspense, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Row, Col, Spin, Input } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { SearchOutlined } from '@ant-design/icons';
import CreateDevice from './overview/CreateDevice';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { GET_ALL_DEVICES } from '../../redux/query';

const List = lazy(() => import('./overview/List'));

function Device() {
  const [devices, setDevices] = useState([]);
  const [searchText, setSearchText] = useState('');

  const { data, error, loading, refetch } = useQuery(GET_ALL_DEVICES, {
    variables: {
      search: searchText,
      sort: [
        { order: 'DESC', field: 'serial_number' },
        { order: 'ASC', field: 'device_type' },
        // Add more sorting configurations as needed
      ],
      pageSize: 10,
      page: 1,
    },
  });

  useEffect(() => {
    if (!error && !loading) {
      setDevices(data.allDevices);
    }
  }, [data]);

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

  const { visible } = state;

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
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

  const handleCreateDevice = async () => {
    try {
      // showDeleteModal(id);
      refetch();
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
    refetch({ sort: renamedSortFields });
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
                  <Input
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search Devices"
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
                  <Route
                    index
                    element={<List devicesData={devices} filterSort={filterSort} paginateData={paginateData} />}
                  />
                  <Route
                    path="list"
                    element={<List devicesData={devices} filterSort={filterSort} paginateData={paginateData} />}
                  />
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
