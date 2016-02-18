import React from 'react';
import IMDropdownButton from './DropdownButton';
import IMInputDropdown from './Input'
import ModalVivienda from './ModalVivienda';
import API from '../api';
import _ from 'lodash';
import { helpersAPI } from './../api/api-helper.js';

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
    this.state = { metrics:           ['Vivienda', 'Colonia'],
                   searchType:         'Vivienda',
                   placeholder:        "Ingresa una dirección",
                   vivienda:           'Departamento',
                   operacion:          'Compra',
                   areaConstruida:     100,
                   edad:               0,
                   habitaciones:       2,
                   banos:              1,
                   cajones:            1,
                   ddmodalShown:       {modal: true, ddSearchType: false, ddInput: false},
                   modaldd:            false,
                   inputClass:         ""
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
    this._handleClick           = this._handleClick.bind(this);
  }

  _closeAllddModalShown () {
    return {modal: false, ddSearchType: false, ddInput: false};
  }

  _handleClick () {
    if (!this.state.ddmodalShown.ddInput)
      this._sendRequest(this.refs.searchInput.state.selectedID, "Go");
    else
      this._sendRequest(this.refs.searchInput.state.selectedID, -1);
  }

  _focusOnInput () {
    document.getElementById("landing-input").focus();
    //this.refs.searchInput.focus();
  }

  _sendRequest (selectedID, lastKeyPressed) {
    let searchInput = this.refs.searchInput.getValue();

    if (!searchInput) {
      //this.setState({inputClass: "input-error"});
      let contentError = (this.state.searchType === 'Vivienda') ? "Ingresa una dirección" : "Ingresa una Colonia";
      $('[data-toggle="popover"]').popover({content: contentError, placement: 'top'});
      $('[data-toggle="popover"]').popover('show');
      setTimeout(()=> $('[data-toggle="popover"]').popover('destroy'), 2000);

    } else {
      if (searchInput.length >= 3) {
        //if (this.refs.searchInput.state.selectedID === -1) {
        if (selectedID === -1) {
          $('[data-toggle="popover"]').popover({content: "Elige una de las sugerencias", placement: 'top'});
          $('[data-toggle="popover"]').popover('show');
          setTimeout(()=> $('[data-toggle="popover"]').popover('destroy'), 2000);

        } else {
          if (this.state.searchType === 'Vivienda') {
            let tipoVivienda = (this.state.vivienda === "Departamento") ? 4 : 2;
            let templateUrl = ('reporte?colonia=:colonia:');
                templateUrl += '&tipo=Vivienda';
                templateUrl += '&longitud=:longitud:';
                templateUrl += '&latitud=:latitud:';
                templateUrl += '&recamaras=' + this.state.habitaciones;
                templateUrl += '&banos=' + this.state.banos;
                templateUrl += '&estacionamientos=' + this.state.cajones;
                templateUrl += '&id_tipo_vivienda=' + tipoVivienda;
                templateUrl += '&edad=' + this.state.edad;
                templateUrl += '&area_construida=' + this.state.areaConstruida;
                templateUrl += '&address=' + searchInput;
                templateUrl += '&tipo_operacion=0';
            /**
             * Use Google's API to get Latitude and Longitude via a PlacesService Request
             */
            let request = {placeId: selectedID};
            let map = new google.maps.Map(document.createElement('div'));
            let service = new google.maps.places.PlacesService(map);
            service.getDetails(request, (place, status) => {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                let latitude  = place.geometry.location.lat();
                let longitude = place.geometry.location.lng();

                helpersAPI.suburbIsTrusted(latitude, longitude)
                .then((suburbFromCoordsR) => {
                  if (suburbFromCoordsR.data.trusted) {
                    templateUrl = templateUrl.replace(':longitud:', longitude)
                               .replace(':latitud:',  latitude)
                               .replace(':colonia:', suburbFromCoordsR.data.id);
                    if (lastKeyPressed === "Go" ) window.open(templateUrl, '_self');
                    if (lastKeyPressed === 13) {
                      let ddShown = this._closeAllddModalShown();
                      ddShown.modal = true;
                      this.setState({ddmodalShown: ddShown});
                    }
                  } else {
                    let coloniaArr = searchInput.split(",");
                    let colonia = (coloniaArr.length > 2) ? coloniaArr[1] : coloniaArr[0];
                    $('[data-toggle="popover"]').popover({content: `Lo sentimos, estamos trabajando por tener valuaciones en ${colonia}`, placement: 'top'});
                    $('[data-toggle="popover"]').popover('show');
                    setTimeout(()=> $('[data-toggle="popover"]').popover('destroy'), 3000);

                  }
                });
              }
            });
            /**
             * Send request to Reporte's view inside callback
             */

          } else {
            let templateUrl = ('/reporte?colonia=:colonia:&tipo=:reportType:')
              .replace(':colonia:', selectedID)
              .replace(':reportType:', this.state.searchType);

            window.open(templateUrl, '_self');
          }
        }
      }
    }
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
      ans.suggestions = [];
      document.getElementById("landing-input").value = "";
    }
    ans.placeholder = "Ingresa una colonia";
    if (sType === "Vivienda") {
      ddmShown.modal = true;
      ans.placeholder = "Ingresa una dirección";
    } else ddmShown.modal = false;
    ans.ddmodalShown = ddmShown;
    ans.inputClass = "";
    ans.suggestions = [];
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
    this.setState({ddmodalShown: ddmodalShown, searchType: c, modaldd: false, inputClass: ""});
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
    ans.inputClass   = "";
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
            suggests = parseSuggestionsGoogle(predictions);
            suggests.unshift({content: searchInput, highlights: searchInput, id: -1});
            _this.setState({suggestions: suggests, ddmodalShown: ddmShown, modaldd: false, inputClass: ""});
          }
        };

        // Create service to use googleapi autocompletion
        let service = new google.maps.places.AutocompleteService();
        // Build Request
        let request = { input: searchInput, types: ['address'] , componentRestrictions: {country: 'mx'}};
        // Execute service and print result in callback
        service.getPlacePredictions(request, displaySuggestions);
      } else {
        ddmShown.modal = false;
        let arr    = searchInput.split(" ");
        let prefix = arr.pop();
        let b      = arr.map( e => "'"+e+"'").join(" ");
        API.landing({"q": "(or(and "+ b + "(prefix '" + prefix + "'))'" + searchInput + "')",
                     "return": "name",
                     "q.parser": "structured",
                     "highlight.name": "{}"})
          .done(function(response) {
            //Desirable - IF response.isEmpty tell the user there is no data
            suggests = parseSuggestions(response.hits.hit);
            suggests.unshift({content: searchInput, highlights: searchInput, id: -1});
            _this.setState({suggestions: suggests, ddmodalShown: ddmShown, inputClass: ""});
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
    this.setState({ddmodalShown: ddmShown, modaldd: false});
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

  componentDidMount () {
    document.getElementById("landing-input").focus();
  }

  render() {
    let ddmodalShown = this.state.ddmodalShown;
    let modalVivienda = (ddmodalShown.modal) ? (<div><div className={'modal-div-triangle'}></div>
                                                <ModalVivienda modalChange={this._modalChange}
                                                               ddshown={this.state.modaldd}
                                                               hideDropdowns={this._modalDD}
                                                               habitaciones={this.state.habitaciones}
                                                               banos={this.state.banos}
                                                               cajones={this.state.cajones}
                                                               vivienda={this.state.vivienda}
                                                               operacion={this.state.operacion}
                                                               areaConstruida={this.state.areaConstruida}
                                                               edad={this.state.edad} /></div>) : "";

    return (
        <div className="LandingPage" onClick={this._clickOutside} >
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
                                 className={this.state.inputClass}
                                 popoverPlacement={"top"}
                                 placeholder={this.state.placeholder}
                                 crOnSearch={this._sendRequest}
                                 showSuggestions={ddmodalShown.ddInput}
                                 changeHandler={_.debounce(this._inputChangeHandler, 100)}/>
              </div>
              <div className={'sarch-button'}>
                <button className="search-button" onClick={this._handleClick}>
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

export default SearchForm;
