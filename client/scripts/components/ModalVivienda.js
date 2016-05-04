import React from 'react';
import IMDropdownButton from './DropdownButton';
import IMQuantitySelector from './QuantitySelector';

class ModalVivienda extends React.Component {
  constructor(props) {
    super(props);
    this.state = { vivienda:         this.props.vivienda,
                   operacion:        this.props.operacion,
                   areaConstruida:   this.props.areaConstruida,
                   edad:             this.props.edad,
                   habitaciones:     this.props.habitaciones,
                   banos:            this.props.banos,
                   cajones:          this.props.cajones,
                   showingDropdowns: {
                    tipoVivienda:  false,
                    tipoOperacion: false,
                    areaConstruida: false,
                    edad: false
                  }
                };

    this._clickOutside          = this._clickOutside.bind(this);
    this._keyDownEdad           = this._keyDownEdad.bind(this);
    this._stopPropagation       = this._stopPropagation.bind(this);
    this.clicked                = this.clicked.bind(this);
    this.closeShowingDropdowns  = this.closeShowingDropdowns.bind(this);
  }

  _getValue(attribute, defaultVal, e) {
    let value = e.target.value;
    if (isNaN(parseInt(value,10))) {
      value = defaultVal;
    } else {
      value = parseInt(value, 10);
    }

    this.setState({
      showingDropdowns: this.closeShowingDropdowns()
    }, () => {
      let toChange = {};
      toChange[attribute] = value;
      this.props.modalChange(toChange);
    });
  }

  closeShowingDropdowns () {
    return {tipoVivienda:  false, tipoOperacion: false, areaConstruida: false, edad: false};
  }

  _updateState(attribute, value) {
    let newState = {
      showingDropdowns: this.closeShowingDropdowns()
    };
    newState[attribute] = value;
    this.setState(newState, () => {
      let toChange = {};
      toChange[attribute] = value;
      this.props.modalChange(toChange);
    });
  }

  clicked (which, state) {
    let dropdowns = this.closeShowingDropdowns();
    dropdowns[which] = state;
    this.props.hideDropdowns(state);
    this.setState({showingDropdowns: dropdowns});
  }

  _keyDownEdad(a) {
    this._selectEdad(a);
  }

  _clickOutside(e) {
    this.setState({showingDropdowns: this.closeShowingDropdowns()});
  }

  _stopPropagation (e) {
    e.stopPropagation();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ddshown === false) this.setState({showingDropdowns: this.closeShowingDropdowns()});
  }

  render () {
    let showing = this.state.showingDropdowns;
    const IMAGES = {
      blue_bed: require('file!images-banca/bed2.svg'),
      blue_wc: require('file!images-banca/wc2.svg'),
      blue_car: require('file!images-banca/car2.svg')
    };
    return (
      <div className="modal-box" onClick={this._clickOutside}>
        <div className="modal-row modal-icons-row" style={{padding: '15px 0 10px 0'}}>
          <div style={{textAlign: 'center'}}>
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.habitaciones}
                                lowerLimit={1}
                                upperLimit={10}
                                quantityChange={this._updateState.bind(this, 'habitaciones')}/>
            <span> <img src={IMAGES.blue_bed} width="20"></img> </span>
          </div>
          <div style={{textAlign: 'center'}}>
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.banos}
                                lowerLimit={1}
                                upperLimit={10}
                                quantityChange={this._updateState.bind(this, 'banos')}/>
            <span> <img src={IMAGES.blue_wc} width="20"></img> </span>
          </div>
          <div style={{textAlign: 'center'}}>
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.cajones}
                                lowerLimit={0}
                                upperLimit={10}
                                quantityChange={this._updateState.bind(this, 'cajones')}/>
            <span> <img src={IMAGES.blue_car} width="20"></img> </span>
          </div>
        </div>
        <div className="row modal-row">
          <div className="form-input-container col-sm-6 col-md-6 row">
            <div className="col-sm-6 col-xs-6 label-form-input">
              {'Tipo de vivienda'}
            </div>
            <div className="col-sm-6 col-xs-6 form-input" onClick={this._stopPropagation}>
              <IMDropdownButton reference={"tipoVivienda"}
                                items={["Departamento", "Casa"]}
                                className="modal-dropdown-button"
                                outerButtonClassName="pull-right modal-button-container"
                                showDropdown={showing.tipoVivienda}
                                onClick={this.clicked}
                                handleKey13={this._updateState.bind(this, 'vivienda')}
                                selectedItem={this.state.vivienda}
                                selectMItem={this._updateState.bind(this, 'vivienda')} />
            </div>
          </div>
          <div className="form-input-container col-sm-6 col-md-6 row">
            <div className="col-sm-6 col-xs-6 label-form-input">
              {'Tipo de operación'}
            </div>
            <div className="col-sm-6 col-xs-6 disabled-modal-dropdown-button form-input">
              <IMDropdownButton reference={"tipoOperacion"}
                                items={["Compra"]}
                                className="modal-dropdown-button"
                                outerButtonClassName="pull-right modal-button-container"
                                showDropdown={showing.tipoOperacion}
                                onClick={this.clicked}
                                handleKey13={this._updateState.bind(this, 'operacion')}
                                selectedItem={this.state.operacion}
                                selectMItem={this._updateState.bind(this, 'operacion')} />
            </div>
          </div>
        </div>
        <div className="row modal-row">
          <div className="form-input-container col-sm-6 col-md-6 row">
            <div className="col-sm-6 col-xs-6 label-form-input">
              {'Área de construcción'}
            </div>
            <div className="col-sm-6 col-xs-6 form-input">
              <div className='pull-right input-modal-outer-container' >
                <div className='input-modal-container' >
                  <input id="area-construida"
                         type="text"
                         ref="inputAreaConst"
                         className={"input-modal"}
                         maxLength="3"
                         onChange={this._getValue.bind(this, 'areaConstruida', 100)}
                         placeholder={"100"} >
                  </input>
                  <span className={"metric"}> m²</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-input-container col-sm-6 col-md-6 row">
            <div className="col-sm-6 col-xs-6 label-form-input">
              {'Edad'}
            </div>
            <div className="col-sm-6 col-xs-6 form-input">
              <div className='pull-right input-modal-outer-container'>
                <div className='input-modal-container'>
                  <input id="edad"
                         type="text"
                         ref="inputEdad"
                         className={"input-modal"}
                         maxLength="3"
                         onChange={this._getValue.bind(this, 'edad', 10)}
                         placeholder={"0"} >
                  </input>
                  <span className={"metric"}> años</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ModalVivienda;
