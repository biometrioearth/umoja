/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';

const { Option } = Select;

function CreateProject({ visible, onCancel, projectType }) {
  const [form] = Form.useForm();

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

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      className="update"
      type={state.modalType}
      title="Create Project"
      visible={state.visible}
      footer={[
        <div key="1" className="flex items-center flex-wrap gap-[10px] pt-[10px] px-[14px] pb-3 text-start">
          <Button
            size="default"
            type="primary"
            key="submit"
            className="px-5 font-medium h-11 bg-primary rounded-full"
            onClick={handleOk}
          >
            Add New Project
          </Button>
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
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="px-1.5">
        <Form form={form} name="createProject" onFinish={handleOk}>
          <Form.Item
            name="project"
            label=""
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Project Title" />
          </Form.Item>
          <Form.Item
            name="shortname"
            label=""
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Short Name" />
          </Form.Item>
          {projectType === 'sampling-area' && (
            <>
              <Form.Item name="Choose Site" initialValue="" label="">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 "
                  style={{ width: '100%' }}
                >
                  <Option value="">Sites</Option>
                  <Option value="one">Site One</Option>
                  <Option value="two">Site Two</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Choose Sampling Point" initialValue="" label="">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 "
                  style={{ width: '100%' }}
                >
                  <Option value="">Sampling Points</Option>
                  <Option value="one">Point One</Option>
                  <Option value="two">Point Two</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Choose Sampling Area" initialValue="" label="">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 "
                  style={{ width: '100%' }}
                >
                  <Option value="">Sampling Area</Option>
                  <Option value="one">Area One</Option>
                  <Option value="two">Area Two</Option>
                </Select>
              </Form.Item>
            </>
          )}
          {projectType === 'sampling-point' && (
            <>
              <Form.Item name="Choose Sampling Point" initialValue="" label="">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 "
                  style={{ width: '100%' }}
                >
                  <Option value="">Sampling Points</Option>
                  <Option value="one">Point One</Option>
                  <Option value="two">Point Two</Option>
                </Select>
              </Form.Item>
            </>
          )}
          {projectType === 'sites' && (
            <>
              <Form.Item name="Choose Site" initialValue="" label="">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 "
                  style={{ width: '100%' }}
                >
                  <Option value="">Sites</Option>
                  <Option value="one">Site One</Option>
                  <Option value="two">Site Two</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Choose Sampling Point" initialValue="" label="">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 "
                  style={{ width: '100%' }}
                >
                  <Option value="">Sampling Points</Option>
                  <Option value="one">Point One</Option>
                  <Option value="two">Point Two</Option>
                </Select>
              </Form.Item>
            </>
          )}
          <Form.Item name="country Site" initialValue="" label="">
            <Select
              className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 "
              style={{ width: '100%' }}
            >
              <Option value="">Select Country</Option>
              <Option value="germany">Germany</Option>
              <Option value="mexico">Mexico</Option>
              <Option value="northamerica">North America</Option>
              <Option value="kenya">Kenya</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label=""
            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white87 [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white87 [&>.ant-form-item-row>div>div>div>input]:rounded-md dark:[&>.ant-form-item-row>div>div>div>textarea]:border-white10"
          >
            <Input.TextArea rows={4} placeholder="Project Description" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

CreateProject.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default CreateProject;
