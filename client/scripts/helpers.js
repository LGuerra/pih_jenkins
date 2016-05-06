import _ from 'lodash';

export function formatAsPrice(value) {
  var prefix = value < 0 ? '-' : '';
  var newValue = Math.abs(value);
  return prefix + '$' + newValue.toFixed().replace(/./g, function(c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3) === 0 ? ',' + c : c;
  });
}

export function formatAsBigPrice(value) {
  value = value / 1000000;
  return '$' + value.toFixed().replace(/./g, function(c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3) === 0 ? ',' + c : c;
  }) + ' MDP';
}

export function formatAsNumber(value) {
  return value.toFixed().replace(/./g, function(c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3) === 0 ? ',' + c : c;
  });
}

export function toTitleCase(str)
{
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function getURLParameter(name) {
  /**
   * Disabling eslint to avoid regex ERROR*/
  /*eslint-disable*/
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  /*eslint-enable*/
}

export function getHouseInfor(id, callback) {
  let request = {placeId: id};
  let map = new google.maps.Map(document.createElement('div'));
  let service = new google.maps.places.PlacesService(map);

  service.getDetails(request, (place, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      callback(place);
    }
  });
}

export function classNames(assingments) {
  return _.reduce(assingments, (actual, value, key) => {
    if (value) {
      return actual + ' ' + key;
    }

    return actual;
  }, '');
}