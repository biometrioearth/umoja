import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import UilEditAlt from '@iconscout/react-unicons/icons/uil-edit-alt';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import FileListCard from './overview/FileListCard';
import { useMutation } from '@apollo/client';
import CreateDevice from './overview/CreateDevice';
import Heading from '../../components/heading/heading';
import { alertModal } from '../../components/modals/antd-modals';
import { fetchAllDevice } from '../../redux/device/actionCreator';
// import CustomAlert from '../../components/alert';

import { DELETE_DEVICE_MUTATION } from '../../redux/mutation';

function DeviceDetails() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.data);
  const params = useParams();

  useEffect(() => {
    fetchAllDevice();
  }, [devices]);

  const [deleteDevice] = useMutation(DELETE_DEVICE_MUTATION);

  const handleDelete = async () => {
    const { id } = params;
    try {
      const { data } = await deleteDevice({
        variables: { id },
      });
      if (data?.deleteDevice?.errors === null) {
        // Handle successful deletion
        window.notify('success', data.deleteDevice?.message);
        history('/dashboard/device/view/list');
      } else {
        // Handle deletion failure
        window.notify('error', data?.deleteDevice?.errors[0]?.message);
      }
    } catch (error) {
      console.log({ error });
      // Handle error during deletion
    }
  };

  const showConfirm = () => {
    alertModal.confirm({
      title: 'Do you want to delete this device?',
      content: 'When clicked the OK button, this device will be deleted',
      onOk() {
        handleDelete();
      },
      onCancel() {},
    });
  };

  const [state, setState] = useState({
    visible: false,
  });

  // const handleAlertClose = () => {
  //   setShowErrorAlert(false);
  // };

  const { visible } = state;

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
      dispatch(fetchAllDevice());
      onCancel();
    } catch (errors) {
      onCancel();
    }
  };

  const singleDevice = devices?.items?.find((proj) => proj?.id === params.id);
  const { serialNumber, additionalIdentifier, deviceType, brand, status, createdAt, currentProject } = singleDevice;
  return (
    <>
      <div className="flex items-center justify-between pt-[42px] pb-[35px] px-[25px] flex-wrap gap-[15px] sm:justify-center">
        <div className="inline-flex flex-wrap items-center gap-5 md:justify-center">
          <Heading as="h4" className="text-dark dark:text-white87 text-[20px] font-semibold mb-0">
            {serialNumber}
          </Heading>
        </div>
        <div className="inline-flex items-center gap-x-5">
          <Link
            to=""
            onClick={showModal}
            className="flex items-center gap-x-1.5 bg-white dark:bg-white10 text-primary h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white10 rounded-md"
          >
            <UilEditAlt className="w-[14px] h-[14px]" />
            Edit
          </Link>
          <Link
            to="#"
            onClick={showConfirm}
            className="flex items-center gap-x-1.5 bg-white dark:bg-white10 dark:hover:bg-white30 text-danger h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white10 rounded-md transition duration-300"
          >
            <UilTrashAlt className="w-[14px] h-[14px]" />
            Remove
          </Link>
        </div>
      </div>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xxl={8} xl={8} xs={24}>
            <div className="bg-white h-full dark:bg-white10 mb-[25px] p-[25px] rounded-[10px] gap-[25px] flex flex-wrap min-xl:flex-col xl:justify-between">
              <div className="flex items-center gap-x-5">
                <Link
                  to="#"
                  className="flex items-center justify-center bg-warning text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilListUl className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white87 text-[20px] font-semibold mb-[3px]">
                    0
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Total Projects</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-x-5">
                <Link
                  to="#"
                  className="flex items-center justify-center bg-warning text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilWebGridAlt className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white87 text-[20px] font-semibold mb-[3px]">
                    500
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Total Sampling Point Set</p>
                </div>
              </div>
              <div className="flex items-center gap-x-5">
                <Link
                  to="#"
                  className="flex items-center justify-center bg-warning text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilClock className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white87 text-[20px] font-semibold mb-[3px]">
                    250
                  </Heading>
                  <p className="mb-0 text-body dark:text-white60">Active Devcies on Project</p>
                </div>
              </div> */}
            </div>
          </Col>
          <Col xxl={16} xl={16} xs={24}>
            <div className="bg-white h-full dark:bg-white10 min-4xl:min-h-[485px] mb-[25px] rounded-[10px]">
              <div className="px-[25px] py-[18px] border-b border-regular dark:border-white10">
                <Heading as="h3" className="m-0 text-lg font-semibold text-dark dark:text-white87">
                  About Device
                </Heading>
              </div>
              <div className="p-[25px]">
                <div className="grid grid-cols-2 mt-[42px] gap-x-4 gap-y-[8px] flex-wrap">
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Additional Identifier</span>
                    <p className="font-medium text-body dark:text-white60">{additionalIdentifier}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Device Type</span>
                    <p className="font-medium text-body dark:text-white60">{deviceType}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Brand</span>
                    <p className="font-medium text-primary">{brand}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Status</span>
                    <p className="font-medium text-primary">{status}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Date Created</span>
                    <p className="font-medium text-primary">{createdAt}</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white60 text-[13px]">Current Project</span>
                    <p className="font-medium text-primary">{currentProject}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* <Col xxl={8} xs={24}>
            <FileListCard />
          </Col> */}
        </Row>
        <CreateDevice
          onCancel={onCancel}
          devices={devices}
          id={params.id}
          visible={visible}
          onCreateDevice={handleCreateDevice}
        />
      </main>
    </>
  );
}

export default DeviceDetails;
