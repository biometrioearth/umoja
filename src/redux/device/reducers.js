import actions from './actions';

const { SET_REFETCH_BEGIN, ALL_DEVICE_BEGIN, ALL_DEVICE_SUCCESS, ALL_DEVICE_ERR } = actions;

const initialStateFilter = {
  data: null,
  loading: false,
  error: null,
};

const deviceReducer = (state = initialStateFilter, action) => {
  const { type, data, err, refetch } = action;
  switch (type) {
    case SET_REFETCH_BEGIN:
      return {
        ...initialStateFilter,
        refetch,
      };
    case ALL_DEVICE_BEGIN:
      return {
        ...initialStateFilter,
        loading: true,
      };
    case ALL_DEVICE_SUCCESS:
      return {
        ...initialStateFilter,
        data,
        loading: false,
      };
    case ALL_DEVICE_ERR:
      return {
        ...initialStateFilter,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export { deviceReducer };
