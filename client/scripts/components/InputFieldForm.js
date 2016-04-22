import React, { Component } from 'react';

class InputFieldForm extends Component {
  _onChangeValue(e) {
    let toReturn = {};
    toReturn[this.props.unit] = e.target.value;

    this.props.onUpdateValue(toReturn);
  }

  _onClick(e) {
    console.log(e.target.select());
  }

  render() {
    return (
      <div className={'form-group input-field-form'}>
        <div className={'input-container'}>
          <input
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