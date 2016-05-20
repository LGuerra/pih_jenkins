// Vendor
import React        from 'react';
import _            from 'lodash';
import { connect }  from 'react-redux';

// Components
import SuggestionsInputField  from '../../../components/SuggestionsInputField';
import ViviendaParamsFields   from '../../../components/ViviendaParamsFields';

// Helpers
import { getHouseInfor, classNames }  from '../../../helpers';
import { helpersAPI }     from '../../../api/api-helper.js';

// Actions
import { onSetColoniaInfo, onSetViviendaInfo }  from '../../../actions/report_actions';

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
    $element.popover('destroy');
  }, 3000);


  $('html, body').animate({
    scrollTop: $('body').offset().top
  }, 300);
}

class ControlBar extends React.Component{
  constructor(props) {
    super(props);
    this.urlParams = _.clone(this.props.urlParams);

    this.state = {
      infoParams: this.props.infoParams
    };
  }

  _onSelectColonia(item) {
    this.setState({
      colonia: item.id
    }, () => {
      this._generateColoniaReport();
    });
  }

  _onSelectVivienda(item) {
    this.setState({
      vivienda: null
    }, () => {
      getHouseInfor(item.id, (place) => {
        let latitude    = place.geometry.location.lat();
        let longitude   = place.geometry.location.lng();
        let infoParams  = this.state.infoParams;

        helpersAPI.suburbIsTrusted(latitude, longitude)
          .then((response) => {
            if (response.data.trusted) {
              let params = {
                colonia: response.data.id,
                latitud: latitude,
                longitud: longitude,
                tipo_operacion: 0,
                address: place.formatted_address
              };

              this.setState({
                vivienda: params
              });
            } else {
              handleErrorAlert('.Vivienda', 'Por el momento no contamos con información en la zona seleccionada');
            }
          });
      });
    });
  }

  _onUpdateDataParams(params) {
    let toFormat = {};
    for (let key in this.urlParams) {
      toFormat[key] = params[key] || this.urlParams[key];
    }

    this.setState({
      infoParams: toFormat
    });
  }

  _generateColoniaReport() {
    if (this.state.colonia && this.state.colonia !== -1) {
      let toFormat = _.pick(this.state, ['colonia']);
      toFormat.tipo = 'Colonia';
      this.context.router.push({
        pathname: '/reporte',
        query: toFormat,
        state: {}
      });
      this._toggleCollapse('.ColoniaForm')
    } else {
      handleErrorAlert('.Colonia', 'Seleccione una de las sugerencias');
    }
  }

  _generateViviendaReport() {
    if (this.state.vivienda) {
      let infoParams  = _.clone(this.props.urlParams);
      let toFormat = {};

      for (let key in this.urlParams) {
        toFormat[key] = this.state.vivienda[key] || infoParams[key] || this.urlParams[key];
      }

      toFormat.tipo = 'Vivienda';

      this._toggleCollapse('.ViviendaForm')
      this.context.router.push({
        pathname: '/reporte',
        query: toFormat,
        state: {}
      });
    } else {
      handleErrorAlert('.Vivienda', 'Ingrese una dirección');
    }
  }

  _toggleCollapse(divId) {
    let collapsables = ['ColoniaForm', 'ViviendaForm'];
    _.forEach(collapsables, (collapsable) => {
      if (collapsable === divId) {
        $("#" + collapsable).collapse('toggle');
      } else {
        $("#" + collapsable).collapse('hide');
      }
    });

    if (this.state.formActive !== divId) {
      this.setState({
        formActive: divId
      });
    } else {
      this.setState({
        formActive: null
      });
    }

  }

  render() {
    var downArrow = require('file!images-banca/down_arrow.svg');
    return (
      <div style={{backgroundColor: '#ffffff', borderBottom: '1px solid #e7e7e7'}}>
        <div className={''}>
          <div className={'ControlBar max-width-container'}>
            <div className={'col-sm-11'} style={{padding: '0px'}}>
              <div className={'control-container'}>
                <div onClick={this._toggleCollapse.bind(this, 'ColoniaForm')} className={'menu-item ' + (this.props.urlParams.tipo === 'Colonia' ?  'menu-item-selected' : '') + ' ' + (this.state.formActive === 'ColoniaForm' ?  'menu-item-active' : '')}>
                  <a href={'#'}>{'Reporte Colonia'}</a>
                  <img height={'12px'} src={downArrow} className={this.state.formActive === 'ColoniaForm' ? 'active' : ''}/>
                </div>
                <div onClick={this._toggleCollapse.bind(this, 'ViviendaForm')} className={'menu-item ' + (this.props.urlParams.tipo === 'Vivienda' ?  'menu-item-selected' : '') + ' ' + (this.state.formActive === 'ViviendaForm' ?  'menu-item-active' : '')}>
                  <a href={'#'}>{'Reporte Vivienda'}</a>
                  <img height={'12px'} src={downArrow} className={this.state.formActive === 'ViviendaForm' ? 'active' : ''}/>
                </div>
              </div>
            </div>
            <div className={'col-sm-1'}>
              {this.props.children}
            </div>
          </div>
          <div id={'ColoniaForm'} className={'collapse ColoniaForm'}>
            <div className={'max-width-container'}>
              <div className={'row'}>
                <div style={{marginTop: '20px', padding: '0 11px'}} className={'col-sm-12'}>
                  <SuggestionsInputField
                    ref={'colonia_field'}
                    searchType={'Colonia'}
                    onSelectItem={this._onSelectColonia.bind(this)}
                    placeholder={'Ingrese el nombre de la colonia'}
                    specificGroupClass={'landing-search-form'}
                    specificInputClass={'form-control Colonia'}/>
                </div>
                {/*<div style={{marginTop: '20px'}}  className={'col-sm-2'}>
                  <button className={'aqua-button'}>
                    {'Ver Colonias disponibles'}
                  </button>
                </div>*/}
              </div>
              <div style={{marginBottom: '20px'}} className={'buttons-container'}>
                <button onClick={this._toggleCollapse.bind(this, 'ColoniaForm')} className={'gray-button'}>
                  {'Cancelar'}
                </button>
                <button onClick={this._generateColoniaReport.bind(this)} className={'aqua-button'}>
                  {'Generar Reporte'}
                </button>
              </div>
            </div>
          </div>
          <div id={'ViviendaForm'} className={'collapse ViviendaForm'}>
            <div className={'max-width-container'}>
              <div style={{marginTop: '20px'}}>
                <SuggestionsInputField
                  ref={'vivienda_field'}
                  searchType={'Vivienda'}
                  onSelectItem={this._onSelectVivienda.bind(this)}
                  placeholder={'Ingrese la dirección de la vivienda'}
                  specificGroupClass={'landing-search-form'}
                  specificInputClass={'form-control Vivienda'}/>
              </div>
              <ViviendaParamsFields
                infoParams={this.props.urlParams}
                onUpdateData={this._onUpdateDataParams.bind(this)} />
              <div style={{marginBottom: '20px'}} className={'buttons-container'}>
                  <button onClick={this._toggleCollapse.bind(this, 'ViviendaForm')} className={'gray-button'}>
                    {'Cancelar'}
                  </button>
                  <button onClick={this._generateViviendaReport.bind(this)} className={'aqua-button'}>
                    {'Generar Reporte'}
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ControlBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    colonia: state
  }
}

export default connect(mapStateToProps, { onSetColoniaInfo, onSetViviendaInfo })(ControlBar);
