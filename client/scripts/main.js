import React from 'react';
import ReactDOM from 'react-dom';

import Landing from './views/landing';
import { registerRoute, dispatch } from './routing';

require('./../styles/main.scss');

registerRoute('', () => require('./views/landing'));
registerRoute('reporte', () => require('./views/reporte'));

$(document).ready(() => { dispatch(); });
