import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'

require('./../styles/main.scss');

var App         = require('./views/app');
var Home        = require('./views/home');
var Conditions  = require('./views/conditions');
var NoMatch     = require('./views/no-match');

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/app/conditions' component={Conditions}/>
      <Route path='*' component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('react-view-container'));
