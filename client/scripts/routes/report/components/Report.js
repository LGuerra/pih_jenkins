import React from 'react';

class Report extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.location.query);

    return (
      <div>
        <h3>Report</h3>
        <a href='helpers/logout'>Logout</a>
      </div>
    );
  }
}

export default Report;
