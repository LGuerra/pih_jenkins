import React from 'react';
import NavBar from './navigation/NavBar';
import Footer from './common/Footer';

const App = React.createClass({
  render() {
    return (
      <div>
        <NavBar/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
})

export default App;
