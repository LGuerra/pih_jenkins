import React from 'react';

class IMQuantitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.startingPoint
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(numOperator) {
    let newQuantity = this.state.quantity + numOperator;
    if (newQuantity >= this.props.lowerLimit && newQuantity <= this.props.upperLimit) {
      this.setState({
        quantity: newQuantity
      }, () => {
        this.props.quantityChange(newQuantity);
      });
    }
  }

  render () {
    return (
      <div className="im-quantity-selector" style={this.props.styles}>
        <button className="im-quantity-selector-button" type="button" onClick={this._handleClick.bind(this, -1)}>-</button>
        <div style={{width: '20px', display: 'inline-block'}}>{this.state.quantity}</div>
        <button className="im-quantity-selector-button" type="button" onClick={this._handleClick.bind(this, 1)}>+</button>
      </div>
    );
  }
}

export default IMQuantitySelector;
