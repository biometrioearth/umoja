const actions = {
  SET_REFETCH_BEGIN: 'SET_REFETCH_BEGIN',
  ALL_DEVICE_BEGIN: 'ALL_DEVICE_BEGIN',
  ALL_DEVICE_SUCCESS: 'ALL_DEVICE_SUCCESS',
  ALL_DEVICE_ERR: 'ALL_DEVICE_ERR',

  setRefetchBegin: (refetch) => {
    return {
      type: actions.SET_REFETCH_BEGIN,
      payload: refetch,
    };
  },

  allDeviceBegin: () => {
    return {
      type: actions.ALL_DEVICE_BEGIN,
    };
  },

  allDeviceSuccess: (data) => {
    return {
      type: actions.ALL_DEVICE_SUCCESS,
      data,
    };
  },

  allDeviceErr: (err) => {
    return {
      type: actions.ALL_DEVICE_ERR,
      err,
    };
  },
};

export default actions;
