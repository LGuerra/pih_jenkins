import { expect } from 'chai';
import _ from 'lodash';

import landingReducers from '../../../client/scripts/reducers/landing_reducers';

import {
  //Actions type
  SET_FORM,
  SET_COLONIA,
  SET_VIVIENDA,
  SET_PARAMS_INFO
} from '../../../client/scripts/actions/landing_actions';

const INITIAL_STATE = {
  activeForm: 1,
  colonia: {},
  vivienda: {},
  infoParams: {
    id_tipo_propiedad: 2,
    recamaras: 1,
    banos: 1,
    estacionamientos: 0,
    area_construida: 100,
    edad: 1
  }
}

// Helper function to test reducers with repeated logic
function testReducers(payload, expectedState, type) {
  expect(landingReducers(INITIAL_STATE, { type, payload }))
    .to.eql(expectedState);
}

// Describe function
describe('landing reducers', () => {

  it('should return initial state', () => {
    expect(
      landingReducers(undefined, {})
    ).to.eql(INITIAL_STATE);
  });

  it('should set form type', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = 2;

    expectedState.activeForm = newState;
    testReducers(newState, expectedState, SET_FORM)
  });

  it('should set colonia id', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = {
      id: '09016638'
    };

    expectedState.colonia = newState;
    testReducers(newState, expectedState, SET_COLONIA)
  });

  it('should set vivienda id', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = {
      colonia: '09016638'
    };

    expectedState.vivienda = newState;
    testReducers(newState, expectedState, SET_VIVIENDA)
  });


  it('should set info params', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = {
      recamaras: 2,
      banos: 1,
      estacionamientos: 1,
      id_tipo_vivienda: 4,
      edad: 0,
      area_construida: 100,
      address: 'Reforma Norte, Guerrero, Ciudad de México, México',
      tipo_operacion: 0
   };

    expectedState.infoParams = newState;
    testReducers(newState, expectedState, SET_PARAMS_INFO)
  });

});