import React from 'react';
import { Router } from 'react-router';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.refs['email-login'].value,
      password: this.refs['password-login'].value
    };
    this.props.onSubmit(user);
  }

  render() {
    var csrf = $('meta[name="csrf-token"]').attr('content');
    var user = require('file!images-banca/user-black.svg');
    var lock = require('file!images-banca/lock.svg');
    return (
      <form action='users/sign_in.json' onSubmit={this.onSubmit} method='post'>
        <div className='input-group form-group has-feedback has-feedback-left'>
          <span className='input-group-addon'>
            <img height='14px' width='18px' src={user}/>
          </span>
          <input autofocus='autofocus' className='input form-control' placeholder='Correo electrónico' type='email' name='user[email]' ref='email-login' id='user_email'/>
        </div>
        <div className='input-group form-group  has-feedback has-feedback-left'>
          <span className='input-group-addon'>
            <img height='14px' width='18px' src={lock}/>
          </span>
          <input autoComplete='off' className='input form-control' placeholder='Contraseña' type='password' name='user[password]' ref='password-login' id='user_password'/>
        </div>
        <input type='submit' name='commit' value='Entrar' className='init-session aqua-button' style={{padding: '7px 10px'}}/>
        <div className='forgot-remember'>
          <div className='pull-left'>
            <input name='user[remember_me]' type='hidden' value='0'/>
            <input type='checkbox' value='1' name='user[remember_me]' id='user_remember_me'/>
            <label className='remember-me' htmlFor='user_Recordarme'>Recordarme</label>
          </div>
        </div>
      </form>
    );
  }
}


export default Form;
