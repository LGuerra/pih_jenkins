import React, { Component } from 'react';
import _ from 'lodash';

import { classNames } from '../helpers'

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
    let range = [];
    let temp = this.props.lowerLimit

    while (temp <= this.props.upperLimit) {
      range.push(temp);
      temp += this.props.steps;
    }

    return _.map(range, (value, index) =>  {
      let label = index !== (range.length - 1)
        ? value
        : value + '+';

      return (
        <div
          onClick={this._selectValue.bind(this, value)}
          key={'selector-' + index}
          className={classNames({
            selector: true,
            active: this.state.active == value
          })}><p>{label}</p></div>
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