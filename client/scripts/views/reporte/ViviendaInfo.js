// Vendor
import React from 'react';
import _ from 'lodash';

// Helpers
import Helpers from '../../helpers';

class ViviendaInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._togglePopOver = this._togglePopOver.bind(this);
  }

  componentDidMount() {
    let apigClient = apigClientFactory.newClient();

    let params = _.pick(this.props.params,
      'longitud',
      'latitud',
      'id_tipo_propiedad',
      'area_construida',
      'recamaras',
      'banos',
      'estacionamientos',
      'edad',
      'tipo_operacion');

      apigClient.modelValuationPost({}, params, {
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      })
      .then((modelValuationR) => {
        this.setState({
          data: {
            confianza:  modelValuationR.data.confianza || 1,
            precioM2:   modelValuationR.data.valuacion_m2 || 0,
            valuacion:  modelValuationR.data.valuacion || 0
          }
        }, () => {
          this.props.onGetViviendaInfo(_.merge(this.state.data, this.props.params));
        });
      });

  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.data && this.state.data) {
      let descriptions = ['más de 40%', 'entre 30% y 40% ', 'entre 20% y 30%', 'entre 10% y 20%', 'entre 0 y 10%'];

      let title = `
        <div class="popover popover-confianza" role="tooltip">
          <div class="arrow"></div>
          <p>La mitad o más de los inmuebles en esta colonia tienen un error en 
          la estimación de ${descriptions[this.state.data.confianza - 1]} error absoluto en la estimación de 
          valores dentro de esta colonia.</p>
        </div>
      `;

      $('#confianza').popover({
        container: 'body',
        content: "Elige una de las sugerencias",
        template: title,
        placement: 'right'
      });
    }

  }

  _togglePopOver(show) {
    if (show) {
      $('#confianza').popover('show');
    } else {
      $('#confianza').popover('hide');
    }
  }

  render() {
    let content;

    if (this.state.data) {
      let stars = new Array();
      let reputacion = this.state.data.confianza > 5 ? 5 : this.state.data.confianza;
      let reputacionComponent;
      let valuacion = Math.floor(this.state.data.valuacion / 1000);

      for (let i = 0; i < reputacion; i++) {
        stars.push(
          <img key={'star-' + i} height={'12px'} src={IMAGES.star} style={{marginBottom: '3px'}}/>
        );

      }

      for (let i = stars.length; i < 5; i++) {
        stars.push(
          <img key={'star_2-' + i} height={'12px'} src={IMAGES.star_2} style={{marginBottom: '3px'}}/>
        );
      }
      reputacionComponent = (
        <p style={{cursor: 'pointer'}} id={'confianza'} className={'subtitle'}>
          {stars} Confianza
          <img
            onMouseEnter={this._togglePopOver.bind(this, true)}
            onMouseOut={this._togglePopOver.bind(this, false)}
            height={'10px'}
            src={IMAGES.question}
            style={{marginBottom: '1px', marginLeft: '5px'}}/>
        </p>
      )


      content = (
        <div className={'oferta-disponible'}>
          <h4 className={'subsection-title'} style={{marginLeft: '5px'}}>{'Vivienda valuada'}</h4>
          <div style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'}}>
            <div style={{textAlign: 'center'}}>
              <p className={'green-price'}>{Helpers.formatAsPrice(valuacion * 1000)}</p>
              <p className={'subtitle'} style={{marginBottom: '0px'}}>{'Precio estimado'}</p>
              {reputacionComponent}
            </div>
            <div style={{textAlign: 'center'}}>
              <p className={'secondary-price'}>{Helpers.formatAsPrice(this.state.data.precioM2)}</p>
              <p className={'subtitle'}>{'Precio estimado por m²'}</p>
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
