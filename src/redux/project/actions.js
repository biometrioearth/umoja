const actions = {
  SET_REFETCH_BEGIN: 'SET_REFETCH_BEGIN',
  ALL_PROJECT_BEGIN: 'ALL_PROJECT_BEGIN',
  ALL_PROJECT_SUCCESS: 'ALL_PROJECT_SUCCESS',
  ALL_PROJECT_ERR: 'ALL_PROJECT_ERR',

  CREATE_PROJECT_BEGIN: 'CREATE_PROJECT_BEGIN',
  CREATE_PROJECT_SUCCESS: 'CREATE_PROJECT_SUCCESS',
  CREATE_PROJECT_ERR: 'CREATE_PROJECT_ERR',

  SINGLE_PROJECT_BEGIN: 'SINGLE_PROJECT_BEGIN',
  SINGLE_PROJECT_SUCCESS: 'SINGLE_PROJECT_SUCCESS',
  SINGLE_PROJECT_ERR: 'SINGLE_PROJECT_ERR',

  FILTER_PROJECT_BEGIN: 'FILTER_PROJECT_BEGIN',
  FILTER_PROJECT_SUCCESS: 'FILTER_PROJECT_SUCCESS',
  FILTER_PROJECT_ERR: 'FILTER_PROJECT_ERR',

  SORTING_PROJECT_BEGIN: 'SORTING_PROJECT_BEGIN',
  SORTING_PROJECT_SUCCESS: 'SORTING_PROJECT_SUCCESS',
  SORTING_PROJECT_ERR: 'SORTING_PROJECT_ERR',

  setRefetchBegin: (refetch) => {
    return {
      type: actions.SET_REFETCH_BEGIN,
      payload: refetch,
    };
  },

  allProjectBegin: () => {
    return {
      type: actions.ALL_PROJECT_BEGIN,
    };
  },

  allProjectSuccess: (data) => {
    return {
      type: actions.ALL_PROJECT_SUCCESS,
      data,
    };
  },

  allProjectErr: (err) => {
    return {
      type: actions.ALL_PROJECT_ERR,
      err,
    };
  },

  createProjectBegin: () => {
    return {
      type: actions.CREATE_PROJECT_BEGIN,
    };
  },

  createProjectSuccess: (data) => {
    return {
      type: actions.CREATE_PROJECT_SUCCESS,
      data,
    };
  },

  createProjectErr: (err) => {
    return {
      type: actions.CREATE_PROJECT_ERR,
      err,
    };
  },

  singleProjectBegin: () => {
    return {
      type: actions.SINGLE_PROJECT_BEGIN,
    };
  },

  singleProjectSuccess: (data) => {
    return {
      type: actions.SINGLE_PROJECT_SUCCESS,
      data,
    };
  },

  singleProjectErr: (err) => {
    return {
      type: actions.SINGLE_PROJECT_ERR,
      err,
    };
  },

  filterProjectBegin: () => {
    return {
      type: actions.FILTER_PROJECT_BEGIN,
    };
  },

  filterProjectSuccess: (data) => {
    return {
      type: actions.FILTER_PROJECT_SUCCESS,
      data,
    };
  },

  filterProjectErr: (err) => {
    return {
      type: actions.FILTER_PROJECT_ERR,
      err,
    };
  },

  sortingProjectBegin: () => {
    return {
      type: actions.SORTING_PROJECT_BEGIN,
    };
  },

  sortingProjectSuccess: (data) => {
    return {
      type: actions.SORTING_PROJECT_SUCCESS,
      data,
    };
  },

  sortingProjectErr: (err) => {
    return {
      type: actions.SORTING_PROJECT_ERR,
      err,
    };
  },
};

export default actions;
