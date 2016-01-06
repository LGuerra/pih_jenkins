import React from 'react';
import ReactDOM from 'react-dom';

import Landing from './views/landing';
import Routing from './routing'

require('./../styles/main.scss');

Routing.register('/', () => {
  return (require('./views/landing'));
});

$(document).ready(() => {
  Routing.dispatch();
});
