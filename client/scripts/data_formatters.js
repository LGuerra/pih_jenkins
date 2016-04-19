import _ from 'lodash';

import Helpers from './helpers';

export function formatPrecioHistorico(data) {
  let arrayPoints = data.map((element, index) => {
    return ({
      value: element.promedio_venta,
      xVariable: new Date(element.fecha)
    });
  });

  return [{
    color: '#35C0BE',
    label: 'Promedio de venta',
    data: arrayPoints
  }];
}

export function formatDistribucionTipologia(data) {
  let labelsDictionary = {
    area_construida: 'Superficie construida',
    recamaras: 'Recámaras',
    id_tipo_propiedad: 'Tipo vivienda',
    edad: 'Edad'
  }

  if (data.json_tipologias) {
    var formattedData = _.map(data.json_tipologias, (element, key) => {
      let label = key;

      element.forEach(function(bar) {
        bar.color = '#35C0BE';
        bar.hoverColor = '#2a9998';
      });

      if (label === 'recamaras') {
        element = _.sortBy(element, function(element) {
          return element.label;
        });
      }

      if (label === 'area_construida') {
        element = _.sortBy(element, function(element) {
          return (element.label);
        });

        let indexes = {};

        element.forEach(function(obj, index) {
          if (obj.label[0] === '<') {
            obj.label = '≤ ' + obj.label.substr(2);
            indexes.lt_c = index;
          }
          if (obj.label[0] === '>') {
            obj.label = '≥ ' + obj.label.substr(2);
            indexes.ht_c = index;
          }
          obj.label = obj.label.substr(0, obj.label.length - 2) + 'm²';
        });

        let ltC = element.splice(indexes.lt_c, 1);
        let htC = element.splice(indexes.ht_c - 1, 1);

        element.reverse();
        element.unshift(ltC[0]);
        element.push(htC[0]);
      }

      return ({
        label: labelsDictionary[label],
        bars: element
      });
    });
  } else {
    return ([]);
  }

  return (formattedData);
}

export function formatDistribucionPrecio(data) {
  let formattedData;
  let stringElement;

  if (data.json_precios) {
    formattedData = _.map(data.json_precios, (element, key) => {
      let label;
      if (element.lim_inf === 'limite_inf') {
        label = '< ' + Helpers.formatAsNumber(element.lim_sup / 1000);
      } else if (element.lim_sup === 'limite_sup') {
        label = '> ' + Helpers.formatAsNumber(element.lim_inf / 1000);
      } else {
        label = Helpers.formatAsNumber(element.lim_inf / 1000) + ' a ' + Helpers.formatAsNumber(element.lim_sup / 1000);
      }
      return({
        lim_inf: element.lim_inf,
        lim_sup: element.lim_sup,
        label: label,
        value: element.value
      });
    });

  } else {
    formattedData = [];
  }

  formattedData = _.filter(formattedData, element => {
    if (typeof element.lim_inf == 'number') {
      return (element);
    }
    stringElement = element;
  })

  formattedData = _.sortBy(formattedData, element => {
    return element.lim_inf;
  });

  formattedData.unshift(stringElement);

  return (formattedData);
}

export function formatComparativoViviendas(data, viviendaInfo, coloniaName) {
  let formattedData = [{
      'Precio por m²': Helpers.formatAsPrice(viviendaInfo.precioM2) || '-',
      'Precio de oferta': Helpers.formatAsPrice(viviendaInfo.valuacion) || '-',
      'Recámaras': viviendaInfo.recamaras || '-',
      'Baños': viviendaInfo.banos || '-',
      'Estacionamientos': viviendaInfo.estacionamientos || '-',
      'Área construida': viviendaInfo.area_construida || '-',
      'Edad': viviendaInfo.edad || '-',
      'Colonia': coloniaName || '-'
  }];


  data.forEach((element, index) => {
    formattedData.push({
      'Precio por m²': Helpers.formatAsPrice(element.precio / element.m2) || '-',
      'Precio de oferta': Helpers.formatAsPrice(element.precio) || '-',
      'Recámaras': element.recamaras || '-',
      'Baños': element.banos || '-',
      'Estacionamientos': element.estacionamientos || '-',
      'Área construida': element.m2 || '-',
      'Edad': element.edad || '-',
      'Colonia': element.nombre_colonia || '-'
    });
  });

  let headers = Object.keys(formattedData[0]);

  return ({
    headers: Object.keys(formattedData[0]),
    rows: formattedData
  });
}

export function formatComparativoColonias(data, currentID) {
  let currentIndex;
  let formattedData = data.map((element, index) => {
    if (element.colonia === currentID) {
      currentIndex = index;
    }
    return ({
      'Colonia': element.nombre,
      'Precio m²': Helpers.formatAsPrice(element.average),
      'Viviendas ofertadas': element.count,
      'id': element.colonia
    });
  });

  let current = formattedData.splice(currentIndex, 1)[0];
  formattedData.unshift(current);

  let headers = Object.keys(formattedData[0]);
  headers.pop();

  return ({
    headers: headers,
    rows: formattedData
  });
}
