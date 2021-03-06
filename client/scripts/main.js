// React
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'

// Redux
import promise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

require('./../styles/main.scss');

import App from './components/App';
import RootApp from './components/RootApp';
import Home from './routes/home/components/Home';
import Landing from './routes/landing/components/Landing';
import UserRoutes from './routes/users';
import ReportRoutes from './routes/report';
import NotFoundRoutes from './routes/notFound';
import ConditionsRoutes from './routes/conditions';

import { serverAuthResponse, checkPermissions, removeAlerts } from 'helpers-banca';

const createStoreWithMiddleware = compose(applyMiddleware( thunk ))(createStore);

const routes = {
  component: RootApp,
  onEnter: removeAlerts,
  childRoutes: [
    ConditionsRoutes,
    // UserRoutes,
    {
      path: '/',
      getComponent: (nextState, cb) => {
        serverAuthResponse()
        .then((args) => {
          return require.ensure([], (require) => {
            cb(null, require('./components/App').default);
          });
        })
        .catch((args) => {
          return require.ensure([], (require) => {
            cb(null, require('./routes/home/components/Home').default);
          });
        });
      },
      indexRoute: {
        getComponent: (nextState, cb) => {
          serverAuthResponse()
          .then((args) => {
            return require.ensure([], (require) => {
              cb(null, require('./routes/landing/components/Landing').default);
            })
          }).catch((args) => {
            cb();
          });
        }
      },
      childRoutes: [
        {
          onEnter: checkPermissions,
          group: 'prueba',
          path: '/reporte',
          component: require('./routes/report/components/Report').default
        }
      ]
    },
    NotFoundRoutes
  ]
};

$(document).ready(function() {
  render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  , document.getElementById('react-view-container')
  );
});
