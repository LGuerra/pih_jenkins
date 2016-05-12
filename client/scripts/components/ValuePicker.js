import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import _                    from 'lodash';

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

      let classnames = {
        selector: true,
        active: this.state.active == value
      };

      classnames[this.props.specificClass] = true;

      return (
        <div
          style={{width: 'calc(' + (100/range.length + '%') + ' - 1px)'}}
          onClick={this._selectValue.bind(this, value)}
          key={'selector-' + index}
          className={classNames(classnames)}><p>{label}</p></div>
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