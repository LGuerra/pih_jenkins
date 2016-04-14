import { combineReducers } from 'redux';

import reportReducers from './reportReducers';

const rootReducer = combineReducers({
  report: reportReducers
});

export default rootReducer;