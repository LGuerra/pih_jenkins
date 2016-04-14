import { FETCH_COLONIA_INFO } from '../actions/index';

const INITIAL_STATE = {
  viviendaInfo: {},
  coloniaInfo: [],
  ofertaDisponible: {},
  distribucionTipologia: {},
  precioHistorico: {},
  distribucionPrecio: {},
  propiedadesComparables: {},
  coloniasComparables: {}
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_COLONIA_INFO:
      return {
        coloniaInfo: action.payload.map(el => el.data)
      }
    default:
      return state
  }
}