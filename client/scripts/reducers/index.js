import { combineReducers } from 'redux';

import reportReducers from './report_reducers';
import landingReducers from './landing_reducers';

const rootReducer = combineReducers({
  report: reportReducers,
  landing: landingReducers
});

export default rootReducer;