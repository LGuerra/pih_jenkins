import _ from 'lodash';

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function getURLParameter(name) {
  /*eslint-disable*/
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  /*eslint-enable*/
}

export function getHouseInfor(id) {
  return new Promise((resolve, reject) => {
    let request = { placeId: id };
    let map = new google.maps.Map(document.createElement('div'));
    let service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(place);
      } else {
        reject('Error');
      }
    });
  })
}

export function classNames(assingments) {
  let className = _.reduce(assingments, (actual, value, key) => {
    if (value) {
      return actual + ' ' + key;
    }
    return actual;
  }, '');

  return className.substring(1);
}

export function compose() {
  let fns = arguments;

  return function() {
    var args = arguments;

    for (let i = 0; i < fns.length; i++) {
      args = [fns[i].apply(this, args)];
    }

    return args[0];
  }
}

export function toFix(decimal) {
  return function(value) {
    const d = decimal || 2;

    return value.toFixed(d);
  }
}

export function divide(divider) {
  return function(value) {
    return value / divider;
  }
}

export function multiply(multiplier) {
  return function(value) {
    return value * multiplier;
  }
}

export function addCommas(value) {
  return value.toFixed(0).replace(/./g, function(c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3) === 0 ? ',' + c : c;
  });
}

export function addPostfix(postfix) {
  return function(value) {
    return value + postfix;
  }
}

export function addPrefix(prefix) {
  return function(value) {
    return prefix + value;
  }
}

const formatAsBigPrice  = compose(divide(1000000), addCommas, addPrefix('$'), addPostfix('MDP'));
const formatAsPrice     = compose(addCommas, addPrefix('$'));
const formatAsNumber    = compose(addCommas);
const toPercentage      = compose(multiply(100), toFix(1), addPostfix('%'));

export { formatAsPrice,  formatAsNumber, formatAsBigPrice, toPercentage };
