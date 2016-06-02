import { expect } from 'chai';
import { all } from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'

import { suburbAPI, suburbsAPI, viviendaAPI } from '../../../client/scripts/api/api-helper.js';

import {
  // Action type
  FECTH_ACTUAL_COLONIA_MAP,
  FETCH_CENTROID,
  FETCH_COLONIA_INFO,
  FETCH_COLONIAS_COMPARABLES,
  FETCH_COLONIAS_MAP,
  FETCH_DISTRIBUCION_PRECIO,
  FETCH_DISTRIBUCION_TIPOLOGIA,
  FETCH_OFERTA_DISPONIBLE,
  FETCH_PRECIO_HISTORICO,
  FETCH_VIVIENDA_INFO,
  FETCH_VIVIENDAS_COMPARABLES,
  SELECT_COMPARATIVO_COLONIAS,
  SELECT_POLYGON,
  SET_COLONIA_INFO,
  SET_INITIAL_STATE,
  SET_LOADING_FRAME,
  SET_URL_PARAMS,
  SET_VIEW_TYPE,
  SET_VIVIENDA_INFO,
  // Action creators
  fetchActualColoniaMap,
  fetchCentroid,
  fetchColoniaInfo,
  fetchColoniasComparables,
  fetchColoniasMap,
  fetchDistribucionPrecio,
  fetchDistribucionTipologia,
  fetchOfertaDisponible,
  fetchPrecioHistorico,
  fetchViviendaInfo,
  fetchViviendasComparables,
  onSelectComparativoColonias,
  onSelectPolygon,
  onSetColoniaInfo,
  onSetViviendaInfo,
  setInitialState,
  setLoadingFrame
} from '../../../client/scripts/actions/report_actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

function testActionCreators(actionCreator, type, payload) {
  const expectedAction = {type, payload};

  expect(actionCreator(payload)).to.eql(expectedAction);
}

describe('report actions', () => {
  it('should create an action to reset initial state on landing view', () => {
    const expectedAction = {
      type: SET_INITIAL_STATE
    };

    expect(setInitialState()).to.eql(expectedAction);
  });

  it('should create an action to select comparativo colonias', () => {
    testActionCreators(
      onSelectComparativoColonias,
      SELECT_COMPARATIVO_COLONIAS,
      '09016638');
  });


  it('should create an action to select a polygon on the map', () => {
    testActionCreators(
      onSelectPolygon,
      SELECT_POLYGON,
      '09016638');
  });

  it('should create an action to activate LoadingFrame', () => {
    testActionCreators(setLoadingFrame, SET_LOADING_FRAME, true);
  });

  it('should create an action to fetch Colonia Info', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = all([
      suburbAPI.averageOffer(idCol, 6),
      suburbAPI.averageM2(idCol, 6),
      suburbAPI.information(idCol),
      suburbAPI.appreciation(idCol)
    ]);
    var expectedAction = {
      type: FETCH_COLONIA_INFO
    };

    request
      .then(response => {
        expectedAction.payload = response.map((element) => { return element.data });
        return store.dispatch(fetchColoniaInfo(idCol))
      })
      .then(reponse => {
        expect(expectedAction).to.eql(store.getActions()[0])
        done();
      });
  });

  it('should create an action to fetch Vivienda Info', (done) => {
    const params = {
      area_construida: '100',
      banos: '1',
      edad: '1',
      estacionamientos: '0',
      id_tipo_propiedad: '2',
      latitud: '19.4336394',
      longitud: '-99.18713639999999',
      recamaras: '3',
      tipo_operacion: '0'
    };
    const store = mockStore();
    const request = viviendaAPI.valuation(params);

    var expectedAction = {
      type: FETCH_VIVIENDA_INFO
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchViviendaInfo(params))
      })
      .then(reponse => {
        expect(expectedAction).to.eql(store.getActions()[0])
        done();
      });
  });

  it('should create an action to fetch Oferta Disponible', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = all([
      suburbAPI.listingCount(idCol, 1),
      suburbAPI.listingCount(idCol, 6),
      suburbAPI.averageTime(idCol, 6)
    ]);
    var expectedAction = {
      type: FETCH_OFERTA_DISPONIBLE
    };

    request
      .then(response => {
        expectedAction.payload = response.map((element) => { return element.data });
        return store.dispatch(fetchOfertaDisponible(idCol))
      })
      .then(reponse => {
        expect(expectedAction).to.eql(store.getActions()[0])
        done();
      });
  });

  it('should create an action to fetch Distribucion Tipologia', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = suburbAPI.typology(idCol);
    var expectedAction = {
      type: FETCH_DISTRIBUCION_TIPOLOGIA
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchDistribucionTipologia(idCol));
      })
      .then(reponse => {
        expect(expectedAction).to.eql(store.getActions()[0]);
        done();
      });
  });

  it('should create an action to fetch Precio Historico', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = suburbAPI.historicPrice(idCol);
    var expectedAction = {
      type: FETCH_PRECIO_HISTORICO
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchPrecioHistorico(idCol));
      })
      .then(response => {
        expect(expectedAction).to.eql(store.getActions()[0]);
        done();
      });
  });

  it('should create an action to fetch Distribucio Precio', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = suburbAPI.priceDistribution(idCol);
    var expectedAction = {
      type: FETCH_DISTRIBUCION_PRECIO
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchDistribucionPrecio(idCol));
      })
      .then(response => {
        expect(expectedAction).to.eql(store.getActions()[0]);
        done();
      });
  });

  it('should create an action to fetch Colonias Comparables', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = suburbAPI.adjacent(idCol)
      .then(abjacentsR => abjacentsR.data)
      .then(data => {
        return suburbsAPI.report(data, 6);
      });

    var expectedAction = {
      type: FETCH_COLONIAS_COMPARABLES
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchColoniasComparables(idCol));
      })
      .then(response => {
        expect(expectedAction).to.eql(store.getActions()[0]);
        done();
      });
  });

  it('should create an action to fetch Viviendas Comparables', (done) => {
    const params = {
      area_construida: '100',
      banos: '1',
      edad: '1',
      estacionamientos: '0',
      id_tipo_propiedad: '2',
      latitud: '19.4336394',
      longitud: '-99.18713639999999',
      recamaras: '3',
      tipo_operacion: '0'
    };
    const store = mockStore();
    const request = viviendaAPI.similars(params);

    var expectedAction = {
      type: FETCH_VIVIENDAS_COMPARABLES
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchViviendasComparables(params));
      })
      .then(response => {
        expect(expectedAction).to.eql(store.getActions()[0]);
        done();
      });
  });

  it('should create an action to fetch Colonias Map', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = suburbAPI.adjacent(idCol)
      .then(abjacentsR => abjacentsR.data)
      .then(data => {
        return suburbsAPI.geojsons(data)
      });

    var expectedAction = {
      type: FETCH_COLONIAS_MAP
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchColoniasMap(idCol));
      })
      .then(response => {
        expect(expectedAction).to.eql(store.getActions()[0]);
        done();
      });
  });

  it('should create an action to fetch Colonias Map', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = suburbAPI.geojson(idCol);

    var expectedAction = {
      type: FECTH_ACTUAL_COLONIA_MAP
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchActualColoniaMap(idCol));
      })
      .then(response => {
        expect(expectedAction).to.eql(store.getActions()[0]);
        done();
      });
  });

  it('should create an action to fetch centroid', (done) => {
    const idCol = '09016620';
    const store = mockStore();
    const request = suburbAPI.centroid(idCol);

    var expectedAction = {
      type: FETCH_CENTROID
    };

    request
      .then(response => {
        expectedAction.payload = response.data;
        return store.dispatch(fetchCentroid(idCol));
      })
      .then(response => {
        expect(expectedAction).to.eql(store.getActions()[0]);
        done();
      });
  });
});