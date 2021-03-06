import React        from 'react';
import { connect }  from 'react-redux'

import LandingSearchForm  from './LandingSearchForm';

import { getHouseInfor, classNames } from '../../../helpers';
import { helpersAPI }       from '../../../api/api-helper.js';

import ViviendaParamsFields from '../../../components/ViviendaParamsFields';
import { setInitialState, onSetParamsInfo, onSetForm }  from '../../../actions/landing_actions';

function handleErrorAlert(identifier, content) {
  var $element = $(identifier);

  $element.addClass('error');
  $element.popover({
    content: content,
    placement: 'top'
  });

  $element.popover('show');
  $element.val('');
  $element.focus();

  setTimeout(() => {
    $element.removeClass('error');
    $(identifier).popover('destroy');
  }, 3000);

  $('html, body').animate({
    scrollTop: $('body').offset().top
  }, 300);
}

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  _generateColoniaReport() {
    if (this.props.colonia.id && this.props.colonia.id !== -1) {
      this.context.router.push({
        pathname: '/reporte',
        query: {
          colonia: this.props.colonia.id,
          tipo: 'Colonia'
        },
        state: {
          sample: 'dude'
        }
      });
    } else {
      handleErrorAlert('.Colonia', 'Seleccione una de las sugerencias');
    }
  }

  _generateViviendaReport() {
    if (this.props.vivienda.id) {
      let latitude;
      let longitude;
      let infoParams;

      getHouseInfor(this.props.vivienda.id)
        .then(place => {
          latitude    = place.geometry.location.lat();
          longitude   = place.geometry.location.lng();

          return helpersAPI.suburbIsTrusted(latitude, longitude)
        })
        .then(response => {
          if (response.data.trusted) {
            let colonia = response.data.id;
            this.context.router.push({
              pathname: '/reporte',
              query: {
                colonia: colonia,
                tipo: 'Vivienda',
                longitud: longitude,
                latitud: latitude,
                recamaras: this.props.infoParams.recamaras,
                banos: this.props.infoParams.banos,
                estacionamientos: this.props.infoParams.estacionamientos,
                id_tipo_propiedad: this.props.infoParams.id_tipo_propiedad,
                edad: this.props.infoParams.edad,
                area_construida: this.props.infoParams.area_construida,
                tipo_operacion: 0,
                address: this.props.vivienda.content
              },
              state: {
                sample: 'dude'
              }
            });
          } else {
            handleErrorAlert('.Vivienda', 'Por el momento no contamos con información en la zona seleccionada');
            $('.Vivienda').val('');
          }
        });
    } else {
      handleErrorAlert('.Vivienda', 'Ingrese una dirección');
    }
  }

  _toggleMenu(form) {
    this.props.onSetForm(form);
  }

  _onUpdateDataParams(newParams) {
    this.props.onSetParamsInfo(newParams);
  }

  componentDidMount() {
    this.props.setInitialState();
  }

  componentDidUpdate() {
    $('#colonia-form').find('.landing-search-form input').focus();
  }

  render() {
    var content;
    if (this.props.activeForm === 1) {
      content = (
        <div className={'inner-form'}>
          <p className={'subtitle'}>{'Módulo que genera un reporte detallado con la información necesaria y exacta de la colonia donde se quiere encontrar la vivienda deseada.'}</p>
          <div className={'row colonia-search'}>
            <div className={'col-md-12'} style={{padding: '0'}}>
              <LandingSearchForm
                triggerOnChange={this._generateColoniaReport.bind(this)}
                searchType={'Colonia'}
                placeholder={'Ingrese el nombre de la colonia'}/>
            </div>
            {/*<div className={'col-md-2 btn-disponible'} style={{marginTop: '26px'}}>
              <button className={'aqua-button'}>
               {'VER COLONIAS DISPONIBLES'}
              </button>
            </div>*/}
          </div>
          <div className={'buttons-redirect'}>
            <button onClick={this._generateColoniaReport.bind(this)} className={'aqua-button'}>
              {'GENERAR REPORTE DE COLONIA'}
            </button>
          </div>
        </div>
      );
    } else if (this.props.activeForm === 2) {
      content = (
        <div className={'inner-form'}>
          <p className={'subtitle'}>{'Módulo que genera un reporte detallado con la información necesaria y exacta de la colonia donde se quiere encontrar la vivienda deseada.'}</p>
          <LandingSearchForm
            placeholder={'Ingrese la dirección de la vivienda'}
            searchType={'Vivienda'} />
          <ViviendaParamsFields
            infoParams={this.props.infoParams}
            onUpdateData={this._onUpdateDataParams.bind(this)}/>
          <div className={'buttons-redirect'}>
            <button onClick={this._generateViviendaReport.bind(this)} className={'aqua-button'}>
              {'GENERAR REPORTE DE VIVIENDA'}
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className={'Landing'}>
        <div className={'Index'}>
          <div className={'row'}>
            <div className={'col-md-8 col-md-offset-2 headers'}>
              <h2>{'Plataforma de Inteligencia Hipotecaria'}</h2>
            </div>
          </div>
          <div className={'buttons-redirect'} style={{margin: '20px'}}>
            <button
              onClick={this._toggleMenu.bind(this, 1)}
              className={classNames({
                'btn': true,
                'btn-left': true,
                'active': this.props.activeForm === 1
              })}>
              {'REPORTE COLONIA'}
            </button>
            <button
              onClick={this._toggleMenu.bind(this, 2)}
              className={classNames({
                'btn': true,
                'btn-right': true,
                'active': this.props.activeForm === 2
              })}>
              {'REPORTE VIVIENDA'}
            </button>
          </div>
          <div id={'colonia-form'} className={'LandingForm'}>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.landing;
}

Landing.contextTypes = {
  router: React.PropTypes.object.isRequired
};

// export default Landing;
export default connect(mapStateToProps, { setInitialState, onSetParamsInfo, onSetForm })(Landing);
