import React from 'react';
import NavBarHeader from './NavBarHeader';
import NavBarContent from './NavBarContent';

const NavBar = React.createClass({
  render() {
    var id = this.props.id;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <NavBarHeader id={id}/>
          <NavBarContent id={id}>
            {this.props.children}
          </NavBarContent>
        </div>
      </nav>
    )
  }
});

NavBar.defaultProps = {
  id: 'banca-intelimetrica-navbar-collapse'
};

export default NavBar;
