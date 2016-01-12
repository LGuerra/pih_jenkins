import React from 'react';
import IMDropdown from './Dropdown';

class IMDropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state           = { selectedItem: this.props.selectedItem,
                             showDropdown: this.props.showDropdown
                           };
    this._openDropdown   = this._openDropdown.bind(this);
    this._closeDropdown  = this._closeDropdown.bind(this);
    this._selectMenuItem = this._selectMenuItem.bind(this);
  }

  _openDropdown() {
    this.props.onClick(this.props.reference, !this.state.showDropdown);
    if (!this.state.showDropdown) this.setState({showDropdown: true});
    else this._closeDropdown();
  }

  _closeDropdown() {
    if (this.state.showDropdown) this.setState({showDropdown: false});
  }

  _selectMenuItem(a) {
    this.setState({selectedItem: a});
    this.props.selectMItem(a);
    this._closeDropdown();
  }

  shouldComponentUpdate (nextProps) {
    if (this.props !== nextProps)
      this.setState({showDropdown: nextProps.showDropdown});
    return true;
  }

  render() {
    let imDropdown;
    if (this.state.showDropdown) {
      imDropdown = (<IMDropdown items={this.props.items} styles={{width: 95}} selectMItem={this._selectMenuItem}/>);
    }

    return (
      <div className={this.props.outerButtonClassName} style={{display: 'inline-block', padding: 0}}>
        <button className={"im-dropdown-button " + this.props.className } style={this.props.styles} onClick={this._openDropdown}>
          <span className="im-dropdown-button-text">
          {this.state.selectedItem}
          </span>
          <span> <img src={IMAGES.downArrow} width="10"></img> </span>
        </button>
        {imDropdown}
      </div>
    );
  }
}

module.exports = IMDropdownButton;
