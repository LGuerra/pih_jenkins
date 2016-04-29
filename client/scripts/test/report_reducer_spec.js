import { expect } from 'chai';
import { suburbAPI, suburbsAPI, viviendaAPI } from '../api/api-helper.js';

import {
  FETCH_VIVIENDA_INFO,

  onSetViviendaInfo
} from '../actions/report_actions';


describe('actions', () => {
  it('should creat an action to set vivienda info', () => {
    const newViviendaInfo = {};
    const expectedAction = {
      type: FETCH_VIVIENDA_INFO,
      payload: newViviendaInfo
    };

    expect(onSetViviendaInfo(text)).toEqual(expectedAction);
  });
});