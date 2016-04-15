import { userAPI } from 'api-banca';

function serverAuth() {
  return new Promise((resolve, reject) => {
    userAPI.getInfo().then((data) => {
      resolve(data);
    })
    .catch((res) => {
      reject(res);
    });
  });
}

export const userIsAuthenticated = (nextState, replace, next) => {
  serverAuth()
  .then((args) => {
    console.log(nextState);
    // if(nextState.location.pathname === '/users/login') {
    //   replace({ pathname: '/' });
    // }
    next();
  }, 
  (args) => {
    replace({
      pathname: '/users/login',
      state: { nextPathname: nextState.location.pathname }
    })
    next();
  });
};
