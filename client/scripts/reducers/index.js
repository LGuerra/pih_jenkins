import { combineReducers } from 'redux';

import reportReducers from './reportReducers';
import landingReducers from './landingReducers';

const rootReducer = combineReducers({
  report: reportReducers,
  landing: landingReducers
});

export default rootReducer;