/* eslint-disable no-use-before-define */
import { gql } from '@apollo/client';
import actions from './actions';
import client from '../../config/client';
// import { GET_ALL_PROJECTS } from '../query';

import initialState from '../../demoData/projectData.json';

const {
  // setRefetchBegin,
  allProjectBegin,
  allProjectSuccess,
  allProjectErr,

  singleProjectBegin,
  singleProjectSuccess,
  singleProjectErr,

  filterProjectBegin,
  filterProjectSuccess,
  filterProjectErr,

  sortingProjectBegin,
  sortingProjectSuccess,
  sortingProjectErr,
} = actions;

const GET_ALL_PROJECTS = gql`
  query allProjects {
    allProjects {
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
        title
        shortname
        projectHash
        sequenceInterval
        description
        countries {
          name
        }
        contacts
        duration
        temporality
        projectConfiguration {
          value
          description
        }
      }
    }
  }
`;
const fetchAllProject = () => {
  return async (dispatch) => {
    try {
      dispatch(allProjectBegin());
      const { data, error } = await client.query({
        query: GET_ALL_PROJECTS,
      });
      // refetch();
      if (!error) {
        console.log('I was refetched');

        dispatch(allProjectSuccess(data.allProjects));
      }
    } catch (errors) {
      dispatch(allProjectErr(errors.message));
    }
  };
};

const setRefetchFunction = (refetch) => {
  return {
    type: 'SET_REFETCH_FUNCTION',
    payload: refetch,
  };
};

const filterSinglePage = (paramsId) => {
  return async (dispatch) => {
    try {
      dispatch(singleProjectBegin());
      const newdata = initialState.filter((project) => {
        return project.id === parseInt(paramsId, 10);
      });
      dispatch(singleProjectSuccess(newdata));
    } catch (err) {
      dispatch(singleProjectErr(err));
    }
  };
};

const filterProjectByStatus = (status) => {
  return async (dispatch) => {
    try {
      dispatch(filterProjectBegin());
      const newdata = initialState.filter((project) => {
        if (status !== 'all') {
          return project.status === status;
        }
        return initialState;
      });
      dispatch(filterProjectSuccess(newdata));
    } catch (err) {
      dispatch(filterProjectErr(err.toString()));
    }
  };
};

const sortingProjectByCategory = (sortBy) => {
  return async (dispatch) => {
    try {
      dispatch(sortingProjectBegin());
      const newdata = initialState.sort((a, b) => {
        return b[sortBy] - a[sortBy];
      });

      setTimeout(() => {
        dispatch(sortingProjectSuccess(newdata));
      }, 500);
    } catch (err) {
      dispatch(sortingProjectErr(err));
    }
  };
};
export { filterSinglePage, filterProjectByStatus, sortingProjectByCategory, fetchAllProject, setRefetchFunction };
