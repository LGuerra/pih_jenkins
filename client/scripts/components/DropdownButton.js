import React from 'react';
import IMDropdown from './Dropdown';

class IMDropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedItem: this.props.items[0]};
    this.openDropdown = this.openDropdown.bind(this);
    this.selectMenuItem = this.selectMenuItem.bind(this);
  }

  openDropdown(e) {
    if(this.state.showDropdown) {
      this.setState({showDropdown: false});
    } else {
      this.setState({showDropdown: true});
    }
  }

  selectMenuItem(a) {
    console.log(a);
    this.setState({selectedItem: a, showDropdown: false});
  }

  render() {
    let imDropdown;
    if (this.state.showDropdown) {
      imDropdown = (<IMDropdown items={this.props.items} styles={{width: 100}} selectMItem={this.selectMenuItem}/>);
    }

    return (
      <div>
        <button className="im-dropdown-button" style={this.props.styles} onClick={this.openDropdown}>
          <span className="im-dropdown-button-text">
          {this.state.selectedItem}  *
          </span>
          {/*<span className="glyphicon glyphicon-menu-dropdown" aria-hidden="true">\/</span>*/}
        </button>
        {imDropdown}
      </div>
    );
  }
}

module.exports = IMDropdownButton;
