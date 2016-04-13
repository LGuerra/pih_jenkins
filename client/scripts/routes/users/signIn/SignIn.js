import React from 'react';
import Form from './components/Form'

class SignIn extends React.Component {
  render() {
    return (
      <div className='sign-in-container'>
        <div className='sign-in-form fadeInDown animated'>
          <h2>Inicie sesión</h2>
          <Form/>
        </div>
      </div>
    );
  }
}

export default SignIn;
