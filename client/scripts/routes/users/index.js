import SignIn from './signIn/SignIn';
import UsersContainer from './components/UsersContainer';
import { userIsAuthenticated } from 'helpers-banca';


export default {
  path: 'users',
  component: UsersContainer,
  childRoutes: [
    {
      path: 'login',
      component: SignIn,
      onEnter: userIsAuthenticated
    }
  ]
};
