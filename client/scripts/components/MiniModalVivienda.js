import React from 'react';
import ModalVivienda from './ModalVivienda';
import Modal from './Modal';

class MiniModalVivienda extends React.Component {
  constructor(props) {
    super(props);
    this.state = { myVariable: this.props.myVariable };
    this.show  = this.show.bind(this);
  }

  show (myVariable, callback) {
    this.setState({ myVariable: myVariable });
    this.refs.modal.show();
  }

  render() {
    console.log(this.props);
    let message       = <div>{this.state.myVariable}</div>;
    let modalVivienda = <ModalVivienda modalChange    ={this.props.modalChange}
                                       ddshown        ={this.props.ddshown}
                                       hideDropdowns  ={this.props.hideDropdowns}
                                       habitaciones   ={this.props.habitaciones}
                                       banos          ={this.props.banos}
                                       cajones        ={this.props.cajones}
                                       vivienda       ={this.props.vivienda}
                                       operacion      ={this.props.operacion}
                                       areaConstruida ={this.props.areaConstruida}
                                       edad           ={this.props.edad} />;

    return (
      <Modal ref='modal' top={150}>
        {modalVivienda}
        {message}
      </Modal>
    );
  }
}

export default MiniModalVivienda;
