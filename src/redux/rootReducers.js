import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import { projectReducer, SingleProjectReducer } from './project/reducers';
import { deviceReducer } from './device/reducers';
import dataTable from './data-filter/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  project: SingleProjectReducer,
  devices: deviceReducer,
  dataTable,
});

export default rootReducers;
