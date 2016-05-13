export const SET_INITIAL_STATE  = 'SET_INITIAL_STATE';
export const SET_COLONIA        = 'SET_COLONIA';
export const SET_VIVIENDA       = 'SET_VIVIENDA';
export const SET_PARAMS_INFO    = 'SET_PARAMS_INFO';
export const SET_FORM           = 'SET_FORM';

export function addOptimisticActionCreator(type, payload) {
  return {type, payload}
}

export function setInitialState() {
  return function(dispatch) {
    dispatch(addOptimisticActionCreator(SET_INITIAL_STATE, {}));

    return null;
  }
}

export function onSetForm(idForm) {
  return function(dispatch) {
    dispatch(addOptimisticActionCreator(SET_FORM, idForm));

    return null;
  }
}

export function onSetColonia(coloniaInfo) {
  return function(dispatch) {
    dispatch(addOptimisticActionCreator(SET_COLONIA, coloniaInfo));
  }
}

export function onSetVivienda(viviendaInfo) {
  return function(dispatch) {
    dispatch(addOptimisticActionCreator(SET_VIVIENDA, viviendaInfo));
  }
}

export function onSetParamsInfo(info) {
  return function(dispatch) {
    dispatch(addOptimisticActionCreator(SET_PARAMS_INFO, info));
  }
}