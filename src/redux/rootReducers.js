import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import { projectReducer, SingleProjectReducer } from './project/reducers';
import { axiosSingleCrudReducer } from './crud/axios/reducers';
import dataTable from './data-filter/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  project: SingleProjectReducer,
  dataTable,
  SingleAxiosCrud: axiosSingleCrudReducer,
});

export default rootReducers;
