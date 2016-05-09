import React from 'react';
import { NavBar, NavBarLink, NavBarDropDown } from 'im-main-navigation';
import Footer from './common/Footer';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  getNavBarContent() {
    // based in main.js config
    var appRoutes = this.props.routes[0].childRoutes[2];
    var routesToLinks = _.map(appRoutes, (route, index) => {
      //console.log(route);
    });
  }

  render() {
    const content = this.getNavBarContent();
    var userSVG = require('file!images-banca/user.svg');
    return (
      <div id='banca-router'>
        <NavBar id='my-new-id' logoText='Intelimétrica'>
          <NavBarDropDown image={userSVG}/>
        </NavBar>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

export default App;
