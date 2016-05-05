import { expect } from 'chai';
import _ from 'lodash';

import reportReducers from '../../../client/scripts/reducers/report_reducers';

import {
  //Actions type
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
} from '../../../client/scripts/actions/report_actions';

const INITIAL_STATE = {
  viviendaInfo: {},
  coloniaInfo: [],
  ofertaDisponible: {},
  distribucionTipologia: {},
  precioHistorico: [],
  distribucionPrecio: {},
  coloniasComparables: [],
  viviendasComparables: [],
  coloniasMap: [],
  actualColoniaMap: null,
  centroid: null,
  selectedComparativoColonias: null,
  selectedPolygon: null,
  isLoadingFrame: false
};

// Helper function to test reducers with repeated logic
function testReducers(payload, expectedState, type) {
  expect(
    reportReducers(INITIAL_STATE, { type, payload }))
      .to.eql(expectedState);
}

// Describe function
describe('report reducers', () => {
  var expectedState;

  beforeEach(() => {
    expectedState = _.clone(INITIAL_STATE)
  });

  it('should return the initial state', () => {
    expect(
      reportReducers(undefined, {})
    ).to.eql(INITIAL_STATE);
  });

  it('should set loading frame', () => {
    const newState = true;

    expectedState.isLoadingFrame = newState;

   testReducers(newState, expectedState, SET_LOADING_FRAME);
  });

  it('should handle selecting an specific colonia', () => {
    const newState = {/*TODO get example*/};

    expectedState.selectedComparativoColonias = {};
    testReducers(newState, expectedState, SELECT_COMPARATIVO_COLONIAS);
  });

  it('should handle selecting a polygon on the map', () => {
    const newState = {/*TODO get example*/};

    expectedState.selectedPolygon = {};
    testReducers(newState, expectedState, SELECT_POLYGON);
  });

  it('should handle fetching vivienda info', () => {
    const newState = {
      data: {/*TODO get example*/}
    };

    expectedState.viviendaInfo = {/*TODO get example*/};

    testReducers(newState, expectedState, FETCH_VIVIENDA_INFO);
  });

  it('should handle fetching colonia info', () => {
    const newState = [/*TODO get example*/];

    expectedState.coloniaInfo = newState;

    testReducers(newState, expectedState, FETCH_COLONIA_INFO);
  });

  it('should handle fetching oferta disponible', () => {
    const newState = [];

    expectedState.ofertaDisponible = [/*TODO get example*/];

    testReducers(newState, expectedState, FETCH_OFERTA_DISPONIBLE);
  });

  it('should handle fetching distribucion tipologia', () => {
    const newState = {
      data: {/*TODO get example*/}
    };

    expectedState.distribucionTipologia = {/*TODO get example*/};

    testReducers(newState, expectedState, FETCH_DISTRIBUCION_TIPOLOGIA);
  });

  it('should handle fetching precio historico', () => {
    const newState = {
      data: {/*TODO get example*/}
    };

    expectedState.distribucionTipologia = {/*TODO get example*/};

    testReducers(newState, expectedState, FETCH_DISTRIBUCION_TIPOLOGIA);
  });

  it('should handle fetching distribucion precio', () => {
    const newState = {
      data: {}
    };

    expectedState.distribucionPrecio = {};
    testReducers(newState, expectedState, FETCH_DISTRIBUCION_PRECIO);
  });

  it('should handle fetching colonias comparables', () => {
    const newState = {
      data: []
    };

    expectedState.coloniasComparables = [];
    testReducers(newState, expectedState, FETCH_COLONIAS_COMPARABLES);
  });

  it('should handle fetching viviendas comparables', () => {
    const newState = {
      data: {
        similar_houses: []
      }
    };

    expectedState.viviendasComparables = [];
    testReducers(newState, expectedState, FETCH_VIVIENDAS_COMPARABLES);
  });

  it('should handle fetching colonias map', () => {
    const newState = {
      data: []
    };

    expectedState.coloniasMap = [];
    testReducers(newState, expectedState, FETCH_COLONIAS_MAP);
  });

  it('should handle fetching actual colonia on map', () => {
    const newState = {
      data: {}
    };

    expectedState.actualColoniaMap = {};
    testReducers(newState, expectedState, FECTH_ACTUAL_COLONIA_MAP);
  });

  it('should handle fetching centroid on the map', () => {
    const newState = {
      data: {}
    };

    expectedState.centroid = {};
    testReducers(newState, expectedState, FETCH_CENTROID);
  });
});
