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
                   showingDropdowns: {tipoVivienda:  false,
                                      tipoOperacion: false,
                                      areaConstruida: false,
                                      edad: false}
                 };
    this._selectVivienda        = this._selectVivienda.bind(this);
    this._selectOperacion       = this._selectOperacion.bind(this);
    this._selectAreaConstruida  = this._selectAreaConstruida.bind(this);
    this._selectEdad            = this._selectEdad.bind(this);
    this._selectHabitacion      = this._selectHabitacion.bind(this);
    this._selectBanos           = this._selectBanos.bind(this);
    this._selectCajones         = this._selectCajones.bind(this);
    this.clicked                = this.clicked.bind(this);
    this.closeShowingDropdowns  = this.closeShowingDropdowns.bind(this);
    this._keyDownVivienda       = this._keyDownVivienda.bind(this);
    this._keyDownOperacion      = this._keyDownOperacion.bind(this);
    this._keyDownAreaConstruida = this._keyDownAreaConstruida.bind(this);
    this._keyDownEdad           = this._keyDownEdad.bind(this);
    this.getValueArea           = this.getValueArea.bind(this);
    this.getValueEdad           = this.getValueEdad.bind(this);
  }

  getValueArea() {
    let areaConstruida = this.refs.inputAreaConst.value;
    if (isNaN(parseInt(areaConstruida,10))) areaConstruida = 100;
    else areaConstruida = parseInt(areaConstruida, 10);
    this.setState({showingDropdowns: this.closeShowingDropdowns()});
    this.props.modalChange({areaConstruida: areaConstruida});
  }

  getValueEdad() {
    let edad = this.refs.inputEdad.value;
    if (isNaN(parseInt(edad,10))) edad = 0;
    else edad = parseInt(edad, 10);
    this.setState({showingDropdowns: this.closeShowingDropdowns()});
    this.props.modalChange({edad: edad});
  }

  closeShowingDropdowns () {
    return {tipoVivienda:  false, tipoOperacion: false, areaConstruida: false, edad: false};
  }

  _selectVivienda (a) {
    if (a !== this.state.vivienda) this.setState({vivienda: a, showingDropdowns: this.closeShowingDropdowns()});
    else this.setState({showingDropdowns: this.closeShowingDropdowns()});
    this.props.modalChange({vivienda: a});
  }

  _selectOperacion (a) {
    if (a !== this.state.operacion) this.setState({operacion: a, showingDropdowns: this.closeShowingDropdowns()});
    else this.setState({showingDropdowns: this.closeShowingDropdowns()});
    this.props.modalChange({operacion: a});
  }

  _selectAreaConstruida (a) {
    if (a !== this.state.areaConstruida) this.setState({areaConstruida: a, showingDropdowns: this.closeShowingDropdowns()});
    else this.setState({showingDropdowns: this.closeShowingDropdowns()});
    this.props.modalChange({areaConstruida: a});
  }

  _selectEdad (a) {
    if (a !== this.state.edad) this.setState({edad: a, showingDropdowns: this.closeShowingDropdowns()});
    else this.setState({showingDropdowns: this.closeShowingDropdowns()});
    this.props.modalChange({edad: a});
  }

  _selectHabitacion (a) {
    if (a !== this.state.habitaciones) this.setState({habitaciones: a});
    this.props.modalChange({habitaciones: a});
  }

  _selectBanos (a) {
    if (a !== this.state.banos) this.setState({banos: a});
    this.props.modalChange({banos: a});
  }

  _selectCajones (a) {
    if (a !== this.state.cajones) this.setState({cajones: a});
    this.props.modalChange({cajones: a});
  }

  clicked (which, state) {
    let dropdowns = this.closeShowingDropdowns();
    dropdowns[which] = state;
    this.props.hideDropdowns(state);
    this.setState({showingDropdowns: dropdowns});
  }

  _keyDownVivienda(a) {
    this._selectVivienda(a);
  }

  _keyDownOperacion(a) {
    this._selectOperacion(a);
  }

  _keyDownAreaConstruida(a) {
    this._selectAreaConstruida(a);
  }

  _keyDownEdad(a) {
    this._selectEdad(a);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ddshown !== nextProps.ddshown && nextProps.ddshown === false) {
      this.setState({showingDropdowns: this.closeShowingDropdowns()});
    }

  }

  render () {
    let showing = this.state.showingDropdowns;

    return (
      <div className="modal-box">
        <div className="modal-row modal-icons-row" style={{padding: '15px 0 10px 0'}}>
          <div style={{textAlign: 'center'}}>
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.habitaciones}
                                lowerLimit={1}
                                upperLimit={10}
                                quantityChange={this._selectHabitacion}/>
            <span> <img src={IMAGES.blue_bed} width="20"></img> </span>
          </div>
          <div style={{textAlign: 'center'}}>
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.banos}
                                lowerLimit={1}
                                upperLimit={10}
                                quantityChange={this._selectBanos}/>
            <span> <img src={IMAGES.blue_wc} width="20"></img> </span>
          </div>
          <div style={{textAlign: 'center'}}>
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.cajones}
                                lowerLimit={0}
                                upperLimit={10}
                                quantityChange={this._selectCajones}/>
            <span> <img src={IMAGES.blue_car} width="20"></img> </span>
          </div>
        </div>
        <div className="row modal-row">
          <div className="form-input-container col-sm-6 col-md-6 row">
            <div className="col-sm-6 col-xs-6 label-form-input">
              Tipo de vivienda
            </div>
            <div className="col-sm-6 col-xs-6 form-input">
              <IMDropdownButton reference={"tipoVivienda"}
                                items={["Departamento", "Casa"]}
                                className="modal-dropdown-button"
                                outerButtonClassName="pull-right modal-button-container"
                                showDropdown={showing.tipoVivienda}
                                onClick={this.clicked}
                                handleKey13={this._keyDownVivienda}
                                selectedItem={this.state.vivienda}
                                selectMItem={this._selectVivienda} />
            </div>
          </div>
          <div className="form-input-container col-sm-6 col-md-6 row">
            <div className="col-sm-6 col-xs-6 label-form-input">
              Tipo de operación
            </div>
            <div className="col-sm-6 col-xs-6 disabled-modal-dropdown-button form-input">
              <IMDropdownButton reference={"tipoOperacion"}
                                items={["Compra"]}
                                className="modal-dropdown-button"
                                outerButtonClassName="pull-right modal-button-container"
                                showDropdown={showing.tipoOperacion}
                                onClick={this.clicked}
                                handleKey13={this._keyDownOperacion}
                                selectedItem={this.state.operacion}
                                selectMItem={this._selectOperacion} />
            </div>
          </div>
        </div>
        <div className="row modal-row">
          <div className="form-input-container col-sm-6 col-md-6 row">
            <div className="col-sm-6 col-xs-6 label-form-input">
              Área de construcción
            </div>
            <div className="col-sm-6 col-xs-6 form-input">
              <div style={{display: 'inline-block', padding: 0, width: '100%', textAlign: 'right', position: 'relative'}} >
                <input id="area-construida"
                       type="text"
                       ref="inputAreaConst"
                       className={"input-modal"}
                       maxLength="3"
                       onChange={this.getValueArea}
                       placeholder={"100"} >
                </input>
                <span className={"metric"}> m²</span>
              </div>
            {/*<IMDropdownButton reference={"areaConstruida"}
                                items={["100 m²", "200 m²", "300 m²", "+ 350 m²"]}
                                className="modal-dropdown-button"
                                outerButtonClassName="pull-right modal-button-container"
                                showDropdown={showing.areaConstruida}
                                onClick={this.clicked}
                                handleKey13={this._keyDownAreaConstruida}
                                selectedItem={this.state.areaConstruida}
                                selectMItem={this._selectAreaConstruida} />*/}
            </div>
          </div>
          <div className="form-input-container col-sm-6 col-md-6 row">
            <div className="col-sm-6 col-xs-6 label-form-input">
              Edad
            </div>
            <div className="col-sm-6 col-xs-6 form-input">
              <div style={{display: 'inline-block', padding: 0, width: '100%', textAlign: 'right', position: 'relative'}} >
                <input id="edad"
                       type="text"
                       ref="inputEdad"
                       className={"input-modal"}
                       maxLength="3"
                       onChange={this.getValueEdad}
                       placeholder={"0"} >
                </input>
                <span className={"metric"}> años</span>
              </div>
              {/*<IMDropdownButton reference={"edad"}
                                items={["5 años","10 años","20 años","30 años","+ 40 años"]}
                                className="modal-dropdown-button"
                                outerButtonClassName="pull-right modal-button-container"
                                showDropdown={showing.edad}
                                onClick={this.clicked}
                                handleKey13={this._keyDownEdad}
                                selectedItem={this.state.edad}
                                selectMItem={this._selectEdad} />*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ModalVivienda;
