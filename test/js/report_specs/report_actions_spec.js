import { expect } from 'chai';

import {
  // Action type
  SET_INITIAL_STATE,
  SELECT_COMPARATIVO_COLONIAS,
  SELECT_POLYGON,
  SET_COLONIA_INFO,
  SET_LOADING_FRAME,
  SET_URL_PARAMS,
  SET_VIEW_TYPE,
  SET_VIVIENDA_INFO,
  // Action creators
  setInitialState,
  onSelectComparativoColonias,
  onSelectPolygon,
  onSetColoniaInfo,
  onSetViviendaInfo,
  setLoadingFrame
} from '../../../client/scripts/actions/report_actions';

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
});