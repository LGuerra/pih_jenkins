import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'

require('./../styles/main.scss');

import App from './components/App';
import Home from './routes/home/components/Home';
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
