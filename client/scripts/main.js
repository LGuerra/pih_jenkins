// React
import React from 'react';
import { render } from 'react-dom';

// Router
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { userAPI } from './api/api-helper';

// Redux
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

require('./../styles/main.scss');

import Report from './routes/report/components/Report';

var App         = require('./components/App');
var Home        = require('./routes/home/components/Home');

import UserRoutes from './routes/users';
import ReportRoutes from './routes/report';
import NotFoundRoutes from './routes/notFound';
import ConditionsRoutes from './routes/conditions';

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    ConditionsRoutes,
    ReportRoutes,
    UserRoutes,
    NotFoundRoutes
  ]
};

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('react-view-container')
);
