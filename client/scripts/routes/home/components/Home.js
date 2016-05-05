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
          let nextPath = '/';
          alertText = 'Correct logging...';
          if(this.props.location.state !== null) {
            nextPath = this.props.location.state.nextPathname;
          }
          this.context.router.replace({
            pathname: nextPath
          });
        }
        document.getElementById('alert-banca-text').textContent = alertText;
        $('#alert-banca').show();
      })
      .catch(data => {
        console.log('--------');
        document.getElementById('alert-banca-text').textContent = alertText;
        $('#alert-banca').show();
      });
  }

  render() {
    var down_arrow = require('file!images-banca/down_arrow.svg');
    return (
      <div style={{ height: '100%' , background: '#efefef' }}>
        <NavBar logoText='Intelimétrica'/>
        <div className='container' style={{ height: '85vh', display: 'flex', alignItems: 'center'}}>
          <div className='row'>
            <div className='col-sm-12'>
              <h1 style={{ fontWeight: 100, color: '#35C0BE', textAlign: 'center' }}>Plataforma de Inteligencia Hipotecaria</h1>
              <hr style={{ borderColor: '#35C0BE', marginBottom: '100px' }}/>
              <div className='row landing-content'>
                <div className='col-sm-6 inner-content'>
                  <p>Imperdiet est fusce accumsan libero nam, sit Justo quis suspendisse tempor lacinia ultricies velit ligula justo potenti. Blandit potenti cubilia semper non augue Amet ligula. Donec vehicula, duis lorem faucibus conubia mus risus taciti cras. Porta ligula et a. Molestie, praesent.</p>
                  <p>Urna vel lacinia ornare. Nibh. Quisque. Viverra vitae blandit curae; dui fames feugiat curae; pretium aptent. Montes.</p>
                  <p>Imperdiet pharetra mauris, vehicula sit pretium class interdum ridiculus vivamus posuere curae; sem mauris tempus penatibus volutpat senectus sit fringilla viverra nec amet. Hymenaeos. Porta nisl arcu magnis vivamus. Fusce gravida. Erat. Egestas facilisi cubilia taciti congue nascetur quis est fusce libero.</p>
                </div>
                <div className='col-sm-6 inner-content'>
                  <Form onSubmit={this.logInUser}/>
                </div>
              </div>
            </div>
            <div className='col-sm-12 landing-arrow'>
              <img height={'30px'} src={down_arrow}/>
            </div>
          </div>
        </div>
        <div className='landing-secondary-content'>
          <div className='container'>
            <div className='col-sm-6 col-sm-offset-6'>
              Ut et iaculis elit, vel consequat mi. Suspendisse dapibus tempor enim, condimentum viverra massa scelerisque sed. Quisque sed posuere quam. In vehicula est in odio semper venenatis.
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Home;
