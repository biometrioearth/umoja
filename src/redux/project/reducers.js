import actions from './actions';

const {
  SET_REFETCH_BEGIN,
  ALL_PROJECT_BEGIN,
  ALL_PROJECT_SUCCESS,
  ALL_PROJECT_ERR,

  SINGLE_PROJECT_BEGIN,
  SINGLE_PROJECT_SUCCESS,
  SINGLE_PROJECT_ERR,

  FILTER_PROJECT_BEGIN,
  FILTER_PROJECT_SUCCESS,
  FILTER_PROJECT_ERR,

  SORTING_PROJECT_BEGIN,
  SORTING_PROJECT_SUCCESS,
  SORTING_PROJECT_ERR,
} = actions;

const initialStateFilter = {
  data: null,
  loading: false,
  error: null,
};

const projectReducer = (state = initialStateFilter, action) => {
  const { type, data, err, refetch } = action;
  switch (type) {
    case SET_REFETCH_BEGIN:
      return {
        ...initialStateFilter,
        refetch,
      };
    case ALL_PROJECT_BEGIN:
      return {
        ...initialStateFilter,
        loading: true,
      };
    case ALL_PROJECT_SUCCESS:
      return {
        ...initialStateFilter,
        data,
        loading: false,
      };
    case ALL_PROJECT_ERR:
      return {
        ...initialStateFilter,
        error: err,
        loading: false,
      };

    case FILTER_PROJECT_BEGIN:
      return {
        ...initialStateFilter,
        loading: true,
      };
    case FILTER_PROJECT_SUCCESS:
      return {
        ...initialStateFilter,
        data,
        loading: false,
      };
    case FILTER_PROJECT_ERR:
      return {
        ...initialStateFilter,
        error: err,
        loading: false,
      };
    case SORTING_PROJECT_BEGIN:
      return {
        ...initialStateFilter,
        loading: true,
      };
    case SORTING_PROJECT_SUCCESS:
      return {
        ...initialStateFilter,
        data,
        loading: false,
      };
    case SORTING_PROJECT_ERR:
      return {
        ...initialStateFilter,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const SingleProjectReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SINGLE_PROJECT_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case SINGLE_PROJECT_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case SINGLE_PROJECT_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export { SingleProjectReducer, projectReducer };
