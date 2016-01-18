import React from 'react';
import IMDropdownButton from './DropdownButton';
import IMInputDropdown from './Input'
import ModalVivienda from './ModalVivienda';
import API from '../api';

function parseSuggestions(hit) {
  let ans = [];
  for ( let i = 0; i < hit.length; i += 1 ) {
    ans.push({id: hit[i].id,
              content: hit[i].fields.name,
              highlights: hit[i].highlights.name});
  }
  return ans;
}
function parseSuggestionsGoogle(addresses) {
  let ans = [];
  for ( let i = 0; i < addresses.length; i += 1 ) {
    let offset    = addresses[i].matched_substrings[0].offset;
    let length    = addresses[i].matched_substrings[0].length;
    let content   = addresses[i].description;
    let highlight = content.slice(0,offset) + "<b>" + content.slice(offset, offset+length) + "</b>" + content.slice(offset+length);
    ans.push({ id:         addresses[i].place_id,
               content:    content,
               highlights: highlight});
  }
  return ans;
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { metrics:           ['Vivienda', 'Zona'],
                   searchType:         'Vivienda',
                   placeholder:        "Ingresa una dirección",
                   vivienda:           'Departamento',
                   operacion:          'Compra',
                   areaConstruida:     '100 m²',
                   edad:               '5 años',
                   habitaciones:       2,
                   banos:              1,
                   cajones:            1,
                   ddmodalShown:       {modal: true, ddSearchType: false, ddInput: false},
                   modaldd:            false
                 };
    this._searchTypeSelected    = this._searchTypeSelected.bind(this);
    this._sendRequest           = this._sendRequest.bind(this);
    this._inputChangeHandler    = this._inputChangeHandler.bind(this);
    this._modalChange           = this._modalChange.bind(this);
    this._clickSearchTypeButton = this._clickSearchTypeButton.bind(this);
    this._closeAllddModalShown  = this._closeAllddModalShown.bind(this);
    this._clickOutside          = this._clickOutside.bind(this);
    this._keyDownSearchType     = this._keyDownSearchType.bind(this);
    this._stopPropagation       = this._stopPropagation.bind(this);
    this._focusOnInput          = this._focusOnInput.bind(this);
    this._modalDD               = this._modalDD.bind(this);
  }

  _closeAllddModalShown () {
    return {modal: false, ddSearchType: false, ddInput: false};
  }

  _focusOnInput () {
    document.getElementById("landing-input").focus();
    //this.refs.searchInput.focus();
  }

  _sendRequest () {
    var templateUrl = ('/reporte?zona=:zona:&tipo=:reportType:')
      .replace(':zona:', this.refs.searchInput.state.selectedID)
      .replace(':reportType:', this.state.searchType);

    window.open(templateUrl, '_self');
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
    ans.placeholder = "Ingresa una colonia";
    if (sType === "Vivienda") {
      ddmShown.modal = true;
      ans.placeholder = "Ingresa una dirección";
    } else ddmShown.modal = false;
    ans.ddmodalShown = ddmShown;
    this.setState(ans);
  }

  _clickSearchTypeButton(a,b,c) {
    // IF SearchType was close
    //   Close it
    //   IF SearchType is Vivienda
    //     Show modal
    //   ELSE
    //     Show nothing
    // ELSE (SearchType was open)
    //   Close modal and Input
    //   Open it
    let ddmodalShown = this._closeAllddModalShown();
    let currentShown = this.state.ddmodalShown;
    if (currentShown.ddSearchType) {
      if (this.state.searchType === "Vivienda") ddmodalShown.modal = true;
    } else {
      if (this.state.searchType === "Vivienda") ddmodalShown.modal = true;
      ddmodalShown.ddSearchType = true;
    }
    this.setState({ddmodalShown: ddmodalShown, searchType: c, modaldd: false});
  }

  _keyDownSearchType(sType) {
    let ddmShown = this._closeAllddModalShown();
    let ans = {};
    if (sType !== this.state.searchType) {
      ans.searchType = sType;
    }
    ans.placeholder = "Ingresa una Colonia";
    if (sType === "Vivienda") {
      ans.placeholder = "Ingresa una dirección";
      ddmShown.modal = true;
    }
    ans.ddmodalShown = ddmShown;
    this.setState(ans);
  }

  _inputChangeHandler() {
    let searchInput = this.refs.searchInput.getValue();
    let _this = this;
    let ddmShown = _this._closeAllddModalShown();
    let suggests = [];
    if (searchInput.length >= 3) {
      ddmShown.ddInput = true;
      ddmShown.modal   = true;

      if (this.state.searchType === "Vivienda") {

        // Callback to set suggestions into state. Will recieve suggestions in prediction variable
        let displaySuggestions = (predictions, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            //console.log(predictions);
            suggests = parseSuggestionsGoogle(predictions);
            //console.log("SEARCH IN GOOGLE");
            _this.setState({suggestions: suggests, ddmodalShown: ddmShown, modaldd: false});
          }
        };

        // Create service to use googleapi autocompletion
        let service = new google.maps.places.AutocompleteService();
        // Build Request
        let request = { input: searchInput, types: ['geocode'] , componentRestrictions: {country: 'mx'}};
        // Execute service and print result in callback
        service.getPlacePredictions(request, displaySuggestions);
      } else {
        ddmShown.modal = false;
        let arr    = searchInput.split(" ");
        let prefix = arr.pop();
        let b      = arr.map( e => "'"+e+"'").join(", ");
        API.landing({"q": "(or(and"+ b + "(prefix '" + prefix + "'))'" + searchInput + "')",
                     "return": "name",
                     "q.parser": "structured",
                     "highlight.name": "{}"})
          .done(function(response) {
            //Desirable - IF response.isEmpty tell the user there is no data
            //console.log(response.hits.hit);
            suggests = parseSuggestions(response.hits.hit);
            //console.log(suggests);
            _this.setState({suggestions: suggests, ddmodalShown: ddmShown});
          });
      }
    } else {
      ddmShown.ddInput = false;
      ddmShown.modal   = (this.state.searchType === "Vivienda") ? true : false;
      _this.setState({suggestions: suggests, ddmodalShown: ddmShown});
    }
  }

  _clickOutside (e) {
    let ddmShown   = this._closeAllddModalShown();
    ddmShown.modal = (this.state.searchType === "Vivienda") ? true : false;
    //console.log("click outside");
    this.setState({ddmodalShown: ddmShown, suggestions: [], modaldd: false});
    //this._focusOnInput();
  }

  _modalDD (e) {
    let ddmShown = this._closeAllddModalShown();
    ddmShown.modal = true;
    this.setState({modaldd: e, ddmodalShown: ddmShown});
  }

  _stopPropagation (e) {
    e.stopPropagation();
  }

  render() {
    let ddmodalShown = this.state.ddmodalShown;
    let modalVivienda = (ddmodalShown.modal) ? (<ModalVivienda modalChange={this._modalChange}
                                                               ddshown={this.state.modaldd}
                                                               hideDropdowns={this._modalDD}
                                                               habitaciones={this.state.habitaciones}
                                                               banos={this.state.banos}
                                                               cajones={this.state.cajones}
                                                               vivienda={this.state.vivienda}
                                                               operacion={this.state.operacion}
                                                               areaConstruida={this.state.areaConstruida}
                                                               edad={this.state.edad} />) : "";

    return (
        <div className="landing-page" onClick={this._clickOutside} >
          <div className={'search-div'}>
            <div id="id-search-container" onClick={this._stopPropagation} className={'search-container'}>
              <div className={'sarch-dropdown'}>
                <div>
                <IMDropdownButton reference={"searchType"}
                                  className="search-dropdown-button"
                                  dropdownClassName="search-dropdown"
                                  items={this.state.metrics}
                                  showDropdown={ddmodalShown.ddSearchType}
                                  styles={{width: '100%'}}
                                  onClick={this._clickSearchTypeButton}
                                  handleKey13={this._keyDownSearchType}
                                  selectedItem={this.state.searchType}
                                  selectMItem={this._searchTypeSelected}/>
                </div>
              </div>
              <div className={'sarch-input'}>
                <IMInputDropdown ref={"searchInput"}
                                 items={this.state.suggestions}
                                 placeholder={this.state.placeholder}
                                 crOnSearch={this._sendRequest}
                                 showSuggestions={ddmodalShown.ddInput}
                                 changeHandler={this._inputChangeHandler}/>
              </div>
              <div className={'sarch-button'}>
                <button className="search-button" onClick={this._sendRequest}>
                  <img src={IMAGES.lupa}></img>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className={'modal-div'} onClick={this._stopPropagation}>
              {modalVivienda}
            </div>
          </div>
        </div>
    );
  }
}

module.exports = SearchForm;
