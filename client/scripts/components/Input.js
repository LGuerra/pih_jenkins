import React from 'react'
import IMDropdown from './Dropdown'

class IMInputDropdown extends React.Component {
  constructor(props){
    super(props);
    this.state            = {  showDropdown: false,
                               items: [],
                               selectedItem: "",
                               selectedSuggestion: "",
                               searchInput: ""
                            };
    this.getValue         = this.getValue.bind(this);
    this.selectMenuItem   = this.selectMenuItem.bind(this);
    this.updatedItems     = this.updatedItems.bind(this);
    this.showDropdown     = this.showDropdown.bind(this);
    this.createIMDropdown = this.createIMDropdown.bind(this);
    this.keyDownInput     = this.keyDownInput.bind(this);
  }

  getValue() {
    return this.refs.input.value;
  }

  selectMenuItem(a) {
    let selectedItem = this.state.contents[this.state.items.indexOf(a)];
    let selectedID   = this.state.ids[this.state.items.indexOf(a)]
    this.refs.input.value = selectedItem;
    this.setState({selectedItem: selectedItem, selectedID: selectedID, showDropdown: false});
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
                         selectedID: updatedItems.ids[0],
                         selectedItem: updatedItems.contents[0],
                         selectedSuggestion: updatedItems.items[0],
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
    this.props.changeHandler();
    this.setState({showDropdown: this.props.showSuggestions});
  }

  keyDownInput (e) {
    let arr = this.state.items;
    let length = arr.length;
    let i = arr.indexOf(this.state.selectedSuggestion);
    if ( e.keyCode === 40 ) {
      i += 1;
      if (i >= length) i -= length;
      this.setState({selectedSuggestion: arr[i], lastKeyPressed: 40});
      this.refs.input.value = this.state.contents[i];
    }
    if ( e.keyCode === 38 ) {
      i -= 1;
      if (i < 0) i += length;
      this.setState({selectedSuggestion: arr[i], lastKeyPressed: 38});
      this.refs.input.value = this.state.contents[i];
    }
    if ( e.keyCode === 13 ) {
      if( this.state.lastKeyPressed === 13 ) {
        this.props.crOnSearch();
      } else {
        this.selectMenuItem(this.state.selectedSuggestion);
      }
      this.setState({lastKeyPressed: 13});
    }
  }


  createIMDropdown () {
    return (<IMDropdown items={this.state.items}
                        styles={{width:this.refs.input.offsetWidth - 6}}
                        selectedSuggestion={this.state.selectedSuggestion}
                        selectMItem={this.selectMenuItem}/>);
  }

  render() {
    let imDropdown;
    if (this.state.showDropdown) {
      imDropdown = this.createIMDropdown();
    }

    return (
      <div className="im-input-dropdown">
        <input id="landing-input"
               type="text"
               ref="input"
               className={this.props.className}
               placeholder={this.props.placeholder}
               onChange={this.props.changeHandler}
               onFocus={this.showDropdown}
               onKeyDown={this.keyDownInput}></input>
        {imDropdown}
      </div>
    );
  }
}

module.exports = IMInputDropdown;
