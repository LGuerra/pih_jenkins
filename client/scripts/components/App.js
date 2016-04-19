import React from 'react';
import { NavBar, NavBarLink, NavBarDropDown } from 'im-main-navigation';
import Footer from './common/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='banca-router'>
        <NavBar id='my-new-id' logoText='Intelimétrica'/>
        {this.props.children}
      </div>
    )
  }
}

export default App;
