import React from 'react';
import { Router } from 'react-router';
import { userAPI } from 'api-banca';
import Form from './components/Form'

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.logInUser = this.logInUser.bind(this);
  }

  logInUser(user) {
    userAPI.signIn(user).then((data) => {
      if(data.hasOwnProperty('data') && data.data.hasOwnProperty('id')) {
        var nextPath = '/';
        if(this.props.location.state !== null) {
          nextPath = this.props.location.state.nextPathname;
        }
        this.context.router.replace({
          pathname: nextPath
        });
      }
    });
    console.log('try to login');
  }

  render() {
    return (
      <div className='sign-in-container'>
        <div className='sign-in-form fadeInDown animated'>
          <h2>Inicie sesión</h2>
          <Form onSubmit={this.logInUser}/>
        </div>
      </div>
    );
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignIn;
