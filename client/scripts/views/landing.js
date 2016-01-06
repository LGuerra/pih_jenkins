import React from 'react';

import Component from '../components/component';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var hatClass = 'hat ' + this.props.type;
    return (
      <div className={hatClass}>
        <Component/>
      </div>
    );
  }
}

export default Landing;
