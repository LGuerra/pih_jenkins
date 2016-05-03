import axios from 'axios'

let stage;
switch(process.env.NODE_ENV) {
  case 'staging':
    stage = 'staging';
    break;
  case 'prod':
    stage = 'prod';
    break;
  case 'dev':
    stage = 'dev';
    break;
  default:
    stage = 'dev';
}
let apiEndpoint = `/v1/${stage}`;
if(process.env.NODE_ENV === 'test') {
  apiEndpoint = `http://0.0.0.0:3000/v1/${stage}`;
} else {
  var $ = require('jquery');
  axios.defaults.headers.post['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr('content');
  axios.defaults.headers.post['X-Transaction'] = 'POST Example';
}

const userAPI = (() => {
  let getInfo = () => {
    return axios.get('helpers/user_info');
  }

  let signIn = (user) => {
    return axios.post('users/sign_in.json', { user: user });
  }
  return { getInfo, signIn };
})();

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

  let report = (ids, months) => {
    let idsParams = ids.join(',');
    return axios.get(
      `${apiEndpoint}/suburbs/report`, 
      {
        params: {
          id_cols: idsParams,
          months: months || 6
        } 
      }
    );
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

  let averageM2 = (id, months) => {
    let params = {};
    if(typeof months !== 'undefined') params.months = months;
    return axios.get(`${apiEndpoint}/suburb/${id}/average-m2`, { params: params });
  };

  let averageOffer = (id, months) => {
    let params = {};
    if(typeof months !== 'undefined') params.months = months;
    return axios.get(`${apiEndpoint}/suburb/${id}/average-offer`, { params: params });
  };

  let averageTime = (id, months) => {
    let params = {};
    if(typeof months !== 'undefined') params.months = months;
    return axios.get(`${apiEndpoint}/suburb/${id}/average-time`, { params: params });
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
    if(typeof months !== 'undefined') params.months = months;
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

export { userAPI, suburbAPI, suburbsAPI, helpersAPI, viviendaAPI, detailView }
