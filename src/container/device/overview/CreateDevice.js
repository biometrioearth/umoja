/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { CREATE_DEVICE_MUTATION, UPDATE_DEVICE_MUTATION } from '../../../redux/mutation';
// import { fetchAllUsers } from '../../../redux/profile/actionCreator';

const { Option } = Select;

function CreateDevice({ visible, onCancel, projectType, onCreateDevice, id, devices }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({});

  // const users = useSelector((state) => state.users);

  const [state, setState] = useState({
    visible,
    projectType,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const singleDevice = devices?.items?.find((device) => device.id === id);

  useEffect(() => {
    form.setFieldsValue(singleDevice);
    return () => {};
  }, [id, form]);

  // Use the useMutation hook to execute the createProject mutation
  const [createDeviceMutation, { loading }] = useMutation(CREATE_DEVICE_MUTATION, {
    variables: {
      serialNumber: payload.serialNumber,
      deviceType: payload.deviceType,
      brand: payload.brand,
      status: payload.status,
      additionalIdentifier: payload.additionalIdentifier,
    },
    onCompleted: (data) => {
      setIsLoading(loading);
      if (data?.createDevice?.errors?.length > 0) {
        window.notify('error', data?.createDevice?.errors[0]?.messages.join(', '));
      } else {
        window.notify('success', 'Device Added!');
        onCreateDevice(data);
      }
    },
    onError: (errors) => {
      window.notify('error', errors[0]?.message);
    },
  });

  const [updateDeviceMutation] = useMutation(UPDATE_DEVICE_MUTATION, {
    variables: {
      id,
      serialNumber: payload.serialNumber,
      deviceType: payload.deviceType,
      brand: payload.brand,
      status: payload.status,
      additionalIdentifier: payload.additionalIdentifier,
    },
    onCompleted: (data) => {
      setIsLoading(loading);
      if (data?.updateDevice?.errors?.length > 0) {
        window.notify('error', data?.updateDevice?.errors[0]?.messages.join(', '));
      } else {
        window.notify('success', 'Device Updated!');
        onCreateDevice(data);
      }
    },
    onError: (errors) => {
      window.notify('error', errors[0]?.message);
    },
  });

  const handleSubmit = useCallback(
    (values) => {
      setPayload(values);
      if (!id) {
        createDeviceMutation({
          variables: {
            serialNumber: values.serialNumber,
            deviceType: values.deviceType,
            brand: values.brand,
            status: values.status,
            additionalIdentifier: values.additionalIdentifier,
          },
        });
      } else {
        updateDeviceMutation({
          variables: {
            id,
            serialNumber: values.serialNumber,
            deviceType: values.deviceType,
            brand: values.brand,
            status: values.status,
            additionalIdentifier: values.additionalIdentifier,
          },
        });
      }

      // dispatch(login(values, () => history('/dashboard')));
    },
    [dispatch],
  );
  // const handleSubmit = (values) => {
  //   setPayload(values);
  //   createProjectMutation();
  // };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      className="update"
      type={state.modalType}
      title={id ? 'Update Device' : 'Add Device'}
      visible={state.visible}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="px-1.5">
        <Form form={form} layout="vertical" name="createProject" onFinish={handleSubmit}>
          <Form.Item
            label="Serial Number"
            name="serialNumber"
            rules={[{ message: 'Please input a serial number!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Serial Number" type="text" />
          </Form.Item>
          <Form.Item
            name="additionalIdentifier"
            label="Additional Identifier"
            rules={[{ message: 'Please input an Additional Identifier!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Additional Identifier" type="text" />
          </Form.Item>
          <Form.Item
            name="deviceType"
            label="Device Type"
            rules={[{ message: 'Please Select a device type!', required: true }]}
            className="mt-8"
            style={{ width: '100%' }}
          >
            <Select
              placeholder="Select device type"
              className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#666D92] dark:[&>div>.ant-select-selection-item]:text-white60 "
            >
              <Option value="CAMERA">Camera</Option>
              <Option value="RECORDER">Recorder</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ message: 'Please input a brand!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Brand" type="text" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ message: 'Please Select a device status!', required: true }]}
            className="mt-8"
            style={{ width: '100%' }}
          >
            <Select
              placeholder="Select status"
              className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#666D92] dark:[&>div>.ant-select-selection-item]:text-white60 "
            >
              <Option value="ACTIVE">Active</Option>
              <Option value="INACTIVE">Inactive</Option>
              <Option value="BROKEN">Broken</Option>
              <Option value="MISSING">Missing</Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end items-center flex-wrap gap-[10px] pt-[10px] px-[14px] text-end">
            {id ? (
              <Button
                size="default"
                type="primary"
                htmlType="submit"
                className="px-5 font-medium h-11 bg-primary rounded-full"
              >
                {isLoading ? 'Loading...' : 'Update Device'}
              </Button>
            ) : (
              <Button
                size="default"
                type="primary"
                htmlType="submit"
                className="px-5 font-medium h-11 bg-primary rounded-full"
              >
                {isLoading ? 'Loading...' : 'Add New Device'}
              </Button>
            )}
            <Button
              size="default"
              type="white"
              key="back"
              className="m-0 px-5 font-medium h-11  rounded-full"
              outlined
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

CreateDevice.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onCreateDevice: propTypes.func,
  id: propTypes.string,
  devices: propTypes.array,
};

export default CreateDevice;
