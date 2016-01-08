import React from 'react';
import { Input, DropdownButton, MenuItem,
         ButtonGroup, Button, Glyphicon,
         Image} from 'react-bootstrap';

import Component from '../components/component';
import API from '../api';

function parseSuggestions(hit) {
  let ids = [];
  let fields =[];
  let highlights [];
  for ( let e in hit ) {
    ids.push(e.id);
    fields.push(e.fields.name);
    highlights.push(e.highlights.name);
  }
  console.log(hit);
  return [ids, fields, highlights];
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
    if (searchInput.length >= 3) {
      API.landing({"q": searchInput + "*", "return": "name", "highlight.name": "{}"})
        .done(function(response) {
          let [i,f,h] = parseSuggestions(response.hits.hit);
          //this.setState(searchSuggestions:
          console.log(i,f,h);
        });
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
    console.log(this.state.searchType);

    return (
        <div className="landing-page">
          <div className="row">
            <div className="col-md-12">
              <div id="id-search-container" className="col-md-6 col-md-offset-3 search-container">
                <Input type="text"
                       ref="searchInput"
                       placeholder="Ingrese dirección"
                       onChange={this._sendRequest}
                       buttonBefore={searchType}
                       buttonAfter={searchButton} ></Input>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

module.exports = Landing;
