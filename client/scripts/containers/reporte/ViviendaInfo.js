// Libraries
import React from 'react';
import _ from 'lodash';

// Components
import Spinner from './../../components/Spinner'

// Helpers
import Helpers from '../../helpers';
import { connect } from 'react-redux';
import { fetchViviendaInfo } from '../../actions/report_actions';

class ViviendaInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _updateViviendaInfo() {
    let params = _.pick(this.props.urlParams,
      'longitud',
      'latitud',
      'id_tipo_propiedad',
      'area_construida',
      'recamaras',
      'banos',
      'estacionamientos',
      'edad',
      'tipo_operacion');

    this.props.fetchViviendaInfo(params);
  }

  componentDidUpdate(prevProps, prevState) {
    if (_.isUndefined(prevProps.viviendaInfo) && !_.isEqual(prevProps.viviendaInfo, this.props.viviendaInfo)) {
      let descriptions = ['más de 40%', 'entre 30% y 40%', 'entre 20% y 30%', 'entre 10% y 20%', 'entre 0 y 10%'];
      let popoverPosition = window.innerWidth < 550 ? 'bottom' : 'right';
      let title = `
        <div class="popover PopoverConfianza" role="tooltip">
          <div class="arrow"></div>
          <p>La mitad o más de los inmuebles en esta colonia tienen un error en
          la estimación de ${descriptions[this.props.viviendaInfo.confianza - 1]} error absoluto en la estimación de
          valores dentro de esta colonia.</p>
        </div>
      `;

      $('#confianza').popover({
        container: 'body',
        content: "Elige una de las sugerencias",
        template: title,
        placement: popoverPosition
      });
    }

    if (!_.isEqual(prevProps.urlParams, this.props.urlParams)) {
      this._updateViviendaInfo()
    }
  }

  componentWillMount() {
    this._updateViviendaInfo();
  }

  _togglePopOver(show) {
    if (show) {
      $('#confianza').popover('show');
    } else {
      $('#confianza').popover('hide');
    }
  }

  render() {
    let content = <Spinner style={{height: '120px'}}/>;

    if (this.props.viviendaInfo) {
      let stars = new Array();
      let reputacion = this.props.viviendaInfo.confianza > 5 ? 5 : this.props.viviendaInfo.confianza;
      let reputacionComponent;
      let valuacion = Math.floor(this.props.viviendaInfo.valuacion / 1000);

      if (reputacion < 2) {
        stars.push(
          <img height={'12px'} src={IMAGES.alert} style={{marginBottom: '3px'}}/>
        );
      } else {
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
      );

      content = (
        <div className={'ViviendaInfo'}>
          <h4 className={'SubsectionTitle'} style={{marginLeft: '5px'}}>{'Vivienda valuada'}</h4>
          <div className={'InfoContainer'}>
            <div className={'InfoElement'} style={{textAlign: 'center'}}>
              <p className={'green-price'}>{Helpers.formatAsPrice(valuacion * 1000)}</p>
              <p className={'subtitle'} style={{marginBottom: '0px'}}>{'Precio estimado'}</p>
              {reputacionComponent}
            </div>
            <div className={'InfoElement'} style={{textAlign: 'center'}}>
              <p className={'secondary-price'}>{Helpers.formatAsPrice(this.props.viviendaInfo.precioM2)}</p>
              <p className={'subtitle'}>{'Precio estimado por m²'}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      content
    );
  }
}

function mapStateToProps(state) {
  var toProps = {
    urlParams: state.report.urlParams
  };

  if (!_.isEmpty(state.report.viviendaInfo)) {
    toProps.viviendaInfo = {
      confianza:  state.report.viviendaInfo.confianza || 1,
      precioM2:   state.report.viviendaInfo.valuacion_m2 || 0,
      valuacion:  state.report.viviendaInfo.valuacion || 0
    };
  }

  return toProps;
}

export default connect(mapStateToProps, { fetchViviendaInfo })(ViviendaInfo);
