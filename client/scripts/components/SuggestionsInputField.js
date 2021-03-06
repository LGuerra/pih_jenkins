// Vendor
import React, { Component } from 'react';
import _                    from 'lodash';
import { helpersAPI }       from '../api/api-helper';

// Components
import SuggestionsDropdown  from './SuggestionsDropdown';

class SuggestionsInputField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedSuggestion: '',
      showDropdown: false
    }
  }

  _parseSuggestions(hits) {
    return _.map(hits, (hit) => {
      return {
        id: hit.id,
        content: hit.fields.name,
        highlights: hit.highlights.name
      };
    });
  }

  _parseSuggestionsGoogle(hits) {
    return _.map(hits, hit => {
      let offset    = hit.matched_substrings[0].offset;
      let length    = hit.matched_substrings[0].length;
      let content   = hit.description;
      let highlight = content.slice(0,offset) + "<b>" + content.slice(offset, offset+length) + "</b>" + content.slice(offset+length);

      return {
        id: hit.place_id,
        content: content,
        highlights: highlight
      };
    });
  }

  _keyDownInput (e) {
    let arr = this.state.suggests;

    if (arr) {
      let i = arr.indexOf(this.state.selectedSuggestion);
      let arrIds = this.state.ids;
      let length = arr.length;

      if ( e.keyCode == 40 ) {
        i += 1;
        if (i >= length) i -= length;
        this.refs.input.value = this.state.suggests[i].content;
      } else if ( e.keyCode == 38 ) {
        i -= 1;
        if (i < 0) i += length;
        this.refs.input.value = this.state.suggests[i].content;
      }

      this.setState({
        selectedSuggestion: arr[i]
      });

      if ( e.keyCode == 13 ) {
        this._onSelectItem(this.state.selectedSuggestion);
      } else if ( e.keyCode == 27 ) {
        this.setState({
          showDropdown: false
        });
      }
    }
  }

  cleanSuggestions() {
    this.setState({
      showDropdown: false
    });
  }

  _onClick(e) {
    e.target.select();
  }

  _onSelectItem(item) {
    this.setState({
      selectedSuggestion: item,
      showDropdown: false
    }, () => {
      this.refs.input.value = item.content;
      this.props.onSelectItem(item);
    });
  }

  _inputChangeHandler(e) {
    let searchInput = e.target.value;
    let _this = this;
    let suggests = [];
    if (searchInput.length >= 3) {
      if (this.props.searchType === 'Vivienda') {
        // Create service to use googleapi autocompletion
        let service = new google.maps.places.AutocompleteService();
        // Build Request
        let request = { input: searchInput, types: ['address'] , componentRestrictions: {country: 'mx'}};
        // Execute service and print result in callback
        service.getPlacePredictions(request, (predictions, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            suggests = this._parseSuggestionsGoogle(predictions);
            suggests.unshift({content: searchInput, highlights: searchInput, id: -1});

            this.setState({
              showDropdown: true,
              suggests: suggests
            });
          }
        });
      } else {
        let arr    = searchInput.split(" ");
        let prefix = arr.pop();
        let b      = arr.map( e => "'"+e+"'").join(" ");

        helpersAPI.suburbsByName({
          'q': `(or(and ${b}(prefix '${prefix}'))'${searchInput}')`
        })
        .then((response) => {
          response = response.data;
          suggests = this._parseSuggestions(response.hits.hit);
          suggests.unshift({
            content: searchInput,
            highlights: searchInput,
            id: -1
          });
          this.setState({
            showDropdown: true,
            suggests: suggests
          });
        });
      }
    } else {
      this.setState({
        showDropdown: false
      });
    }
  }

  render() {
    let imDropdown;
    if (this.state.showDropdown) {
      imDropdown = (
        <SuggestionsDropdown
          items={this.state.suggests}
          className={this.props.dropdownClass}
          styles={{width: this.refs.input.offsetWidth}}
          selectedSuggestion={this.state.selectedSuggestion}
          selectMItem={this._onSelectItem.bind(this)}/>
      );
    }

    var lupaSVG = require('file!images-banca/black_lupa.svg');
    return (
      <div className={'form-group ' + this.props.specificGroupClass}>
        <div className={'input-group'}>
          <div
            onClick={this.cleanSuggestions.bind(this)}
            className={'click-outside'} style={{display: this.state.showDropdown ? 'block' : 'none'}}>
          </div>
          <div className="input-group-addon">
            <img width={20} height={20} src={lupaSVG}/>
          </div>
          <input
            id="landing-input"
            type="text"
            ref="input"
            data-toggle="popover"
            data-template='<div class="popover popover-alert" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            data-trigger="manual"
            className={this.props.specificInputClass}
            placeholder={this.props.placeholder}
            onClick={this._onClick}
            onChange={this._inputChangeHandler.bind(this)}
            onKeyDown={this._keyDownInput.bind(this)}></input>
        </div>
        {imDropdown}
      </div>
    )
  }
}

export default SuggestionsInputField;
