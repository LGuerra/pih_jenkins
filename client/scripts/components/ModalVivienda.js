import React from 'react';
import IMDropdownButton from './DropdownButton';
import IMQuantitySelector from './QuantitySelector';

class ModalVivienda extends React.Component {
  constructor(props) {
    super(props);
    this.state = { vivienda:       "dpto.",
                   operacion:      "compra",
                   areaConstruida: "100m2",
                   edad:           5,
                   habitaciones:   2,
                   banos:          1,
                   cajones:        1
                 };
    this._selectVivienda       = this._selectVivienda.bind(this);
    this._selectOperacion      = this._selectOperacion.bind(this);
    this._selectAreaConstruida = this._selectAreaConstruida.bind(this);
    this._selectEdad           = this._selectEdad.bind(this);
    this._selectHabitacion     = this._selectHabitacion.bind(this);
    this._selectBanos          = this._selectBanos.bind(this);
    this._selectCajones        = this._selectCajones.bind(this);
  }

  _selectVivienda (a) {
    if (a !== this.state.vivienda) this.setState({vivienda: a});
    console.log("MODAL VIVIENDA state", this.state);
    this.props.modalChange({vivienda: a});
  }

  _selectOperacion (a) {
    if (a !== this.state.operacion) this.setState({operacion: a});
    this.props.modalChange({operacion: a});
  }

  _selectAreaConstruida (a) {
    if (a !== this.state.areaConstruida) this.setState({areaConstruida: a});
    this.props.modalChange({areaConstruida: a});
  }

  _selectEdad (a) {
    if (a !== this.state.edad) this.setState({edad: a});
    this.props.modalChange({edad: a});
  }

  _selectHabitacion (a) {
    if (a !== this.state.habitaciones) this.setState({habitaciones: a});
    this.props.modalChange({habitaciones: a});
    console.log("Habitaciones: ", a);
  }

  _selectBanos (a) {
    if (a !== this.state.banos) this.setState({banos: a});
    this.props.modalChange({banos: a});
    console.log("Baños: ", a);
  }

  _selectCajones (a) {
    if (a !== this.state.cajones) this.setState({cajones: a});
    this.props.modalChange({cajones: a});
    console.log("Cajones: ", a);
  }
  render () {
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
            <IMDropdownButton ref={"tipoVivienda"}
                              items={["dpto.", "casa", "lote"]}
                              className="modal-dropdown-button"
                              outerButtonClassName="pull-right modal-button-container"
                              selectMItem={this._selectVivienda} />
          </div>
          <div className="col-md-3">
            Tipo de operación
          </div>
          <div className="col-md-3">
            <IMDropdownButton ref={"tipoOperacion"}
                              items={["compra","venta"]}
                              className="modal-dropdown-button"
                              outerButtonClassName="pull-right modal-button-container"
                              selectMItem={this._selectOperacion} />
          </div>
        </div>
        <div className="row modal-row">
          <div className="col-md-3">
            Área de construcción
          </div>
          <div className="col-md-3">
            <IMDropdownButton ref={"areaConstruida"}
                              items={["100m2", "200m2", "300m2", "350m2+"]}
                              className="modal-dropdown-button"
                              outerButtonClassName="pull-right modal-button-container"
                              selectMItem={this._selectAreaConstruida} />
          </div>
          <div className="col-md-3">
            Edad
          </div>
          <div className="col-md-3">
            <IMDropdownButton ref={"edad"}
                              items={["5","10","20","30","40+"]}
                              className="modal-dropdown-button"
                              outerButtonClassName="pull-right modal-button-container"
                              selectMItem={this._selectEdad} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ModalVivienda;
