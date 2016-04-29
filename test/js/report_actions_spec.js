import { expect } from 'chai';

import {
  // Action descriptors
  SET_VIVIENDA_INFO,
  SET_COLONIA_INFO,
  SELECT_COMPARATIVO_COLONIAS,
  SELECT_POLYGON,
  SET_LOADING_FRAME,

  // Action creators
  onSetViviendaInfo,
  onSetColoniaInfo,
  onSelectComparativoColonias,
  onSelectPolygon,
  setLoadingFrame
} from '../../client/scripts/actions/report_actions';

function testActionCreators(actionCreator, type, payload) {
  const expectedAction = {
    type: type,
    payload: payload
  };

  expect(actionCreator(payload)).to.eql(expectedAction);
}

describe('actions', () => {
  it('should create an action to set colonia info', () => {
    testActionCreators(onSetColoniaInfo, SET_COLONIA_INFO, {
      colonia: '09016638'
    });
  });

  it('should create an action to set vivienda info', () => {
    testActionCreators(onSetViviendaInfo, SET_VIVIENDA_INFO, {
      recamaras: 2,
      banos: 1,
      estacionamientos: 1,
      id_tipo_vivienda: 4,
      edad: 0,
      area_construida: 100,
      address: 'Reforma Norte, Guerrero, Ciudad de México, México',
      tipo_operacion: 0
    });
  });

  it('should create an action to select comparativo colonias', () => {
    testActionCreators(onSelectComparativoColonias, SELECT_COMPARATIVO_COLONIAS, '09016638');
  });


  it('should create an action to select a polygon on the map', () => {
    testActionCreators(onSelectPolygon, SELECT_POLYGON, '09016638');
  });

  it('should create an action to activate LoadingFrame', () => {
    testActionCreators(setLoadingFrame, SET_LOADING_FRAME, true);
  });
});