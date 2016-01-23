import React from 'react';

class NoChart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    return (
      <svg
        className={props.specificClass}
        id={props.id}
        width={props.width}
        height={props.height}>
        <text textAnchor={'middle'} x={'50%'} y={props.height / 2}>{props.message}</text>
      </svg>);
  }
}

export default NoChart;
