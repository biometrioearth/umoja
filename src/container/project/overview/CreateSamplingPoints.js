/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Form, Input, Select, DatePicker } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { CREATE_SAMPLING_POINT_MUTATION } from '../../../redux/mutation';
// import { fetchAllUsers } from '../../../redux/profile/actionCreator';

const { Option } = Select;

function CreateSamplingPoint({
  visible,
  onCancel,
  projectType,
  onCreateSamplingPoint,
  id,
  project,
  devices,
  projectId,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    form.setFieldsValue(project);
    return () => {};
  }, [id, form]);

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

  console.log({ projectId });
  // Use the useMutation hook to execute the createProject mutation
  const [createSamplingPoint, { loading: createLoading }] = useMutation(CREATE_SAMPLING_POINT_MUTATION, {
    variables: {
      // project: projectId,
      // device: payload.device,
      dateDeployment: payload.dateDeployment,
      dateCollected: payload.dateCollected,
      location: `{ "type": "Point", "coordinates": [${payload.location}] }`,
      altitude: +payload.altitude,
    },
    onCompleted: (data) => {
      setIsLoading(createLoading);
      if (data?.createSamplingPoint?.errors?.length > 0) {
        window.notify('error', data?.createSamplingPoint?.errors[0]?.messages.join(', '));
      } else {
        window.notify('success', 'Sampling Point Added!');
        onCreateSamplingPoint(data);
        form.resetFields();
      }
    },
    onError: (errors) => {
      window.notify('error', errors.message);
      // Handle error, e.g., show an error message
    },
  });

  const validatePointScalar = (value) => {
    // Implement your validation logic here
    // Check if the value matches the expected format for a PointScalar
    // Return true if valid, false otherwise
    /^POINT\((-?\d+(\.\d+)?),(-?\d+(\.\d+)?)\)$/i.test(value);
    return true;
  };

  const handleSubmit = useCallback(
    (values) => {
      validatePointScalar(validatePointScalar(values.location));
      setPayload(values);
      createSamplingPoint({
        variables: {
          // project: projectId,
          // device: values.device,
          dateDeployment: values.dateDeployment,
          dateCollected: values.dateCollected,
          location: `{ "type": "Point", "coordinates": [${values.location}] }`,
          altitude: +values.altitude,
        },
      });
      // dispatch(login(values, () => history('/dashboard')));
    },
    [dispatch],
  );
  // const handleSubmit = (values) => {
  //   setPayload(values);
  //   createProjectMutation();
  // };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      className="update"
      type={state.modalType}
      title="Add Sampling Point"
      visible={state.visible}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="px-1.5">
        <Form form={form} layout="vertical" name="createProject" onFinish={handleSubmit}>
          <Form.Item
            name="device"
            label="Choose a Device"
            rules={[{ message: 'Please Select a device!', required: true }]}
            className="mt-4"
            style={{ width: '100%' }}
          >
            <Select
              placeholder="Choose a Device"
              className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#666D92] dark:[&>div>.ant-select-selection-item]:text-white60 "
            >
              {devices?.items?.map((device) => (
                <Option key={device.id} value={device.id}>
                  {device.serialNumber}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="dateDeployment" label="Date of Deployment" style={{ width: '100%' }}>
            <DatePicker
              className="border-normal dark:border-white10 h-[50px] min-w-[250px]"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item name="dateCollected" label="Date of Collected" style={{ width: '100%' }}>
            <DatePicker
              className="border-normal dark:border-white10 h-[50px] min-w-[250px]"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ message: 'Please input a location!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Enter location (latitude, longitude)" type="text" />
          </Form.Item>
          <Form.Item
            label="Altitude"
            name="altitude"
            rules={[{ message: 'Please input an altitude!', required: false }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Altitude" type="number" step="any" />
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
                {isLoading ? 'Loading...' : 'Add Point'}
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

CreateSamplingPoint.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onCreateSamplingPoint: propTypes.func,
  id: propTypes.string,
  project: propTypes.object,
  devices: propTypes.any,
  projectId: propTypes.string,
};

export default CreateSamplingPoint;
