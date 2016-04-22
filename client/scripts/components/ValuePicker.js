import React, { Component } from 'react';
import _ from 'lodash';

class ValuePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: this.props.defaultActive
    }
  }

  _selectValue(index) {
    this.setState({
      active: index
    }, () => {
      let toReturn = {};
      toReturn[this.props.unit] = index;

      this.props.onUpdateValue(toReturn);
    });
  }

  _buildValues() {
    return _.map(_.range(this.props.lowerLimit, this.props.upperLimit), (index) =>  {
      let isActive = this.state.active === index ? 'active' : '';
      return (
        <div
          onClick={this._selectValue.bind(this, index)}
          key={'selector-' + index}
          className={'selector ' + isActive}><p>{index}</p></div>
      )
    });
  }

  render() {
    return (
      <div className={'value-picker'}>
        {this._buildValues()}
      </div>
    );
  }
}

export default ValuePicker