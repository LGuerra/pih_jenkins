import axios from 'axios';
import { suburbAPI, suburbsAPI, viviendaAPI } from '../api/api-helper.js';

// API methods
export const FETCH_COLONIA_INFO             = 'FETCH_COLONIA_INFO';
export const FETCH_VIVIENDA_INFO            = 'FETCH_VIVIENDA_INFO';
export const FETCH_OFERTA_DISPONIBLE        = 'FETCH_OFERTA_DISPONIBLE';
export const FETCH_DISTRIBUCION_TIPOLOGIA   = 'FETCH_DISTRIBUCION_TIPOLOGIA';
export const FETCH_PRECIO_HISTORICO         = 'FETCH_PRECIO_HISTORICO';
export const FETCH_DISTRIBUCION_PRECIO      = 'FETCH_DISTRIBUCION_PRECIO';
export const FETCH_COLONIAS_COMPARABLES     = 'FETCH_COLONIAS_COMPARABLES';
export const FETCH_VIVIENDAS_COMPARABLES    = 'FETCH_VIVIENDAS_COMPARABLES';
export const FETCH_COLONIAS_MAP             = 'FETCH_COLONIAS_MAP';
export const FECTH_ACTUAL_COLONIA_MAP       = 'FECTH_ACTUAL_COLONIA_MAP';
export const FETCH_CENTROID                 = 'FETCH_CENTROID';

// Setting properties
export const SET_INITIAL_STATE              = 'SET_INITIAL_STATE';
export const SET_URL_PARAMS                 = 'SET_URL_PARAMS';
export const SET_VIEW_TYPE                  = 'SET_VIEW_TYPE';
export const SET_LOADING_FRAME              = 'SET_LOADING_FRAME';
export const SET_VIVIENDA_INFO              = 'SET_VIVIENDA_INFO';
export const SET_COLONIA_INFO               = 'SET_COLONIA_INFO';

// Interactivity
export const SELECT_COMPARATIVO_COLONIAS    = 'SELECT_COMPARATIVO_COLONIAS';
export const SELECT_POLYGON                 = 'SELECT_POLYGON';

export function addOptimisticActionCreator(type, payload) {
  return {type, payload}
}

export function setInitialState() {
  return function(dispatch) {
    dispatch(addOptimisticActionCreator(SET_INITIAL_STATE, {}));
  };
}

export function fetchColoniaInfo(idCol) {
  const request = axios.all([
    suburbAPI.averageOffer(idCol, 6),
    suburbAPI.averageM2(idCol, 6),
    suburbAPI.information(idCol),
    suburbAPI.appreciation(idCol)
  ]);

  return {
    type: FETCH_COLONIA_INFO,
    payload: request
  };
}

export function fetchOfertaDisponible(idCol) {
  const request = axios.all([
    suburbAPI.listingCount(idCol, 1),
    suburbAPI.listingCount(idCol, 6),
    suburbAPI.averageTime(idCol, 6)
  ]);

  return {
    type: FETCH_OFERTA_DISPONIBLE,
    payload: request
  }
}

export function fetchDistribucionTipologia(idCol) {
  const request = suburbAPI.typology(idCol);

  return {
    type: FETCH_DISTRIBUCION_TIPOLOGIA,
    payload: request
  }
}

export function fetchPrecioHistorico(idCol) {
  const request = suburbAPI.historicPrice(idCol);

  return {
    type: FETCH_PRECIO_HISTORICO,
    payload: request
  }
}

export function fetchDistribucionPrecio(idCol) {
  const request = suburbAPI.priceDistribution(idCol);

  return {
    type: FETCH_DISTRIBUCION_PRECIO,
    payload: request
  }
}

export function fetchColoniasComparables(idCol) {
  const request = suburbAPI.adjacent(idCol)
    .then(abjacentsR => abjacentsR.data)
    .then(data => {
      return suburbsAPI.report(data, 6);
    });

  return {
    type: FETCH_COLONIAS_COMPARABLES,
    payload: request
  }
}

export function fetchViviendaInfo(params) {
  const request = viviendaAPI.valuation(params);

  return {
    type: FETCH_VIVIENDA_INFO,
    payload: request
  }
}

export function fetchViviendasComparables(params) {
  const request = viviendaAPI.similars(params);

  return {
    type: FETCH_VIVIENDAS_COMPARABLES,
    payload: request
  }
}

export function fetchColoniasMap(idCol) {
  const request = suburbAPI.adjacent(idCol)
    .then(abjacentsR => abjacentsR.data)
    .then(data => {
      return suburbsAPI.geojsons(data)
    });

  return {
    type: FETCH_COLONIAS_MAP,
    payload: request
  }
}

export function fetchActualColoniaMap(idCol) {
  const request = suburbAPI.geojson(idCol);

  return {
    type: FECTH_ACTUAL_COLONIA_MAP,
    payload: request
  }
}

export function fetchCentroid(idCol) {
  const request = suburbAPI.centroid(idCol);

  return {
    type: FETCH_CENTROID,
    payload: request
  }
}

export function onSelectComparativoColonias(idCol) {
  return {
    type: SELECT_COMPARATIVO_COLONIAS,
    payload: idCol
  }
}

export function onSelectPolygon(idCol) {
  return {
    type: SELECT_POLYGON,
    payload: idCol
  }
}

export function setLoadingFrame(toggle) {
  return {
    type: SET_LOADING_FRAME,
    payload: toggle
  }
}