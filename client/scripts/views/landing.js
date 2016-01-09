import React from 'react';
import { Input, DropdownButton, MenuItem,
         ButtonGroup, Button, Glyphicon,
         Image, Dropdown} from 'react-bootstrap';
import IMDropdownButton from '../components/DropdownButton';

import Component from '../components/component';
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
    this.state = {searchType: 'Vivienda'};
    this._searchTypeSelected = this._searchTypeSelected.bind(this);
    this._sendRequest = this._sendRequest.bind(this);
  }

  _searchTypeSelected (e, sType) {
    if (sType !== this.state.searchType) {
      this.setState({searchType: sType});
    }
  }

  _sendRequest () {
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
    let searchType = (
      <DropdownButton title={this.state.searchType}
                      id="input-dropdown-addon"
                      onSelect={this._searchTypeSelected}>
        <MenuItem eventKey="Vivienda">Vivienda</MenuItem>
        <MenuItem eventKey="Zona">Zona</MenuItem>
      </DropdownButton>
    );

    let searchButton = (
      <ButtonGroup>
        <Button className="btn btn-info standard-button">
          <img style={{width: 16, height: 16, padding: 0, margin: 0}} src={IMAGES.basura}></img>
        </Button>
      </ButtonGroup>
    );

    let suggestionItems;
    if (this.state.suggestions) {
      let suggestions = this.state.suggestions;
      if (suggestions.length > 0) {
        console.log("there are suggestions", suggestions);
        suggestionItems = suggestions.map(e => <MenuItem key={e.id} eventKey={e.id}><em>holi{e.highlights}</em></MenuItem>);
        console.log(suggestionItems);
      }
    }

    let metrics = ['Vivienda','Zona'];
    return (
        <div className="landing-page">
          <div className="row">
            <div className="col-md-12">
              <div id="id-search-container" className="col-md-6 col-md-offset-3 search-container">
                <IMDropdownButton items={metrics} styles={{width: 100}}/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

module.exports = Landing;
