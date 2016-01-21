import React from 'react';
import _ from 'lodash';

import Helpers from '../../helpers';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

class ViviendaInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let apigClient = apigClientFactory.newClient();

    let params = _.pick(this.props.params, 'longitud', 'latitud', 'id_tipo_propiedad', 'area_construida', 'recamaras', 'banos', 'estacionamientos', 'edad', 'tipo_operacion');

    apigClient.modelValuationPost({}, params, {})
      .then((modelValuationR) => {
        this.setState({
          data: {
            confianza: modelValuationR.data.confianza,
            precioM2: modelValuationR.data.valuacion / params.area_construida,
            valuacion: modelValuationR.data.valuacion
          }
        }, () => {
          this.props.onGetViviendaInfo(_.merge(this.state.data, this.props.params));
        });
      });
  }
  render() {
    let content;
    if (this.state.data) {
      var stars = new Array();
      var reputacion = this.state.data.confianza > 5 ? 5 : this.state.data.confianza;

      for (let i = 0; i < reputacion; i++) {
        stars.push(
          <img key={'star-' + i} height={'12px'} src={IMAGES.star} style={{marginBottom: '3px'}}/>
        );
      }
      content = (
      <div className={'oferta-disponible'}>
        <h4 className={'subsection-title'} style={{marginLeft: '12px'}}>Vivienda valuada</h4>
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <p className={'green-price'}>{Helpers.formatAsPrice(this.state.data.valuacion)}</p>
            <p className={'subtitle'} style={{marginBottom: '0px'}}>Precio estimado</p>
            <p className={'subtitle'}>{stars} Confianza</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>{Helpers.formatAsPrice(this.state.data.precioM2)}</p>
            <p className={'subtitle'}>Precio estimado por m²</p>
          </div>
        </div>
      </div>
      );
    } else {
      content = <div></div>;
    }

    return (
      content
    );
  }
}


export default ViviendaInfo;