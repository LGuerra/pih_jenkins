import React from 'react';
import IMDropdown from './Dropdown';

class IMDropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedItem: this.props.selectedItem,
                   showDropdown: this.props.showDropdown
                 };
    this._openDropdown   = this._openDropdown.bind(this);
    this._closeDropdown  = this._closeDropdown.bind(this);
    this._selectMenuItem = this._selectMenuItem.bind(this);
    this._keyDown        = this._keyDown.bind(this);
  }

  _openDropdown() {
    if (this.state.lastKeyPressed !== 13){
      this.props.onClick(this.props.reference, !this.state.showDropdown, this.state.selectedItem);
      if (!this.state.showDropdown) this.setState({showDropdown: true});
      else this._closeDropdown();
    }
    else this.setState({lastKeyPressed: ""});
  }

  _closeDropdown() {
    if (this.state.showDropdown) this.setState({showDropdown: false});
  }

  _selectMenuItem(a) {
    this.setState({selectedItem: a});
    this.props.selectMItem(a);
    this._closeDropdown();
  }

  _keyDown(e) {
    let arr = this.props.items;
    let length = arr.length;
    let i = arr.indexOf(this.state.selectedItem);

    if ( e.keyCode === 40 ) {
      i += 1;
      if (i >= length) i -= length;
      this.setState({selectedItem: arr[i]});
    }
    if ( e.keyCode === 38 ) {
      i -= 1;
      if (i < 0) i += length;
      this.setState({selectedItem: arr[i]});
    }
    if ( e.keyCode === 13 ) {
      this.setState({lastKeyPressed: 13});
      this.props.handleKey13(arr[i]);
      this._closeDropdown()
    }
  }

  shouldComponentUpdate (nextProps) {
    if (this.props !== nextProps)
      this.setState({showDropdown: nextProps.showDropdown});
    return true;
  }

  render() {
    let imDropdown;
    if (this.state.showDropdown) {
      imDropdown = (<IMDropdown items={this.props.items} className={this.props.dropdownClassName} selectMItem={this._selectMenuItem}/>);
    }
    var downArrow = require('file!images-banca/down_arrow.svg');
    return (
      <div className={this.props.outerButtonClassName}
           style={{display: 'inline-block', padding: 0, width: '100%', textAlign: 'right', position: 'relative'}} >
        <button className={"im-dropdown-button " + this.props.className }
                style={this.props.styles}
                onClick={this._openDropdown}
                ref={'dropdown_button'}
                onKeyDown={this._keyDown}>
          <span className="im-dropdown-button-text">
          {this.state.selectedItem}
          </span>
          <span className={'pull-right'}> <img src={downArrow} width="10"></img> </span>
        </button>
        {imDropdown}
      </div>
    );
  }
}

export default IMDropdownButton;
