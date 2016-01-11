import Spinner from 'react-spinkit';
import React from 'react';

class IMSpinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'spinner-container'} style={this.props.style}>
        <Spinner spinnerName='three-bounce' noFadeIn />
      </div>
    );
  }
}

export default IMSpinner;
