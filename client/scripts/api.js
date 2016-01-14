/* * File that encapsulates the logic
 * for api calls
 */
var isFunction = require('lodash/lang/isFunction');
var isObject = require('lodash/lang/isObject');
var isUndefined = require('lodash/lang/isUndefined');
var isNull = require('lodash/lang/isNull');
var toArray = require('lodash/lang/toArray');
var compose = require('lodash.compose');
var identity = require('lodash.identity');

function apiGetRequest(endpoint, parameters, callback) {
  var promise = $.ajax({
    url: '/' + endpoint,
    dataType: 'json',
    type: 'GET',
    data: parameters,
    error: function(XMLHttpRequest, textStatus, errorThrown){
      if (XMLHttpRequest.status === 401) {
        location.reload();
      }
      //callback.apply(null, arguments);
    }
  });

  return promise;
}

function formatBBox(bbox) {
  var northEast = bbox.getNorthEast();
  var southWest = bbox.getSouthWest();
  return northEast.lng() + ',' + northEast.lat() + ',' + southWest.lng() + ',' + southWest.lat();
}

function isEmptyParameter(value) {
  return value === '' || value === undefined || value === null;
}

function replaceWhenEmpty(obj, property, instead) {
  if (isEmptyParameter(obj[property])) {
    obj[property] = instead;
  }
}

function replaceWhen(obj, property, regex, replacement) {
  obj[property] = obj[property].replace(regex, replacement);
}

function ignoreWhenEmpty(obj, property) {
  if (isEmptyParameter(obj[property])) {
    delete obj[property];
  }
}

function isParams(arg) {
  return !isFunction(arg) && isObject(arg);
}

function callbackOrFailure(callback, failure) {
  return function(response) {
    if (isUndefined(response.status)) {
      callback(response);
    } else {
      if (isFunction(failure)) {
        failure(response);
      }
    }
  };
}

function endpoint(_endpoint) {
  var match = _endpoint.match(/^(.*)<\w+>(.*)$/);
  if (isNull(match)) {
    return _endpoint;
  } else {
    return function(placeholder) {
      return match[1] + placeholder + match[2];
    };
  }
}

function simpleApiMethod(endpoint, preProcess) {
  var requiresArgument = isFunction(endpoint);
  var precall = isFunction(preProcess) ? preProcess : identity;

  return function(/*parameters*/) {
    var args = toArray(arguments);
    var realEndpoint = requiresArgument ? endpoint(args.shift()) : endpoint;
    var params = isParams(args[0]) ? args.shift() : {};
    return apiGetRequest(realEndpoint, params);
  };
}

var buildMethod = compose(simpleApiMethod, endpoint);

// Public API calls

function serieVivienda(idVivienda, callback) {
  return apiGetRequest('vivienda/' + idVivienda + '/serie/', {});
}

function landing(parameters){
  return apiGetRequest('2013-01-01/search?', parameters);
}
module.exports = {
  landing
};
