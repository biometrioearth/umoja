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
import countryData from '../../../demoData/countries.json';
import { CREATE_PROJECT_MUTATION, UPDATE_PROJECT_MUTATION } from '../../../redux/mutation';
// import { fetchAllUsers } from '../../../redux/profile/actionCreator';

const { Option } = Select;

function CreateProject({ visible, onCancel, projectType, onCreateProject, id, project }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [payload, setPayload] = useState({});

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const inputs = inputValue.split(',');

    const updatedData = inputs.map((input) => {
      const [name, contact] = input.split(':');

      let phone = '';
      let email = '';

      if (contact) {
        const contactValues = contact.trim().split(/\s+/);

        if (contactValues.length > 0) {
          phone = contactValues[0];
        }

        if (contactValues.length > 1) {
          const emailRegex = /^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b$/;
          const potentialEmail = contactValues.slice(1).join(' ');

          if (emailRegex.test(potentialEmail)) {
            email = potentialEmail;
          }
        }
      }

      return {
        name: name ? name.trim() : '',
        phone,
        email,
      };
    });

    setFormData(updatedData);
  };
  console.log({ formData });
  const [durationvalue, durationperiod] = project ? project.duration.split(' ') : '0 Days';
  const [temporalityvalue, temporalityperiod] = project ? project.temporality.split(' ') : '0 Days';
  const countries = project ? project.countries.map((country) => country.name) : '';
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

  // Use the useMutation hook to execute the createProject mutation
  const [createProjectMutation, { loading: createLoading, error: createError }] = useMutation(CREATE_PROJECT_MUTATION, {
    variables: {
      title: payload.title,
      shortname: payload.shortname,
      sequenceInterval: payload.sequenceInterval,
      description: payload.description,
      contacts: payload.contacts,
      duration: payload.duration,
      temporality: payload.temporality,
      projectConfiguration: payload.projectConfiguration,
      countries: payload.countries,
    },
    onCompleted: (data) => {
      setIsLoading(createLoading);
      if (data?.createProject?.errors?.length > 0 || data?.errors) {
        setIsLoading(false);
        window.notify('error', data?.createProject?.errors[0]?.messages.join(', ') || data?.errors[0]?.message);
      } else {
        window.notify('success', 'Project Added!');
        onCreateProject(data);
        form.resetFields();
      }
    },
    onError: () => {
      setIsLoading(false);
      window.notify('error', createError);
      // Handle error, e.g., show an error message
    },
  });

  const [updateProjectMutation, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_PROJECT_MUTATION, {
    variables: {
      id,
      title: payload.title,
      shortname: payload.shortname,
      sequenceInterval: payload.sequenceInterval,
      description: payload.description,
      contacts: payload.contacts,
      duration: payload.duration,
      temporality: payload.temporality,
      projectConfiguration: payload.projectConfiguration,
      countries: payload.countries,
    },
    onCompleted: (data) => {
      setIsLoading(updateLoading);
      if (data?.updateDevice?.errors?.length > 0) {
        window.notify('error', data?.updateProject?.errors[0]?.messages.join(', '));
      } else {
        window.notify('success', 'Project Updated!');
        onCreateProject(data);
      }
    },
    onError: (errors) => {
      window.notify('error', errors[0]?.message || updateError);
    },
  });

  const handleSubmit = useCallback(
    (values) => {
      setPayload(values);
      if (!id) {
        createProjectMutation({
          variables: {
            title: values.title,
            shortname: values.shortname,
            sequenceInterval: +values.sequenceInterval,
            description: values.description,
            contacts: values.contacts,
            duration: `${values.durationvalue} ${values.durationperiod}`,
            temporality: `${values.temporalityvalue} ${values.temporalityperiod}`,
            projectConfiguration: values.projectConfiguration,
            countries: values.countries,
          },
        });
      } else {
        updateProjectMutation({
          variables: {
            id,
            title: values.title,
            shortname: values.shortname,
            sequenceInterval: +values.sequenceInterval,
            description: values.description,
            contacts: values.contacts,
            duration: `${values.durationvalue} ${values.durationperiod}`,
            temporality: `${values.temporalityvalue} ${values.temporalityperiod}`,
            projectConfiguration: values.projectConfiguration,
            countries: values.countries,
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
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      className="update"
      type={state.modalType}
      title={id ? 'Update Project' : 'Create Project'}
      visible={state.visible}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="px-1.5">
        <Form form={form} layout="vertical" name="createProject" onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ message: 'Please input a title!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Project Title" type="text" />
          </Form.Item>
          <Form.Item
            name="shortname"
            label="Short Name"
            rules={[{ message: 'Please input a shortname!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="shortname" type="text" />
          </Form.Item>
          <Form.Item
            name="sequenceInterval"
            label="Sequence Interval"
            rules={[{ message: 'Please input a sequence interval!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Sequence Interval" type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ message: 'Please input a description!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input.TextArea rows={4} placeholder="Project Description" type="text" />
          </Form.Item>
          <div>
            <Form.Item
              name="contacts"
              label="Contacts"
              rules={[{ message: 'Please enter a contact', required: true }]}
              className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
            >
              <Input placeholder="Enter a contact!" type="string" onChange={handleInputChange} />
            </Form.Item>
          </div>
          <div className="flex space-x-4 justify-between items-center">
            <Form.Item
              name="durationvalue"
              label="Duration"
              initialValue={durationvalue}
              rules={[{ message: 'Please add a duration value!', required: true }]}
              className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              style={{ width: '50%' }}
            >
              <Input placeholder="Duration e.g 5" type="text" />
            </Form.Item>
            <Form.Item
              name="durationperiod"
              label=""
              initialValue={durationperiod}
              rules={[{ message: 'Please Select a period!', required: true }]}
              className="mt-8"
              style={{ width: '100%' }}
            >
              <Select
                placeholder="Select Duration Period"
                className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#666D92] dark:[&>div>.ant-select-selection-item]:text-white60 "
              >
                <Option value="days">Days</Option>
                <Option value="weeks">Weeks</Option>
                <Option value="months">Months</Option>
                <Option value="years">Years</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex space-x-4 justify-between items-center">
            <Form.Item
              name="temporalityvalue"
              label="Temporality"
              initialValue={temporalityvalue}
              rules={[{ message: 'Please add a temporality value!', required: true }]}
              className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              style={{ width: '50%' }}
            >
              <Input placeholder="Temporality e.g 5" type="text" />
            </Form.Item>
            <Form.Item
              name="temporalityperiod"
              label=""
              initialValue={temporalityperiod}
              rules={[{ message: 'Please Select a period!', required: true }]}
              className="mt-8"
              style={{ width: '100%' }}
            >
              <Select
                placeholder="Select Temporality Period"
                className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#666D92] dark:[&>div>.ant-select-selection-item]:text-white60 "
              >
                <Option value="days">Days</Option>
                <Option value="weeks">Weeks</Option>
                <Option value="months">Months</Option>
                <Option value="years">Years</Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="projectConfiguration"
              label="Project Configuration"
              rules={[{ message: 'Please choose a Project Configuration!', required: true }]}
              style={{ width: '100%' }}
            >
              <Select
                placeholder="Choose a Project Configuration"
                className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#666D92] dark:[&>div>.ant-select-selection-item]:text-white60"
              >
                <Option value="A_1">Only sampling points</Option>
                <Option value="A_2">Sampling points with sites</Option>
                <Option value="A_3">Sites, Sampling Areas and Sampling points</Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="countries"
              initialValue={countries}
              label=""
              rules={[{ message: 'Please Select a county!', required: true }]}
            >
              <Select
                className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#666D92] dark:[&>div>.ant-select-selection-item]:text-white60 "
                style={{ width: '100%' }}
                placeholder="Select Country"
                mode="tags"
              >
                {countryData.map((country) => (
                  <Option key={country.code || country.name} value={country.code || country.name}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
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
                {isLoading ? 'Loading...' : 'Add New Project'}
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

CreateProject.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onCreateProject: propTypes.func,
  id: propTypes.string,
  project: propTypes.object,
};

export default CreateProject;
