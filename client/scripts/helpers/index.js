import { userAPI } from 'api-banca';
import _ from 'lodash';

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

export const checkPermissions = function(nextState, replace, next) {
  var routeGroup = this.group || '';
  serverAuthResponse()
  .then((args) => {
    const userGroups = args.data.groups || [];
    if(!_.includes(userGroups, routeGroup)) {
      replace({ pathname: '/' });
    }
    next();
  })
  .catch((args) => {
    console.log('not even logged');
    replace({
      pathname: '/users/login',
      state: { nextPathname: nextState.location.pathname }
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

// export const userIsAuthenticated = (nextState, replace, next) => {
//   serverAuth()
//   .then((args) => {
//     // if(nextState.location.pathname === '/users/login') {
//     //   replace({ pathname: '/' });
//     // }
//     next();
//   }, 
//   (args) => {
//     replace({
//       pathname: '/users/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//     next();
//   });
// };
