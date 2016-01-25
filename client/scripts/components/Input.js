import React from 'react'
import IMDropdown from './Dropdown'

class IMInputDropdown extends React.Component {
  constructor(props){
    super(props);
    this.state            = {  showDropdown:       false,
                               items:              [],
                               contents:           [],
                               ids:                [],
                               selectedItem:       "",
                               selectedSuggestion: "",
                               searchInput:        ""
                            };
    this.getValue         = this.getValue.bind(this);
    this.selectMenuItem   = this.selectMenuItem.bind(this);
    this.updatedItems     = this.updatedItems.bind(this);
    this.showDropdown     = this.showDropdown.bind(this);
    this.createIMDropdown = this.createIMDropdown.bind(this);
    this.keyDownInput     = this.keyDownInput.bind(this);
    this.sendRequest      = this.sendRequest.bind(this);
  }

  getValue() {
    return this.refs.input.value;
  }

  selectMenuItem(a) {
    if (!a) this.props.crOnSearch();
    else {
      let selectedItem;
      let selectedID;
      let lKP = (this.state.lastKeyPressed === 13) ? "Go" : 13;
      if (this.state.items.length === 0) {
        selectedItem = this.state.selectedItem;
        selectedID   = this.state.selectedID;
      } else {
        selectedItem = this.state.contents[this.state.items.indexOf(a)];
        selectedID   = this.state.ids[this.state.items.indexOf(a)]
      }
      this.refs.input.value = selectedItem;
      if (selectedID === -1) {

        $('[data-toggle="popover"]').popover({content: "Elige una de las sugerencias",
                                              placement: this.props.popoverPlacement});
        $('[data-toggle="popover"]').popover('show');
        setTimeout(()=> $('[data-toggle="popover"]').popover('destroy'), 2000);
        this.setState({lastKeyPressed: ""});
      } else {
        this.setState({selectedItem: selectedItem,
                       selectedID:   selectedID,
                       showDropdown: false,
                       contents:     [],
                       ids:          [],
                       items:        [],
                       lastKeyPressed: lKP}, this.sendRequest);
      }
    }
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

  sendRequest () {
    this.props.crOnSearch(this.state.selectedID, this.state.lastKeyPressed);
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
                         ids: updatedItems.ids,
                         lastKeyPressed: ""});
        } else {
          this.setState({showDropdown: false});
        }
      }
    }
    return true;
  }

  showDropdown() {
    this.props.changeHandler();
    this.setState({showDropdown: this.props.showSuggestions, lastKeyPressed: ""});
  }

  keyDownInput (e) {
    let arr = this.state.items;
    let arrContents = this.state.contents;
    let arrIds = this.state.ids;
    let length = arr.length;
    let i = arr.indexOf(this.state.selectedSuggestion);

    if (this.state.contents.length > 0) {
      if ( e.keyCode === 40 ) {
        i += 1;
        if (i >= length) i -= length;
        this.setState({selectedSuggestion: arr[i],
                       selectedItem: arrContents[i],
                       selectedID: arrIds[i],
                       lastKeyPressed: 40});
        this.refs.input.value = this.state.contents[i];
      }
      if ( e.keyCode === 38 ) {
        i -= 1;
        if (i < 0) i += length;
        this.setState({selectedSuggestion: arr[i],
                       selectedItem: arrContents[i],
                       selectedID: arrIds[i],
                       lastKeyPressed: 38});
        this.refs.input.value = this.state.contents[i];
      }
    }
    if ( e.keyCode === 13 ) {
      this.selectMenuItem(this.state.selectedSuggestion);
    }
  }


  createIMDropdown () {
    return (<IMDropdown items={this.state.items}
                        className={this.props.dropdownClass}
                        styles={{width:this.refs.input.offsetWidth}}
                        selectedSuggestion={this.state.selectedSuggestion}
                        selectMItem={this.selectMenuItem}/>);
  }

  render() {
    let imDropdown;
    if (this.state.showDropdown) {
      imDropdown = this.createIMDropdown();
    }

    return (
      <div className="im-input-dropdown"
           data-container="body"
           data-toggle="popover"
           data-template='<div class="popover popover-alert" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
           data-trigger="manual" >
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
