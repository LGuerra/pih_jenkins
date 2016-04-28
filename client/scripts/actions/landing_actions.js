export const SET_COLONIA      = 'SET_COLONIA';
export const SET_VIVIENDA     = 'SET_VIVIENDA';
export const SET_PARAMS_INFO  = 'SET_PARAMS_INFO';
export const SET_FORM         = 'SET_FORM';

export function onSetForm(idForm) {
  return {
    type: SET_FORM,
    payload: idForm
  }
}

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