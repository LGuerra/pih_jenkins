import React, { Component } from 'react';

class InputFieldForm extends Component {
  _onChangeValue(e) {
    let toReturn = {};
    let value = e.target.value;

    if (Number(e.target.value) > Number(e.target.max)) {
      value = e.target.max;
      e.target.value = value;
    }

    if (Number(e.target.value) < Number(e.target.min)) {
      value = e.target.min;
      e.target.value = value;
    }

    toReturn[this.props.unit] = value;
    this.props.onUpdateValue(toReturn);
  }

  _onClick(e) {
    e.target.select();
  }

  render() {
    return (
      <div className={'form-group input-field-form'}>
        <div className={'input-container'}>
          <input
            ref={'input'}
            onClick={this._onClick}
            onChange={this._onChangeValue.bind(this)}
            className={'form-control'}
            type={'number'}
            defaultValue={this.props.defaultValue}
            min={this.props.min}
            max={this.props.max} />
        </div>
        <p className={'input-label'}>{this.props.label}</p>
      </div>
    );
  }
}

export default InputFieldForm;