import React, { Component } from 'react';
import _ from 'lodash';

class IconsSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: this.props.defaultIcon
    }
  }

  _selectIcon(value) {
    this.setState({
      active: value
    }, () => {
      let toReturn = {};
      toReturn[this.props.unit] = value;

      this.props.onUpdateValue(toReturn);
    });
  }

  _buildItems() {
    return _.map(this.props.icons, (icon, index) => {
      let isActive = icon.value == this.state.active
        ? '_2'
        : '';

      var iconSVG = require('file!images-banca/' + icon.icon + isActive + '.svg');
      //TODO Add icon color active
      return (
        <div
            key={'icon-' + index}
            onClick={this._selectIcon.bind(this, icon.value)}
            className={'icon is' + isActive}>
          <img className={'icon-image'} width={20} height={20} src={iconSVG}/>
          <p className={'icon-label'}>{icon.label}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={'icon-picker'}>
        {this._buildItems()}
      </div>
    );
  }
}

export default IconsSelector
