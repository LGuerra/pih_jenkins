import React from 'react';
import { Input, DropdownButton, MenuItem,
         ButtonGroup, Button, Glyphicon,
         Image, Dropdown} from 'react-bootstrap';
import IMDropdownButton from '../components/DropdownButton';
import IMInputDropdown from '../components/Input'
import ModalVivienda from '../components/ModalVivienda';
import API from '../api';

function parseSuggestions(hit) {
  let ans = [];
  for ( let i = 0; i < hit.length; i++ ) {
    ans.push({id: hit[i].id,
              field: hit[i].fields.name,
              highlights: hit[i].highlights.name});
  }
  return ans;
}

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   metrics: [ 'Vivienda', 'Zona' ],
                  searchType: 'Vivienda'};
    this._searchTypeSelected = this._searchTypeSelected.bind(this);
    this._sendRequest = this._sendRequest.bind(this);
    this._inputChangeHandler = this._inputChangeHandler.bind(this);
  }

  _searchTypeSelected (sType) {
    console.log("_searchTypeSelected -->", sType);
    if (sType !== this.state.searchType) {
      this.setState({searchType: sType});
    }
  }

  _sendRequest () {
    console.log("Send request with parameter...", this.refs.searchInput.getValue());
  }

  _inputChangeHandler() {
    let searchInput = this.refs.searchInput.getValue();
    let _this = this;
    if (searchInput.length >= 3) {
      API.landing({"q": searchInput + "*", "return": "name", "highlight.name": "{}"})
        .done(function(response) {
          let suggests = parseSuggestions(response.hits.hit);
          _this.setState({suggestions: suggests});
        });
    } else {
      _this.setState({suggestions: []});
    }

  }

  render() {
    let suggestionItems;
    if (this.state.suggestions) {
      let suggestions = this.state.suggestions;
      if (suggestions.length > 0) {
        console.log("------Landing------");
        console.log("  there are suggestions", suggestions);
        suggestionItems = suggestions.map(e => {
          return { highlights: e.highlights, id: e.id, content: e.field};
        });
        {/*suggestionItems = suggestions.map(e => <MenuItem key={e.id} eventKey={e.id}><em>holi{e.highlights}</em></MenuItem>);*/}
      }
    } else suggestionItems = [];

    return (
        <div className="landing-page">
          <div className="row">
            <div className="col-md-12">
              <div id="id-search-container" className="col-md-6 col-md-offset-3 search-container">
                <div className="row">
                  <div className="col-md-2" style={{padding: 0}}>
                    <IMDropdownButton className="search-dropdown-button" outerButtonClassName="pull-right" items={this.state.metrics} styles={{width: 100}} selectMItem={this._searchTypeSelected}/>
                  </div>
                  <div className="col-md-8" style={{padding: 0}}>
                    <IMInputDropdown ref={"searchInput"} items={suggestionItems} changeHandler={this._inputChangeHandler}/>
                  </div>
                  <div className="col-md-2" style={{padding: 0}}>
                    <button className="search-button" onClick={this._sendRequest}>
                      <img src={IMAGES.lupa}></img>
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10 col-md-offset-1" style={{padding: 0}}>
                    <ModalVivienda />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

module.exports = Landing;
