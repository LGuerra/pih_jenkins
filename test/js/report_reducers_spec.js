import { expect } from 'chai';
import _ from 'lodash';
import reportReducers from '../../client/scripts/reducers/report_reducers';
import {
  //Action descriptors
  SET_VIEW_TYPE,
  SET_URL_PARAMS,
  SET_VIVIENDA_INFO,
  SET_COLONIA_INFO,
  FETCH_COLONIA_INFO,
  FETCH_OFERTA_DISPONIBLE,
  FETCH_DISTRIBUCION_TIPOLOGIA,
  FETCH_PRECIO_HISTORICO,
  FETCH_DISTRIBUCION_PRECIO,
  FETCH_COLONIAS_COMPARABLES,
  FETCH_VIVIENDA_INFO,
  FETCH_VIVIENDAS_COMPARABLES,
  FETCH_COLONIAS_MAP,
  FECTH_ACTUAL_COLONIA_MAP,
  FETCH_CENTROID,
  SET_LOADING_FRAME,
  SELECT_COMPARATIVO_COLONIAS,
  SELECT_POLYGON
} from '../../client/scripts/actions/report_actions';

const INITIAL_STATE = {
  viewType: null,
  urlParams: {},
  viviendaInfo: {},
  coloniaInfo: [],
  ofertaDisponible: {},
  distribucionTipologia: {},
  precioHistorico: [],
  distribucionPrecio: {},
  propiedadesComparables: {},
  coloniasComparables: [],
  viviendasComparables: [],
  coloniasMap: [],
  actualColoniaMap: null,
  centroid: null,
  selectedComparativoColonias: null,
  selectedPolygon: null,
  isLoadingFrame: false
};

function testReducers(newState, expectedState, type) {
  expect(
   reportReducers(INITIAL_STATE, {
     type: type,
     payload: newState
   })
  ).to.eql(expectedState); 
}

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(
      reportReducers(undefined, {})
    ).to.eql(INITIAL_STATE);
  });

  it('should handle setting URL params', () => {
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

    expectedState.urlParams = newState;

   testReducers(newState, expectedState, SET_URL_PARAMS);
  });

  it('should handle setting view type', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = 'Vivienda';
    
    expectedState.viewType = newState;

    testReducers(newState, expectedState, SET_VIEW_TYPE);
  });

  it('should handle setting vivienda info', () => {
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

    expectedState.urlParams = newState;
    expectedState.viewType = 'Vivienda';

    testReducers(newState, expectedState, SET_VIVIENDA_INFO);
  });

  it('should handle setting colonia info', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = {/*TODO get example*/};
    
    expectedState.urlParams = newState;
    expectedState.viewType = 'Colonia';

    testReducers(newState, expectedState, SET_COLONIA_INFO);
  });

  it('should handle fetching vivienda info', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = {
      data: {/*TODO get example*/}
    };
    
    expectedState.viviendaInfo = {/*TODO get example*/};

    testReducers(newState, expectedState, FETCH_VIVIENDA_INFO);
  });

  it('should handle fetching colonia info', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = [/*TODO get example*/];
    
    expectedState.coloniaInfo = newState;

    testReducers(newState, expectedState, FETCH_COLONIA_INFO);
  });

  it('should handle fetching oferta disponible', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = [];
    
    expectedState.ofertaDisponible = [/*TODO get example*/];

    testReducers(newState, expectedState, FETCH_OFERTA_DISPONIBLE);
  });

  it('should handle fetching distribucion tipologia', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = {
      data: {/*TODO get example*/}
    };

    expectedState.distribucionTipologia = {/*TODO get example*/};

    testReducers(newState, expectedState, FETCH_DISTRIBUCION_TIPOLOGIA);
  });

  it('should handle fetching precio historico', () => {
    const expectedState = _.clone(INITIAL_STATE);
    const newState = {
      data: {/*TODO get example*/}
    };

    expectedState.distribucionTipologia = {/*TODO get example*/};

    testReducers(newState, expectedState, FETCH_DISTRIBUCION_TIPOLOGIA);
  });


});

