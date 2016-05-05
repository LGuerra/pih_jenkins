import { expect } from 'chai';

import {
  // Action type
  SET_COLONIA,
  SET_VIVIENDA,
  SET_PARAMS_INFO,
  SET_FORM,
  // Action creators
  onSetForm,
  onSetColonia,
  onSetVivienda,
  onSetParamsInfo
} from '../../../client/scripts/actions/landing_actions';

function testActionCreators(actionCreator, type, payload) {
  const expectedAction = {type, payload}

  expect(actionCreator(payload)).to.eql(expectedAction);
}

describe('landing actions', () => {
  it('should create an action to set ', () => {
    testActionCreators(onSetForm, SET_FORM, 1);
  });

  it('should create an action to colonia id', () => {
    testActionCreators(onSetColonia, SET_COLONIA, {
      colonia: '09016638'
    });
  });

  it('should create an action to vivienda id', () => {
    testActionCreators(onSetColonia, SET_COLONIA, {
      vivienda: '09016638'
    });
  });

  it('should create an action to set form info', () => {
    testActionCreators(onSetParamsInfo, SET_PARAMS_INFO, {
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
});