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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      this.props.quantityChange(nextState.quantity);
      return true;
    }
    return false;
  }

  render () {
    return (
      <div className="im-quantity-selector" style={this.props.styles}>
        <button className="im-quantity-selector-button" type="button" onClick={this._handleClickDiff}>-</button>
        <div style={{width: '20px', display: 'inline-block'}}>{this.state.quantity}</div>
        <button className="im-quantity-selector-button" type="button" onClick={this._handleClickSum}>+</button>
      </div>
    );
  }
}

export default IMQuantitySelector;
