import React from 'react'
import IMDropdown from './Dropdown'

class IMInputDropdown extends React.Component {
  constructor(props){
    super(props);
    this.state            = {showDropdown: false, items: []};
    this.getValue         = this.getValue.bind(this);
    this.selectMenuItem   = this.selectMenuItem.bind(this);
    this.manageInput      = this.manageInput.bind(this);
    this.updatedItems     = this.updatedItems.bind(this);
    this.showDropdown     = this.showDropdown.bind(this);
    this.createIMDropdown = this.createIMDropdown.bind(this);
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

  updatedItems() {
    let itemsIds = [];
    let itemsContents = [];
    let itemsHighlights = [];
    let receivedItems = this.props.items;
    for ( let i = 0; i < receivedItems.length; i += 1) {
      itemsContents.push(receivedItems[i].content);
      itemsHighlights.push(receivedItems[i].highlights);
      itemsIds.push(receivedItems[i].id);
    }

    //this.setState({items: itemsHighlights, contents: itemsContents, ids: itemsIds});
    return {items: itemsHighlights, contents: itemsContents, ids: itemsIds};
  }

  //shouldComponentUpdate(nextProps) {
  componentWillReceiveProps(nextProps) {
    //El aanterior showSuggestions TRUE, nuevo showSuggestions FALSE
    if (!nextProps.showSuggestions) {
      this.setState({showDropdown: false});
    } else {
      if (nextProps.items !== this.props.items) {
        this.props = nextProps;
        if (this.props.items !== undefined && this.props.items.length > 0) {
          let updatedItems = this.updatedItems();
          this.setState({showDropdown: true,
                         items: updatedItems.items,
                         contents: updatedItems.contents,
                         ids: updatedItems.ids});
        } else {
          this.setState({showDropdown: false});
        }
      }
    }
    return true;
  }

  showDropdown() {
    //let items = this.updateItems();
    this.props.changeHandler();
    this.setState({showDropdown: this.props.showSuggestions});
  }

  createIMDropdown () {
    return (<IMDropdown items={this.state.items}
                                styles={{width:450}}
                                selectMItem={this.selectMenuItem}/>);
  }

  render() {
    let imDropdown;
    if (this.state.showDropdown) {
      imDropdown = this.createIMDropdown();
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
