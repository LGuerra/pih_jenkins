import React from 'react';

import { Link } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <NavBar routes={this.props.routes} />
        {this.props.children}
        <Footer/>
      </div>
    )
  }
})

module.exports = App;
