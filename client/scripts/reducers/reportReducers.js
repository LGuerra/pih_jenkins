import {
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

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_COLONIA_INFO:
      return {
        ...state,
        coloniaInfo: action.payload.map(el => el.data)
      }

    case FETCH_OFERTA_DISPONIBLE:
      return {
        ...state,
        ofertaDisponible: action.payload.map(el => el.data)
      }

    case FETCH_DISTRIBUCION_TIPOLOGIA:
      return {
        ...state,
        distribucionTipologia: action.payload.data
      }

    case FETCH_PRECIO_HISTORICO:
      return {
        ...state,
        precioHistorico: action.payload.data
      }

    case FETCH_DISTRIBUCION_PRECIO:
      return {
        ...state,
        distribucionPrecio: action.payload.data
      }

    case FETCH_COLONIAS_COMPARABLES:
      return {
        ...state,
        coloniasComparables: action.payload.data
      }

    case FETCH_VIVIENDA_INFO:
      return {
        ...state,
        viviendaInfo: action.payload.data
      }

    case FETCH_VIVIENDAS_COMPARABLES:
      return {
        ...state,
        viviendasComparables: action.payload.data.similar_houses
      }

    case FETCH_COLONIAS_MAP: {
      return {
        ...state,
        coloniasMap: action.payload.data
      }
    }

    case FECTH_ACTUAL_COLONIA_MAP: {
      return {
        ...state,
        actualColoniaMap: action.payload.data
      }
    }

    case FETCH_CENTROID: {
      return {
        ...state,
        centroid: action.payload.data
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