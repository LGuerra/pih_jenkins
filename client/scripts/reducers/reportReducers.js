import {
  FETCH_COLONIA_INFO,
  FETCH_OFERTA_DISPONIBLE,
  FETCH_DISTRIBUCION_TIPOLOGIA,
  FETCH_PRECIO_HISTORICO,
  FETCH_DISTRIBUCION_PRECIO,
  FETCH_COLONIAS_COMPARABLES,
  FETCH_VIVIENDA_INFO,
  FETCH_VIVIENDAS_COMPARABLES
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
  viviendasComparables: []
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

    default:
      return state
  }
}