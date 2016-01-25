import React from 'react';
import ModalVivienda from './ModalVivienda';
import Modal from './Modal';

class MiniModalVivienda extends React.Component {
  constructor(props) {
    super(props);
    this.state        = { myVariable: this.props.myVariable };
    this.show         = this.show.bind(this);
    this._sendRequest = this._sendRequest.bind(this);
  }

  show (myVariable, callback) {
    this.setState({ myVariable: myVariable });
    this.refs.modal.show();
  }

  _sendRequest () {
    this.props.requestVivienda();
  }

  render() {
    let btn_bar;

    if (this.state.myVariable !== "Ingresa la dirección de una vivienda") {
      btn_bar = ( <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '5px'}}>
                    <div>
                      <p className="text-right" style={{fontSize: '12px', margin: '0 15px', fontWeight: 'bold'}}>
                        {this.state.myVariable}
                      </p>
                    </div>
                    <div>
                      <button className="search-button-modal" onClick={this._sendRequest}>
                        <img width="20px" height="20px" src={IMAGES.lupa}></img>
                      </button>
                    </div>
                  </div>
               );
    } else {
      btn_bar = ( <div className="row">
                    <p className="col-md-12 text-right" style={{display: 'inline-block', color: '#C03537'}}>
                    {this.state.myVariable}
                    </p>
                  </div>);
    }
    let modalVivienda = <ModalVivienda modalChange    ={this.props.modalChange}
                                       ddshown        ={this.props.ddshown}
                                       hideDropdowns  ={this.props.hideDropdowns}
                                       habitaciones   ={this.props.habitaciones}
                                       banos          ={this.props.banos}
                                       cajones        ={this.props.cajones}
                                       vivienda       ={this.props.vivienda}
                                       operacion      ={this.props.operacion}
                                       areaConstruida ={this.props.areaConstruida}
                                       edad           ={this.props.edad} 
                                       className      ={'mini-modal-box'}/>;

    return (
      <Modal ref='modal' top={150} >
        {modalVivienda}
        {btn_bar}
      </Modal>
    );
  }
}

export default MiniModalVivienda;
