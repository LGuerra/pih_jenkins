import React from 'react';
import ReactDOM from 'react-dom';

import Landing from './views/landing';
import { registerRoute, dispatch } from './routing';

import { suburbAPI, suburbsAPI, viviendaAPI, helpersAPI, detailView } from './api/api-helper.js';

require('./../styles/main.scss');

registerRoute('', () => require('./views/landing'));
registerRoute('reporte', () => require('./views/reporte'));

$(document).ready(() => {
  // let sample = {
  //   area_construida: 100,
  //   banos: 1,
  //   edad: 0,
  //   estacionamientos: 1,
  //   id_tipo_propiedad: 4,
  //   latitud: 19.4149803,
  //   longitud: -99.17744619999996,
  //   recamaras: 2,
  //   tipo_operacion: 0
  // };
  // viviendaAPI.valuation(sample).then((data) => {
  //   console.log('Val', data);
  // });
  // helpersAPI.suburbFromCoords(-99.164957,19.404330).then((data) => {
  //   console.log(data);
  // });
  // detailView('090031231').then((data) => {
  //   console.log(data);
  // });
  // suburbAPI.information('090031231').then((data) => {
  //   console.log(data.data);
  // });
  dispatch();
  setTimeout(function() {
    $('.sign-in-notice').addClass('fadeOutUp');
  }, 3000);
});
