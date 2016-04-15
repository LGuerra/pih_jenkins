import React from 'react';
import { NavBar, NavBarLink, NavBarDropDown } from 'im-main-navigation';
import { NavBar as SecondaryNav } from 'im-secondary-navigation';
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
        <SecondaryNav>
        </SecondaryNav>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
})

export default App;
