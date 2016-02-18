import axios from 'axios'

let stage = __API_STAGE__;
let apiEndpoint = `/v1/${stage}`;

axios.defaults.headers.post['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr('content');

const viviendaAPI = (() => {

  let similars = (params) => {
    return axios.post(`${apiEndpoint}/similars`, params);
  };

  let valuation = (params) => {
    return axios.post(`${apiEndpoint}/model/valuation`, params);
  };

  return { similars, valuation }
})();

const helpersAPI = (() => {

  let suburbIsTrusted = (lat, lng) => {
    return axios.get(`${apiEndpoint}/helpers/suburb-is-trusted`, { params: {lat: lat, lng: lng} });
  };

  let suburbFromCoords = (lat, lng) => {
    return axios.get(`${apiEndpoint}/helpers/suburb-from-coordinates`, { params: {lat: lat, lng: lng} });
  };

  return {
    suburbIsTrusted,
    suburbFromCoords
  };

})();

const suburbsAPI = (() => {

  let geojsons = (ids) => {
    let idsParams = ids.join(',');
    return axios.get(`${apiEndpoint}/suburbs/geojsons`, { params: {id_cols: idsParams} });
  };

  let report = (ids) => {
    let idsParams = ids.join(',');
    return axios.get(`${apiEndpoint}/suburbs/report`, { params: {id_cols: idsParams} });
  };

  return {
    geojsons,
    report
  };
})();

const suburbAPI = (() => {
  let suburbPath = '/suburb';

  let information = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}`);
  };

  let appreciation = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/appreciation`);
  };

  let averageM2 = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/average-m2`);
  };

  let averageOffer = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/average-offer`);
  };

  let averageTime = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/average-time`);
  };

  let centroid = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/centroid`);
  };

  let geojson = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/geojson`);
  };

  let smooth = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/smooth-geojson`);
  };

  let historicPrice = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/historic-price`);
  };
  
  let listingCount = (id, months) => {
    let params = {};
    if(typeof months !== 'undefined') {
      params.months = months;
    }
    return axios.get(`${apiEndpoint}/suburb/${id}/listing-count`, { params: params });
  };

  let typology = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/typology`);
  };

  let priceDistribution = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/price-distribution`);
  };

  let adjacent = (id) => {
    return axios.get(`${apiEndpoint}/suburb/${id}/adjacent`);
  };

  return { 
    adjacent,
    information,
    appreciation,
    averageM2,
    averageOffer,
    averageTime, 
    centroid,
    geojson,
    smooth,
    historicPrice,
    listingCount,
    typology,
    priceDistribution
  };
})();

const detailView = (id) => {
  let requests = [
    suburbAPI.information(id),
    suburbAPI.appreciation(id)
  ];
  return axios.all(requests);
};

export { suburbAPI, suburbsAPI, helpersAPI, viviendaAPI, detailView }
