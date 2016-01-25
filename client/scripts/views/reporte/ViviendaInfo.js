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
            confianza: modelValuationR.data.confianza || 1,
            precioM2: modelValuationR.data.valuacion ? (modelValuationR.data.valuacion / params.area_construida) : 0,
            valuacion: modelValuationR.data.valuacion || 0
          }
        }, () => {
          this.props.onGetViviendaInfo(_.merge(this.state.data, this.props.params));
        });
      });

    $('#confianza').tooltip({
      html: true,
      placement: 'top',
      title: '<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>'
    });
  }
  render() {
    let content;

    if (this.state.data) {
      let stars = new Array();
      let reputacion = this.state.data.confianza > 5 ? 5 : this.state.data.confianza;
      let reputacionComponent;

      if (reputacion < 2) {
        reputacionComponent = (
          <p style={{cursor: 'pointer'}} id={'confianza'} className={'subtitle'}><img height={'12px'} src={IMAGES.star} style={{marginBottom: '3px'}}/> {'Confianza baja'}</p>
        );
      } else {
        for (let i = 0; i < reputacion; i++) {
          stars.push(
            <img key={'star-' + i} height={'12px'} src={IMAGES.star} style={{marginBottom: '3px'}}/>
          );

        }
        reputacionComponent = (
          <p style={{cursor: 'pointer'}} id={'confianza'} className={'subtitle'}>{stars} Confianza</p>
        )
      }

      for (let i = stars.length; i < 5; i++) {
        stars.push(
          <img key={'star_2-' + i} height={'12px'} src={IMAGES.star_2} style={{marginBottom: '3px'}}/>
        );
      }

      content = (
      <div className={'oferta-disponible'}>
        <h4 className={'subsection-title'} style={{marginLeft: '15px'}}>Vivienda valuada</h4>
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <p className={'green-price'}>{Helpers.formatAsPrice(this.state.data.valuacion)}</p>
            <p className={'subtitle'} style={{marginBottom: '0px'}}>Precio estimado</p>
            {reputacionComponent}
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