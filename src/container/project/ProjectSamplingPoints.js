import React, { lazy, useState, Suspense, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import CreateSamplingPoints from './overview/CreateSamplingPoints';
import Heading from '../../components/heading/heading';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { GET_ALL_DEVICES } from '../../redux/query';

const List = lazy(() => import('./overview/SamplingPoints'));

function ProjectSamplingPoints() {
  const [samplingpoints, setSamplingpoints] = useState([]);
  const [devices, setDevices] = useState([]);
  const params = useParams();

  const GET_ALL_SAMPLING_POINTS = gql`
    query allSamplingPoints {
      allSamplingPoints {
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
          identifier
          additionalIdentifier
          dateDeployment
          dateCollected
          location
          altitude
        }
      }
    }
  `;

  const { data, error, loading, refetch } = useQuery(GET_ALL_SAMPLING_POINTS);

  useEffect(() => {
    if (!error && !loading) {
      setSamplingpoints(data.allSamplingPoints);
    }
  }, [data]);

  const { data: deviceData, error: deviceError, loading: deviceLoading } = useQuery(GET_ALL_DEVICES);

  useEffect(() => {
    if (!deviceError && !deviceLoading) {
      setDevices(deviceData.allDevices);
    }
  }, [deviceData]);

  const handleRefetch = () => {
    refetch();
  };

  const [searchText, setSearchText] = useState('');
  const { id } = params;

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

  const handleCreateSamplingPoint = async () => {
    try {
      handleRefetch();

      onCancel();
    } catch (errors) {
      onCancel();
    }
  };

  return (
    <>
      {/* {showErrorAlert && <CustomAlert type="error" message={error.message} onClose={handleAlertClose} />} */}
      <div className="flex items-center justify-between flex-wrap gap-[20px] ssm:flex-col pt-[42px] pb-[35px] px-[25px] text-dark dark:text-white87 font-medium text-[17px]">
        <div className="inline-flex items-center">
          <Heading as="h4" className="text-dark dark:text-white87 text-[22px] font-semibold mb-0">
            Sampling Points
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
            <UilPlus className="w-[14px] h-[14px]" /> Add Sampling Points
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
                    placeholder="Search locations"
                    patterns
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
                  <Route index element={<List samplingData={samplingpoints} />} />
                  <Route path="list" element={<List samplingData={samplingpoints} />} />
                </Routes>
              </Suspense>
            </div>
          </Col>
        </Row>
        <CreateSamplingPoints
          onCancel={onCancel}
          devices={devices}
          visible={visible}
          projectId={id}
          onCreateSamplingPoint={handleCreateSamplingPoint}
        />
      </main>
    </>
  );
}

export default ProjectSamplingPoints;
