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
    //El aanterior showSuggestions TRUE, nuevo showSuggestions FALSE
    if (!nextProps.showSuggestions) {
      this.setState({showDropdown: false});
    } else {
      if (nextProps.items !== this.props.items) {
        this.props = nextProps;
        if (this.props.items !== undefined && this.props.items.length > 0) {
          this.updateItems();
          this.setState({showDropdown: this.props.showSuggestions});
        } else {
          this.setState({showDropdown: this.props.showSuggestions});
        }
      }
    }
    return true;
  }

  showDropdown() {
    this.setState({showDropdown: this.props.showSuggestions});
    this.props.changeHandler();
  }

  render() {
    let imDropdown;
    if (this.state.showDropdown) {
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
