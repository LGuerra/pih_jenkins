import React from 'react';

const NavBar = React.createClass({
  render() {
    var id = this.props.id;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
        </div>
      </nav>
    )
  }
});

NavBar.defaultProps = {
  id: 'banca-intelimetrica-secondary-navbar-collapse'
};

export default NavBar;
