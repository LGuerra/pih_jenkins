import React from 'react';
import { NavBar, NavBarLink, NavBarDropDown } from 'imNavigation';
import Footer from './common/Footer';

const App = React.createClass({
  render() {
    return (
      <div>
        <NavBar id='my-new-id'>
          <NavBarLink/>
          <NavBarLink/>
          <NavBarLink/>
          <NavBarLink/>
          <NavBarDropDown image={'https://mobxjs.github.io/mobx/getting-started-assets/images/mobservable.png'} />
        </NavBar>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
})

export default App;
