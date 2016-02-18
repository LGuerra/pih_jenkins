import React from 'react';
import ReactDOM from 'react-dom';

import Landing from './views/landing';
import { registerRoute, dispatch } from './routing';

import { suburbAPI, suburbsAPI, viviendaAPI, helpersAPI, detailView } from './api/api-helper.js';

require('./../styles/main.scss');

registerRoute('', () => require('./views/landing'));
registerRoute('reporte', () => require('./views/reporte'));

$(document).ready(() => {
  dispatch();
  setTimeout(function() {
    $('.sign-in-notice').addClass('fadeOutUp');
  }, 3000);
});
