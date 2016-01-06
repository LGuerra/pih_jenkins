/* Module for containing the routing logic */

import React from 'react';
import ReactDOM from 'react-dom';

var routeStore = {};

function registerRoute(routename, delayedComponent, callbackInstead) {
  if (routeStore.hasOwnProperty(routename)) {
    console.warn('Route "' + routename + '" is already defined');
  }

  routeStore[routename] = makeDispatcher(routename, delayedComponent, callbackInstead);
}

function registerRaw(routename, callback) {
  return registerRoute(routename, null, callback);
}

function makeDispatcher(viewPath, delayedComponent, callbackInstead) {
  if (typeof callbackInstead === 'function') {
    return callbackInstead;
  } else {
    return function() {
      ReactDOM.render(
        React.createElement(delayedComponent(), {
          location: Array.prototype.slice.call(arguments)
        }),
        document.getElementById('react-view-container')
      );
    };
  }
}

function dispatch() {
  var routeParts  = document.location.pathname.substring(1).split('/');
  var basePath    = routeParts.shift();
  var routeParams = routeParts;


  if (routeStore.hasOwnProperty(basePath)) {
    routeStore[basePath].apply(null, routeParams);
  }
}

export default {
  register: registerRoute,
  registerRaw: registerRaw,
  dispatch: dispatch
}
