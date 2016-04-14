import { UserAPI } from 'api-banca';

export const userIsAuthenticated = () => {
  UserAPI.getInfo().then((data) => {
    console.log(data);
  });
};
