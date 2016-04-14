import axios from 'axios';
import { suburbAPI, suburbsAPI, viviendaAPI } from '../api/api-helper.js';

export const FETCH_COLONIA_INFO             = 'FETCH_COLONIA_INFO';
export const FETCH_VIVIENDA_INFO            = 'FETCH_VIVIENDA_INFO';
export const FETCH_OFERTA_DISPONIBLE        = 'FETCH_OFERTA_DISPONIBLE';
export const FETCH_DISTRIBUCION_TIPOLOGIA   = 'FETCH_DISTRIBUCION_TIPOLOGIA';
export const FETCH_PRECIO_HISTORICO         = 'FETCH_PRECIO_HISTORICO';
export const FETCH_DISTRIBUCION_PRECIO      = 'FETCH_DISTRIBUCION_PRECIO';
export const FETCH_COLONIAS_COMPARABLES     = 'FETCH_COLONIAS_COMPARABLES';
export const FETCH_VIVIENDAS_COMPARABLES    = 'FETCH_VIVIENDAS_COMPARABLES';

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

export function fetchOfertaDisponible(idCol) {
  const request = axios.all([
    suburbAPI.listingCount(idCol, 1),
    suburbAPI.listingCount(idCol, 6),
    suburbAPI.averageTime(idCol, 6)
  ]);

  return {
    type: FETCH_OFERTA_DISPONIBLE,
    payload: request
  }
}

export function fetchDistribucionTipologia(idCol) {
  const request = suburbAPI.typology(idCol);

  return {
    type: FETCH_DISTRIBUCION_TIPOLOGIA,
    payload: request
  }
}

export function fetchPrecioHistorico(idCol) {
  const request = suburbAPI.historicPrice(idCol);

  return {
    type: FETCH_PRECIO_HISTORICO,
    payload: request
  }
}

export function fetchDistribucionPrecio(idCol) {
  const request = suburbAPI.priceDistribution(idCol);

  return {
    type: FETCH_DISTRIBUCION_PRECIO,
    payload: request
  }
}

export function fetchColoniasComparables(idCol) {
  const request = suburbAPI.adjacent(idCol)
    .then(abjacentsR => abjacentsR.data)
    .then(data => {
      return suburbsAPI.report(data, 6);
    });

  return {
    type: FETCH_COLONIAS_COMPARABLES,
    payload: request
  }
}

export function fetchViviendaInfo(params) {
  const request = viviendaAPI.valuation(params);

  return {
    type: FETCH_VIVIENDA_INFO,
    payload: request
  }
}

export function fetchViviendasComparables(params) {
  const request = viviendaAPI.similars(params);

  return {
    type: FETCH_VIVIENDAS_COMPARABLES,
    payload: request
  }
}