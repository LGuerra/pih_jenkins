import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import { userAPI } from './api/api-helper';

require('./../styles/main.scss');

import Report from './routes/report/components/Report';

var App         = require('./components/App');
var Home        = require('./routes/home/components/Home');

import UserRoutes from './routes/users';
import ReportRoutes from './routes/report';
import NotFoundRoutes from './routes/notFound';
import ConditionsRoutes from './routes/conditions';

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
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('react-view-container')
);
