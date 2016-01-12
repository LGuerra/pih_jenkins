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
              content: hit[i].fields.name,
              highlights: hit[i].highlights.name});
  }
  return ans;
}

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { metrics:       ['Vivienda', 'Zona'],
                   searchType:     'Vivienda',
                   vivienda:       'dpto.',
                   operacion:      'compra',
                   areaConstruida: '100m2',
                   edad:           5,
                   habitaciones:   2,
                   banos:          1,
                   cajones:        1,
                   ddmodalShown:   {modal: true, ddSearchType: false, ddInput: false}
                 };
    this._searchTypeSelected    = this._searchTypeSelected.bind(this);
    this._sendRequest           = this._sendRequest.bind(this);
    this._inputChangeHandler    = this._inputChangeHandler.bind(this);
    this._modalChange           = this._modalChange.bind(this);
    this._clickSearchTypeButton = this._clickSearchTypeButton.bind(this);
    this._closeAllddModalShown  = this._closeAllddModalShown.bind(this);
  }

  _closeAllddModalShown () {
    return {modal: false, ddSearchType: false, ddInput: false};
  }

  _sendRequest () {
    console.log("Send request with parameter...", this.refs.searchInput.getValue());
  }

  _modalChange(modalData) {
    this.setState(modalData);
  }

  _searchTypeSelected (sType) {
    // A searchType is selected (sType)
    // close dropdowns and modals
    // IF sType is different than previous
    //   refresh this.state.searchType
    //   [Done before this question]close dropdowns and modals
    // ELSE (if selected is equal to previous)
    //   [Done before this question]close dropdowns and modals
    // IF now selected is Vivienda
    //   open modal
    let ddmShown = this._closeAllddModalShown();
    let ans = {};
    if (sType !== this.state.searchType) {
      ans.searchType = sType;
    }
    if (sType === "Vivienda") {
      ddmShown.modal = true;
    }
    ans.ddmodalShown = ddmShown;
    this.setState(ans);
  }

  _clickSearchTypeButton(a,b) {
    // IF SearchType was open
    //   Close it
    //   IF SearchType is Vivienda
    //     Show modal
    //   ELSE
    //     Show nothing
    // ELSE (SearchType was closed)
    //   Close modal and Input
    //   Open it
    let ddmodalShown = this._closeAllddModalShown();
    let currentShown = this.state.ddmodalShown;
    if (currentShown.ddSearchType) {
      if (this.state.searchType === "Vivienda") ddmodalShown.modal = true;
    } else {
      ddmodalShown.ddSearchType = true;
    }
    this.setState({ddmodalShown: ddmodalShown});
  }

  _inputChangeHandler() {
    let searchInput = this.refs.searchInput.getValue();
    let _this = this;
    let ddmShown = _this._closeAllddModalShown();
    let suggests = [];
    if (searchInput.length >= 3) {
      ddmShown.ddInput = true;
      if (this.state.searchType === "Vivienda") {

        console.log("SEARCH IN GOOGLE");
        _this.setState({ddmodalShown: ddmShown});
      }
      else {
        API.landing({"q": "(or(prefix'"+ searchInput + "')name:'" + searchInput + "')" ,
                     "return": "name",
                     "q.parser": "structured",
                     "highlight.name": "{}"})
          .done(function(response) {
            //Desirable - IF response.isEmpty tell the user there is no data
            suggests = parseSuggestions(response.hits.hit);
            _this.setState({suggestions: suggests, ddmodalShown: ddmShown});
          });
      }
    } else {
      ddmShown.ddInput = false;
      ddmShown.modal   = (this.state.searchType === "Vivienda") ? true : false;
      _this.setState({suggestions: suggests, ddmodalShown: ddmShown});
    }
  }

  render() {
    let ddmodalShown = this.state.ddmodalShown;
    let modalVivienda = (ddmodalShown.modal) ? (<ModalVivienda modalChange={this._modalChange}
                                                               habitaciones={this.state.habitaciones}
                                                               banos={this.state.banos}
                                                               cajones={this.state.cajones}
                                                               vivienda={this.state.vivienda}
                                                               operacion={this.state.operacion}
                                                               areaConstruida={this.state.areaConstruida}
                                                               edad={this.state.edad}
                                                               />) : "";

    return (
        <div className="landing-page">
          <div className="row">
            <div className="col-md-12">
              <div id="id-search-container" className="col-md-6 col-md-offset-3 search-container">
                <div className="row">
                  <div className="col-md-2" style={{padding: 0}}>
                    <IMDropdownButton reference={"searchType"}
                                      className="search-dropdown-button"
                                      outerButtonClassName="pull-right"
                                      items={this.state.metrics}
                                      showDropdown={ddmodalShown.ddSearchType}
                                      styles={{width: 100}}
                                      onClick={this._clickSearchTypeButton}
                                      selectedItem={this.state.searchType}
                                      selectMItem={this._searchTypeSelected}/>
                  </div>
                  <div className="col-md-8" style={{padding: 0}}>
                    <IMInputDropdown ref={"searchInput"}
                                     items={this.state.suggestions}
                                     showSuggestions={ddmodalShown.ddInput}
                                     changeHandler={this._inputChangeHandler}/>
                  </div>
                  <div className="col-md-2" style={{padding: 0}}>
                    <button className="search-button" onClick={this._sendRequest}>
                      <img src={IMAGES.lupa}></img>
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10 col-md-offset-1" style={{padding: 0}}>
                    {modalVivienda}
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
