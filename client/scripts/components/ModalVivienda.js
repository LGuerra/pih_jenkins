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
    this._selectVivienda       = this._selectVivienda.bind(this);
    this._selectOperacion      = this._selectOperacion.bind(this);
    this._selectAreaConstruida = this._selectAreaConstruida.bind(this);
    this._selectEdad           = this._selectEdad.bind(this);
    this._selectHabitacion     = this._selectHabitacion.bind(this);
    this._selectBanos          = this._selectBanos.bind(this);
    this._selectCajones        = this._selectCajones.bind(this);
    this.clicked               = this.clicked.bind(this);
    this.closeShowingDropdowns = this.closeShowingDropdowns.bind(this);
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
    this.setState({showingDropdowns: dropdowns});
  }
  render () {

    let showing = this.state.showingDropdowns;
    return (
      <div className="modal-box">
        <div className="row modal-row">
          <div className="col-md-4">
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.habitaciones}
                                lowerLimit={1}
                                upperLimit={10}
                                quantityChange={this._selectHabitacion}/>
            <span> <img src={IMAGES.downArrow} width="10"></img> </span>
          </div>
          <div className="col-md-4">
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.banos}
                                lowerLimit={1}
                                upperLimit={10}
                                quantityChange={this._selectBanos}/>
            <span> <img src={IMAGES.downArrow} width="10"></img> </span>
          </div>
          <div className="col-md-4 pull-right">
            <IMQuantitySelector styles={{display: "inline-block"}}
                                startingPoint={this.state.cajones}
                                lowerLimit={1}
                                upperLimit={5}
                                quantityChange={this._selectCajones}/>
            <span> <img src={IMAGES.downArrow} width="10"></img> </span>
          </div>
        </div>
        <div className="row modal-row">
          <div className="col-md-3">
            Tipo de vivienda
          </div>
          <div className="col-md-3">
            <IMDropdownButton reference={"tipoVivienda"}
                              items={["dpto.", "casa", "lote"]}
                              className="modal-dropdown-button"
                              outerButtonClassName="pull-right modal-button-container"
                              showDropdown={showing.tipoVivienda}
                              onClick={this.clicked}
                              selectedItem={this.state.vivienda}
                              selectMItem={this._selectVivienda} />
          </div>
          <div className="col-md-3">
            Tipo de operación
          </div>
          <div className="col-md-3">
            <IMDropdownButton reference={"tipoOperacion"}
                              items={["compra","venta"]}
                              className="modal-dropdown-button"
                              outerButtonClassName="pull-right modal-button-container"
                              showDropdown={showing.tipoOperacion}
                              onClick={this.clicked}
                              selectedItem={this.state.operacion}
                              selectMItem={this._selectOperacion} />
          </div>
        </div>
        <div className="row modal-row">
          <div className="col-md-3">
            Área de construcción
          </div>
          <div className="col-md-3">
            <IMDropdownButton reference={"areaConstruida"}
                              items={["100m2", "200m2", "300m2", "350m2+"]}
                              className="modal-dropdown-button"
                              outerButtonClassName="pull-right modal-button-container"
                              showDropdown={showing.areaConstruida}
                              onClick={this.clicked}
                              selectedItem={this.state.areaConstruida}
                              selectMItem={this._selectAreaConstruida} />
          </div>
          <div className="col-md-3">
            Edad
          </div>
          <div className="col-md-3">
            <IMDropdownButton reference={"edad"}
                              items={["5","10","20","30","40+"]}
                              className="modal-dropdown-button"
                              outerButtonClassName="pull-right modal-button-container"
                              showDropdown={showing.edad}
                              onClick={this.clicked}
                              selectedItem={this.state.edad}
                              selectMItem={this._selectEdad} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ModalVivienda;
