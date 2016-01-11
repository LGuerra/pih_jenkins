import React from 'react';

class IMQuantitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quantity: this.props.startingPoint};
    this._handleClickDiff = this._handleClickDiff.bind(this);
    this._handleClickSum  = this._handleClickSum.bind(this);
  }

  _handleClickDiff() {
    if (this.state.quantity > this.props.lowerLimit) this.setState({quantity: this.state.quantity -1});
  }

  _handleClickSum() {
    if (this.state.quantity < this.props.upperLimit) this.setState({quantity: this.state.quantity +1});
  }

  render () {
    return (
      <div className="im-quantity-selector" style={this.props.styles}>
        <button className="im-quantity-selector-button" type="button" onClick={this._handleClickDiff}>-</button>
        {this.state.quantity}
        <button className="im-quantity-selector-button" type="button" onClick={this._handleClickSum}>+</button>
      </div>
    );
  }
}

module.exports = IMQuantitySelector;
