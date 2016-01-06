import React from 'react';
import ReactDOM from 'react-dom';

import Landing from './views/landing';
import Routing from './routing'
require("bootstrap-webpack");

require('./../styles/main.scss');

Routing.register('/', () => {
  return (require('./views/landing'));
});

Routing.register('reporte', () => {
  console.log('AQUI');
  return (require('./views/reporte'));
});

$(document).ready(() => {
  Routing.dispatch();
});
