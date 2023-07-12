/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Form, Input, Select, DatePicker } from 'antd';
import propTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, useMapEvents, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { CREATE_SAMPLING_POINT_MUTATION } from '../../../redux/mutation';
import 'leaflet/dist/leaflet.css';
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
  const [locationValue, setLocationValue] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const customIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          window.notify('error', 'Error getting current position:', error);
        },
      );
    } else {
      window.notify('error', 'Geolocation is not supported by this browser');
    }
  }, []);

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
  console.log(projectId);

  // Use the useMutation hook to execute the createProject mutation
  const [createSamplingPoint, { loading: createLoading }] = useMutation(CREATE_SAMPLING_POINT_MUTATION, {
    variables: {
      // project: projectId,
      // device: payload.device,
      dateDeployment: payload.dateDeployment,
      dateCollected: payload.dateCollected,
      // location: coordinates || `{ "type": "Point", "coordinates": [${payload.location}] }`,
      location: `{ "type": "Point", "coordinates": [${payload.location}] }`,
      altitude: +payload.altitude,
    },
    onCompleted: (data) => {
      setIsLoading(createLoading);
      if (data?.createSamplingPoint?.errors?.length > 0) {
        setIsLoading(false);
        window.notify('error', data?.createSamplingPoint?.errors[0]?.messages.join(', '));
      } else {
        form.resetFields();
        setLocationValue('');
        setIsLoading(false);
        window.notify('success', 'Sampling Point Added!');
        onCreateSamplingPoint(data);
      }
    },
    onError: (errors) => {
      setIsLoading(false);
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
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onLocationChange = (e) => {
    return setLocationValue(e);
  };
  function MapEvents() {
    const map = useMapEvents({
      click(e) {
        setCoordinates(e.latlng);
        map.locate();
      },
      locationfound(e) {
        setCoordinates(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return null;
  }
  const handleSubmit = useCallback(
    (values) => {
      values.location =
        values.latitude === undefined
          ? `${coordinates.lat}, ${coordinates.lng}`
          : `${values.latitude}, ${values.longtitude}`;
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
    },
    [dispatch],
  );

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
            name="addLocation"
            label="Add Location"
            rules={[{ message: 'Please Select a device!', required: true }]}
            className="mt-4"
            style={{ width: '100%' }}
            value={locationValue}
            onChange={onLocationChange}
          >
            <Select
              placeholder="Add Location"
              value={locationValue}
              onChange={onLocationChange}
              className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#666D92] dark:[&>div>.ant-select-selection-item]:text-white60 "
            >
              <Option value="latlong">Add Location Longtitude and Latitude</Option>
              <Option value="map">Choose from Map</Option>
            </Select>
          </Form.Item>
          {locationValue === 'latlong' && (
            <div>
              <Form.Item
                label="Longtitude"
                name="longtitude"
                rules={[{ message: 'Please input a Longtitude cordinate!', required: true }]}
                className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              >
                <Input placeholder="Enter a Longtitude cordinate" type="number" />
              </Form.Item>
              <Form.Item
                label="Latitude"
                name="latitude"
                rules={[{ message: 'Please input a Latitude cordinate!', required: true }]}
                className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              >
                <Input placeholder="Enter a Latitude cordinate" type="number" />
              </Form.Item>
            </div>
          )}
          {locationValue === 'map' && (
            <>
              <div className="overflow-y-auto mb-5">
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px' }} scrollWheelZoom>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapEvents setCoordinates={setCoordinates} />
                  {/* <Marker position={coordinates} icon={customIcon} /> */}
                  {coordinates && (
                    <Marker position={coordinates} icon={customIcon}>
                      <Tooltip direction="top" offset={[0, -30]}>
                        Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
                      </Tooltip>
                    </Marker>
                  )}
                </MapContainer>
              </div>
              <div>
                <Form.Item
                  label="Longtitude"
                  initialValue={coordinates.lat}
                  className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                >
                  <Input placeholder="Enter a Longtitude cordinate" value={coordinates.lat} type="number" disabled />
                </Form.Item>
                <Form.Item
                  label="Latitude"
                  initialValue={coordinates.lng}
                  className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                >
                  <Input placeholder="Enter a Latitude cordinate" value={coordinates.lng} type="number" disabled />
                </Form.Item>
              </div>
            </>
          )}
          {/* <Form.Item
            label="Location"
            name="location"
            rules={[{ message: 'Please input a location!', required: true }]}
            className="mb-[26px] [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Enter location (latitude, longitude)" type="text" />
          </Form.Item> */}
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
