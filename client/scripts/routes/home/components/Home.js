import React from 'react';
import { NavBar } from 'im-main-navigation';
import Footer from 'im-components/common/Footer';
import { userAPI } from 'api-banca';
import Form from './../../users/signIn/components/Form'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.logInUser = this.logInUser.bind(this);
  }

  logInUser(user) {
    let alertText = 'Error while logging...'
    userAPI.signIn(user)
      .then(data => {
        if(data.hasOwnProperty('data') && data.data.hasOwnProperty('id')) {
          const USER_ID = data.data.id;
          ga('set', 'userId', USER_ID);
          ga('send', 'home');
          let nextPath = '/', query = {};
          alertText = 'Has iniciado sesión correctamente';
          if(this.props.location.state !== null) {
            nextPath = this.props.location.state.nextPathname;
            query = this.props.location.state.query || {};
          }
          this.context.router.push({
            pathname: nextPath,
            query: query
          });
        }
        document.getElementById('alert-banca-text').textContent = alertText;
        $('#alert-banca').addClass('alert-success').show();

      })
      .catch(data => {
        document.getElementById('alert-banca-text').textContent = `Error: ${data.data.error}`;
        $('#alert-banca').addClass('alert-danger').show();
      })
      .then(() => {
        setTimeout(function() {
          $('#alert-banca').removeClass('alert-success alert-danger').hide();
        }, 4000);
      });
  }

  render() {
    var down_arrow = require('file!images-banca/down_arrow.svg');
    var logoImage = require('file!images-banca/logo_im.svg');
    return (
      <div className={'LogInBackground'} style={{ height: '100%'}}>
        <NavBar logoImage={logoImage}/>
        <div className='container' style={{ height: 'calc(100vh - 102px)', display: 'flex', alignItems: 'center'}}>
          <div className='row'>
            <div className='col-sm-12'>
              <h1 style={{ fontWeight: 100, color: '#FFFFFF', textAlign: 'center' }}>Plataforma de Inteligencia Hipotecaria</h1>
              <hr style={{ borderColor: '#FFFFFF', marginBottom: '100px' }}/>
              <div className='row landing-content'>
                <div className='col-sm-offset-3 col-sm-6 inner-content'>
                  <Form onSubmit={this.logInUser}/>
                </div>
              </div>
            </div>{/*
            <div className='col-sm-12 landing-arrow'>
              <img height={'30px'} src={down_arrow}/>
            </div>*/}
          </div>
        </div>
{/*        <div className='landing-secondary-content'>
          <div className='container'>
            <div className='col-sm-6 col-sm-offset-6'>
              Ut et iaculis elit, vel consequat mi. Suspendisse dapibus tempor enim, condimentum viverra massa scelerisque sed. Quisque sed posuere quam. In vehicula est in odio semper venenatis.
            </div>
          </div>
        </div>*/}
        <Footer/>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Home;
