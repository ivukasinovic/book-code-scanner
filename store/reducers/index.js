import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import loaderReducer from './LoaderReducer';
import errorReducer from './ErrorReducer';
import ScannerReducer from './ScannerReducer';

export default combineReducers({
  userReducer,
  loaderReducer,
  errorReducer,
  ScannerReducer
});
