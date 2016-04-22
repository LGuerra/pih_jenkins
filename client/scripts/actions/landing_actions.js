export const SET_COLONIA      = 'SET_COLONIA';
export const SET_VIVIENDA     = 'SET_VIVIENDA';
export const SET_PARAMS_INFO  = 'SET_PARAMS_INFO';

export function onSetColonia(coloniaInfo) {
  return {
    type: SET_COLONIA,
    payload: coloniaInfo
  };
}

export function onSetVivienda(viviendaInfo) {
  return {
    type: SET_VIVIENDA,
    payload: viviendaInfo
  }
}

export function onSetParamsInfo(info) {
  return {
    type: SET_PARAMS_INFO,
    payload: info
  }
}