import { userAPI } from 'api-banca';
import _ from 'lodash';
var $ = require('jquery');

export const serverAuthResponse = () => {
  return new Promise((resolve, reject) => {
    userAPI.getInfo().then((data) => {
      resolve(data);
    })
    .catch((res) => {
      reject(res);
    });
  });
}

export const removeAlerts = (nextState, replace, next) => {
  setTimeout( function() {
    $('.sign-in-notice').hide();
  }, 4000);
  next();
};

export const checkPermissions = function(nextState, replace, next) {
  console.log(nextState, replace, next);
  var routeGroup = this.group || '';
  serverAuthResponse()
  .then((args) => {
    const userGroups = args.data.groups || [];
    if(!_.includes(userGroups, routeGroup)) {
      replace({ 
        pathname: '/' 
      });
    }
    next();
  })
  .catch((args) => {
    replace({
      pathname: '/',
      state: { 
        nextPathname: nextState.location.pathname,
        query: nextState.location.query
      }
    })
    next();
  });
}

export const redirectToNotAllowed = (nextState, replace, next) => {

}

export const redirectToLogin = (nextState, replace, next) => {
  serverAuthResponse()
  .catch((args) => {
    replace({
      pathname: '/users/login',
      state: { nextPathname: nextState.location.pathname }
    })
    next();
  });
}

export const redirectToLanding = (nextState, replace, next) => {
  serverAuthResponse()
  .then((args) => {

  });
}
