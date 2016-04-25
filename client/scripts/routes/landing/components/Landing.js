import React        from 'react';
import { connect }  from 'react-redux'

import LandingSearchForm  from './LandingSearchForm';

import Helpers              from '../../../helpers';
import { helpersAPI }       from '../../../api/api-helper.js';

import ViviendaParamsFields from '../../../components/ViviendaParamsFields';
import { onSetParamsInfo }  from '../../../actions/landing_actions';

function togglePopover(identifier, content) {
  $(identifier)
    .addClass('error');

  $(identifier).popover({content: content,
                                        placement: 'top'});
  $(identifier).popover('show');

  setTimeout(() => {
    $(identifier)
      .removeClass('error');
    $(identifier).popover('destroy');
  }, 2000);
}

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  _generateColoniaReport() {
    if (this.props.colonia.id) {
      window.open(`/reporte?colonia=${this.props.colonia.id}&tipo=Colonia`, '_self')
    } else {
      togglePopover('.Colonia', 'Elige una colonia válida');
    }
  }

  _generateViviendaReport() {
    if (this.props.vivienda.id) {
      Helpers.getHouseInfor(this.props.vivienda.id, (place) => {
        let latitude    = place.geometry.location.lat();
        let longitude   = place.geometry.location.lng();
        let infoParams  = this.props.infoParams;

        helpersAPI.suburbIsTrusted(latitude, longitude)
          .then((response) => {
            if (response.data.trusted) {
              let colonia = response.data.id;
              window.open(`
                /reporte?colonia=${colonia}&tipo=Vivienda
                &longitud=${longitude}&latitud=${latitude}
                &recamaras=${infoParams.reacamaras}&banos=${infoParams.banos}
                &estacionamientos=${infoParams.estacionamientos}
                &id_tipo_vivienda=${infoParams.id_tipo_vivienda}&edad=${infoParams.edad}
                &area_construida=${infoParams.area_construida}&tipo_operacion=0
                &address=${this.props.vivienda.content}
              `, '_self')
            } else {
              togglePopover('.Vivienda', 'Elige una vivienda válida');
            }
          });
      });
    } else {
      togglePopover('.Vivienda', 'Debes elegir una vivienda');
    }
  }

  _onUpdateDataParams(newParams) {
    this.props.onSetParamsInfo(newParams);
  }

  render() {
    return (
      <div className={'Landing'}>
        <div className={'Index'}>
          <div className={'row'}>
            <div className={'col-md-8 col-md-offset-2 headers'}>
              <h2>{'Plataforma de Inteligencia Hipotecaria'}</h2>
              <h3>{'La información hipotecaria que buscas, para encontrar la opción exacta para vivir'}</h3>
            </div>
          </div>
          <div className={'buttons-redirect'}>
            <button className={'btn'}>
              {'REPORTE COLONIA'}
            </button>
            <button className={'btn'}>
              {'REPORTE VIVIENDA'}
            </button>
          </div>
        </div>
        <div className={'LandingForm'}>
          <div className={'Breakpoint'}>
            <h2>{'REPORTE COLONIA'}</h2>
          </div>
          <div className={'inner-form'}>
            <p className={'subtitle'}>{'Módulo que genera un reporte detallado con la información necesaria y exacta de la colonia donde se quiere encontrar la vivienda deseada.'}</p>
            <LandingSearchForm
              searchType={'Colonia'}
              placeholder={'Busca nombre de la colonia'}/>
            <div className={'buttons-redirect'}>
              <button onClick={this._generateColoniaReport.bind(this)} className={'btn'}>
                {'GENERAR REPORTE DE COLONIA'}
              </button>
              <div>
                <p>{'ó'}</p>
              </div>
              <button className={'btn'}>
                {'CATÁLOGO DE COLONIAS'}
              </button>
            </div>
          </div>
        </div>
        <div className={'LandingForm'}>
          <div className={'Breakpoint'}>
            <h2>{'REPORTE VIVIENDA'}</h2>
          </div>
          <div className={'inner-form'}>
            <p className={'subtitle'}>{'Módulo que genera un reporte detallado con la información necesaria y exacta de la colonia donde se quiere encontrar la vivienda deseada.'}</p>
            <LandingSearchForm
              searchType={'Vivienda'}
              placeholder={'Busca la ubicación de la vivienda'}/>
            <ViviendaParamsFields
              infoParams={this.props.infoParams}
              onUpdateData={this._onUpdateDataParams.bind(this)}/>
            <div className={'buttons-redirect'}>
              <button onClick={this._generateViviendaReport.bind(this)} className={'btn'}>
                {'GENERAR REPORTE DE VIVIENDA'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    colonia: state.landing.colonia,
    vivienda: state.landing.vivienda,
    infoParams: state.landing.infoParams
  };
}

export default connect(mapStateToProps, { onSetParamsInfo })(Landing);

