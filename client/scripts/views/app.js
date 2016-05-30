import React from 'react';

import { Link } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/conditions">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

module.exports = App;
