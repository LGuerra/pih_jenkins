import React from 'react';
import { NavBar, NavBarLink, NavBarDropDown } from 'im-main-navigation';
import Footer from './common/Footer';

class RootApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='banca-router'>
        {this.props.children}
      </div>
    )
  }
}

export default RootApp;
