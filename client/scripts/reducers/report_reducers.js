import _ from 'lodash';

import {
  SET_INITIAL_STATE,
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
} from '../actions/report_actions';

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

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

    case SET_INITIAL_STATE: {
      return {
        ...INITIAL_STATE
      }
    }

    case FETCH_COLONIA_INFO:
      return {
        ...state,
        coloniaInfo: action.payload
      }

    case FETCH_OFERTA_DISPONIBLE:
      return {
        ...state,
        ofertaDisponible: action.payload
      }

    case FETCH_DISTRIBUCION_TIPOLOGIA:
      return {
        ...state,
        distribucionTipologia: action.payload
      }

    case FETCH_PRECIO_HISTORICO:
      return {
        ...state,
        precioHistorico: action.payload
      }

    case FETCH_DISTRIBUCION_PRECIO:
      return {
        ...state,
        distribucionPrecio: action.payload
      }

    case FETCH_COLONIAS_COMPARABLES:
      return {
        ...state,
        coloniasComparables: action.payload
      }

    case FETCH_VIVIENDA_INFO:
      return {
        ...state,
        viviendaInfo: action.payload
      }

    case FETCH_VIVIENDAS_COMPARABLES:
      return {
        ...state,
        viviendasComparables: action.payload.similar_houses
      }

    case FETCH_COLONIAS_MAP: {
      return {
        ...state,
        coloniasMap: action.payload
      }
    }

    case FECTH_ACTUAL_COLONIA_MAP: {
      return {
        ...state,
        actualColoniaMap: action.payload
      }
    }

    case FETCH_CENTROID: {
      return {
        ...state,
        centroid: action.payload
      }
    }

    case SET_LOADING_FRAME: {
      return {
        ...state,
        isLoadingFrame: action.payload
      }
    }

    case SELECT_COMPARATIVO_COLONIAS:
      return {
        ...state,
        selectedComparativoColonias: action.payload
      }

    case SELECT_POLYGON:
      return {
        ...state,
        selectedPolygon: action.payload
      }

    default:
      return state
  }
}