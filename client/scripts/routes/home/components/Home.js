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
      <div style={{ height: '100%' , background: '#efefef' }}>
        <NavBar logoText='Intelimétrica'/>
        <div className='container' style={{ minHeight: 'calc(100% - 102px)'}}>
          <div className='col-sm-12'>
            <h1 style={{ fontWeight: 100, color: '#35C0BE', textAlign: 'center' }}>Intelimétrica</h1>
            <hr style={{ borderColor: '#35C0BE' }}/>
            <div className='row'>
              <div className='col-sm-6'>
                <p>Imperdiet est fusce accumsan libero nam, sit Justo quis suspendisse tempor lacinia ultricies velit ligula justo potenti. Blandit potenti cubilia semper non augue Amet ligula. Donec vehicula, duis lorem faucibus conubia mus risus taciti cras. Porta ligula et a. Molestie, praesent.</p>
                <p>Urna vel lacinia ornare. Nibh. Quisque. Viverra vitae blandit curae; dui fames feugiat curae; pretium aptent. Montes.</p>
                <p>Imperdiet pharetra mauris, vehicula sit pretium class interdum ridiculus vivamus posuere curae; sem mauris tempus penatibus volutpat senectus sit fringilla viverra nec amet. Hymenaeos. Porta nisl arcu magnis vivamus. Fusce gravida. Erat. Egestas facilisi cubilia taciti congue nascetur quis est fusce libero.</p>
              </div>
              <div className='col-sm-6'>
                <Form onSubmit={this.logInUser}/>
              </div>
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
