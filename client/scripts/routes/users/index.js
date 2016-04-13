import SignIn from './signIn/SignIn';
import UsersContainer from './components/UsersContainer';


export default {
  path: 'users',
  component: UsersContainer,
  childRoutes: [
    {
      path: 'login',
      component: SignIn
    }
  ]
};
