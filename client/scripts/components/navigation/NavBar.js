import React from 'react';
import NavBarHeader from './NavBarHeader';
import NavBarContent from './NavBarContent';

const NavBar = React.createClass({
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <NavBarHeader/>
          <NavBarContent/>
        </div>
      </nav>
    )
  }
})

export default NavBar;
