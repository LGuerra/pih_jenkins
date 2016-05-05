// Vendor
import React        from 'react';
import _            from 'lodash';
import { connect }  from 'react-redux';

// Components
import SuggestionsInputField  from '../../../components/SuggestionsInputField';
import ViviendaParamsFields   from '../../../components/ViviendaParamsFields';

// Helpers
import Helpers                                  from '../../../helpers';
import { helpersAPI }                           from '../../../api/api-helper.js';

// Actions
import { onSetColoniaInfo, onSetViviendaInfo }  from '../../../actions/report_actions';

function togglePopover(identifier, content) {
  $(identifier).addClass('error');

  $(identifier).popover({
    content: content,
    placement: 'top'
  });

  $(identifier).popover('show');

  setTimeout(() => {
    $(identifier).removeClass('error');
    $(identifier).popover('destroy');
  }, 2000);
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
    });
  }

  _onSelectVivienda(item) {
    this.setState({
      vivienda: null
    }, () => {
      Helpers.getHouseInfor(item.id, (place) => {
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
              togglePopover('.Vivienda', 'Elige una vivienda válida');
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
    if (this.state.colonia) {
      let toFormat = _.pick(this.state, ['colonia']);
      toFormat.tipo = 'Colonia';
      this.context.router.push({
        pathname: '/reporte',
        query: toFormat,
        state: {}
      });
      this._toggleCollapse('.ColoniaForm')
    } else {
      togglePopover('.Colonia', 'Elige una colonia válida');
    }
  }

  _generateViviendaReport() {
    if (this.state.vivienda) {
      let infoParams  = _.clone(this.props.urlParams);
      let toFormat = {
        tipo: 'Vivienda'
      };

      for (let key in this.urlParams) {
        toFormat[key] = this.state.vivienda[key] || infoParams[key] || this.urlParams[key];
      }

      this._toggleCollapse('.ViviendaForm')
      this.context.router.push({
        pathname: '/reporte',
        query: toFormat,
        state: {}
      });
    } else {
      togglePopover('.Vivienda', 'Debes elegir una vivienda');
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

  componentDidUpdate(prevProps) {
    this.prevUrlParams = prevProps.infoParams;
  }

  render() {
    var downArrow = require('file!images-banca/down_arrow.svg');
    return (
      <div style={{backgroundColor: '#fbfbfb', borderBottom: '1px solid #e7e7e7'}}>
        <div className={'max-width-container'}>
          <div className={'ControlBar row'}>
            <div className={'col-sm-11'}>
              <div className={'control-container'}>
                <div onClick={this._toggleCollapse.bind(this, 'ColoniaForm')} className={'menu-item ' + (this.props.urlParams.tipo === 'Colonia' ?  'menu-item-selected' : '')}>
                  <a href={'#'}>{'Reporte Colonia'}</a>
                  <img height={'12px'} src={downArrow} className={this.state.formActive === 'ColoniaForm' ? 'active' : ''}/>
                </div>
                <div onClick={this._toggleCollapse.bind(this, 'ViviendaForm')} className={'menu-item ' + (this.props.urlParams.tipo === 'Vivienda' ?  'menu-item-selected' : '')}>
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
            <div className={'row'}>
              <div className={'col-sm-10'}>
                <SuggestionsInputField
                  ref={'colonia_field'}
                  searchType={'Colonia'}
                  onSelectItem={this._onSelectColonia.bind(this)}
                  placeholder={'Busca la ubicación de la vivienda'}
                  specificGroupClass={'landing-search-form'}
                  specificInputClass={'form-control Colonia'}/>
              </div>
              <div className={'col-sm-2'}>
                <button className={'aqua-button'}>
                  {'Ver Colonias disponibles'}
                </button>
              </div>
            </div>
              <div className={'buttons-container'}>
                <button onClick={this._toggleCollapse.bind(this, 'ColoniaForm')} className={'gray-button'}>
                  {'Cancelar'}
                </button>
                <button onClick={this._generateColoniaReport.bind(this)} className={'aqua-button'}>
                  {'Generar Reporte'}
                </button>
              </div>
          </div>
          <div id={'ViviendaForm'} className={'collapse ViviendaForm'}>
            <SuggestionsInputField
              ref={'vivienda_field'}
              searchType={'Vivienda'}
              onSelectItem={this._onSelectVivienda.bind(this)}
              placeholder={'Busca la vivienda'}
              specificGroupClass={'landing-search-form'}
              specificInputClass={'form-control Vivienda'}/>
            <ViviendaParamsFields
              infoParams={this.props.urlParams}
              onUpdateData={this._onUpdateDataParams.bind(this)} />
            <div className={'buttons-container'}>
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
    );
  }
}

ControlBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { onSetColoniaInfo, onSetViviendaInfo })(ControlBar);
