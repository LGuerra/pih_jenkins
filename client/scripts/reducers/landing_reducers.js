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

import {
  SET_FORM,
  SET_COLONIA,
  SET_VIVIENDA,
  SET_PARAMS_INFO
} from '../actions/landing_actions';

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

    case SET_FORM: {
      return {
        ...state,
        activeForm: action.payload
      }
    }

    case SET_COLONIA: {
      return {
        ...state,
        colonia: action.payload
      }
    }

    case SET_VIVIENDA: {
      return {
        ...state,
        vivienda: action.payload
      }
    }

    case SET_PARAMS_INFO: {
      return {
        ...state,
        infoParams: action.payload
      }
    }

    default:
      return state
  }
}