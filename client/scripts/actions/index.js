import axios from 'axios';
import { suburbAPI } from '../api/api-helper.js';

export const FETCH_COLONIA_INFO = 'FETCH_COLONIA_INFO';

export function fetchColoniaInfo(idCol) {
  const request = axios.all([
    suburbAPI.averageOffer(idCol, 6),
    suburbAPI.averageM2(idCol, 6),
    suburbAPI.information(idCol),
    suburbAPI.appreciation(idCol)
  ]);

  return {
    type: FETCH_COLONIA_INFO,
    payload: request
  };
}