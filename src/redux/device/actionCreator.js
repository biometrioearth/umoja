/* eslint-disable no-use-before-define */
import { gql } from '@apollo/client';
import actions from './actions';
import client from '../../config/client';
// import { GET_ALL_PROJECTS } from '../query';

const {
  // setRefetchBegin,
  allDeviceBegin,
  allDeviceSuccess,
  allDeviceErr,
} = actions;

const GET_ALL_DEVICES = gql`
  query allDevices {
    allDevices {
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
        brand
        serialNumber
        additionalIdentifier
        deviceType
        status
        currentProject {
          title
          id
        }
      }
    }
  }
`;
const fetchAllDevice = () => {
  return async (dispatch) => {
    try {
      dispatch(allDeviceBegin());
      const { data, error } = await client.query({
        query: GET_ALL_DEVICES,
      });
      // refetch();
      console.log({ data });

      if (!error) {
        dispatch(allDeviceSuccess(data.allDevices));
      }
    } catch (errors) {
      dispatch(allDeviceErr(errors.message));
      window.notify('error', errors.message);
    }
  };
};

export { fetchAllDevice };
