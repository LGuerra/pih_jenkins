import React from 'react'
import IMDropdown from './Dropdown'

class IMInputDropdown extends React.Component {
  constructor(props){
    super(props);
    this.state          = {showDropdown: false, items: []};
    this.getValue       = this.getValue.bind(this);
    this.selectMenuItem = this.selectMenuItem.bind(this);
    this.manageInput    = this.manageInput.bind(this);
    this.updateItems    = this.updateItems.bind(this);
    this.showDropdown   = this.showDropdown.bind(this);
  }

  getValue() {
    return this.refs.input.value;
  }

  selectMenuItem(a) {
    let selectedItem = this.state.contents[this.state.items.indexOf(a)];
    this.refs.input.value = selectedItem;
    this.setState({selectedItem: selectedItem, showDropdown: false});

  }

  manageInput() {
    this.props.changeHandler();
    console.log("INPUTDROPDOWN\n   this.props.items >> ", this.props.items);
  }

  updateItems() {
    let itemsIds = [];
    let itemsContents = [];
    let itemsHighlights = this.props.items.map(e => {
      itemsIds.push(e.id);
      itemsContents.push(e.content);
      return e.highlights;
    });

    this.setState({items: itemsHighlights,
                   ids: itemsIds,
                   contents: itemsContents});
  }

  //shouldComponentUpdate(nextProps) {
  componentWillReceiveProps(nextProps) {
    console.log("------InputDropdown------");
    if (nextProps.items !== this.props.items) {
      console.log("nextProps", nextProps);
      this.props = nextProps;
      console.log("    shouldComponentUpdate - Received new props", this.props);
      if (this.props.items !== undefined && this.props.items.length > 0) {
        console.log("            Should do a this.setState({showDropdown: true})");
        this.setState({showDropdown: true});
        this.updateItems();
        /*if (!this.state.showDropdown){
          this.setState({showDropdown: true});
        }*/
      } else {
        console.log("            Should do a this.setState({showDropdown: false})");
        this.setState({showDropdown: false});
        /*if (this.state.showDropdown){
          this.setState({showDropdown: false});
        }*/
      }
      return true;
    }
    return false;
  }

  showDropdown() {
    if (this.state.items.length > 0)
      this.setState({showDropdown: true});
  }

  render() {
    console.log("        this.state.items after componentWillReceiveProps >>", this.state.items);
    console.log("        this.state.showDropdown >> ", this.state.showDropdown);
    let imDropdown;
    if (this.state.showDropdown) {
      //console.log("    this.state.showDropdown >> ", this.state.showDropdown);
      //console.log("IMInputDropdown >>\n");
      //console.log("    this.props.items >>", this.props.items);
      imDropdown = (<IMDropdown items={this.state.items}
                                styles={{width:450}}
                                selectMItem={this.selectMenuItem}/>);
    }

    return (
      <div className="im-input-dropdown">
        <input type="text" ref="input" onChange={this.props.changeHandler} onFocus={this.showDropdown}></input>
        {imDropdown}
      </div>
    );
  }
}

module.exports = IMInputDropdown;
