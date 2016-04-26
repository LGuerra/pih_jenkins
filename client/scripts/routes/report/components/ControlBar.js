import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import SuggestionsInputField  from '../../../components/SuggestionsInputField';
import ViviendaParamsFields   from '../../../components/ViviendaParamsFields';

import { onSetColoniaInfo, onSetViviendaInfo } from '../../../actions/report_actions';

import Helpers              from '../../../helpers';
import { helpersAPI }       from '../../../api/api-helper.js';

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

class ControlBar extends React.Component{
  constructor(props) {
    super(props);
    this.urlParams = _.clone(this.props.infoParams);

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
      vivienda: item
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
      this.props.onSetColoniaInfo(_.pick(this.state, ['colonia']));
      this._toggleCollapse('.ColoniaForm')
    } else {
      togglePopover('.Colonia', 'Elige una colonia válida');
    }
  }

  _generateViviendaReport() {
    if (this.state.vivienda) {
      Helpers.getHouseInfor(this.state.vivienda.id, (place) => {
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

              this._toggleCollapse('.Viviendafor')
              this.props.onSetViviendaInfo(_.merge(infoParams, params));
            } else {
              togglePopover('.Vivienda', 'Elige una vivienda válida');
            }
          });
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
  }

  render() {
    return (
      <div>
        <div className={'max-width-container'}>
          <div className={'ControlBar'}>
            <div className={'col-sm-11'}>
              <div className={'control-container'}>
                <div onClick={this._toggleCollapse.bind(this, 'ColoniaForm')} className={'menu-item ' + (this.props.viewType === 'Colonia' ?  'menu-item-selected' : '')}>
                  <a href={'#'}>{'Reporte Colonia'}</a>
                </div>
                <div onClick={this._toggleCollapse.bind(this, 'ViviendaForm')} className={'menu-item ' + (this.props.viewType === 'Vivienda' ?  'menu-item-selected' : '')}>
                  <a href={'#'}>{'Reporte Vivienda'}</a>
                </div>
              </div>
            </div>
            <div className={'col-sm-1'}>
              {this.props.children}
            </div>
          </div>
          <div id={'ColoniaForm'} className={'collapse ColoniaForm'}>
            <div className={'row'}>
              <div className={'col-sm-7'}>
                <SuggestionsInputField
                  searchType={'Colonia'}
                  onSelectItem={this._onSelectColonia.bind(this)}
                  placeholder={'Busca la ubicación de la vivienda'}
                  specificGroupClass={'landing-search-form'}
                  specificInputClass={'form-control Colonia'}/>
              </div>
              <div className={'col-sm-5'}>
                <div className={'buttons-container'}>
                  <button onClick={this._generateColoniaReport.bind(this)} className={'btn btn-blue'}>
                    {'Generar Reporte'}
                  </button>
                  <button className={'btn btn-blue'}>
                    {'Colonias disponibles'}
                  </button>
                  <button onClick={this._toggleCollapse.bind(this, 'ColoniaForm')} className={'btn'}>
                    {'Cancelar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id={'ViviendaForm'} className={'collapse ViviendaForm'}>
            <SuggestionsInputField
              searchType={'Vivienda'}
              onSelectItem={this._onSelectVivienda.bind(this)}
              placeholder={'Busca la vivienda'}
              specificGroupClass={'landing-search-form'}
              specificInputClass={'form-control Vivienda'}/>
            <ViviendaParamsFields
              infoParams={this.props.infoParams}
              onUpdateData={this._onUpdateDataParams.bind(this)} />
            <div className={'centered'}>
              <div className={'buttons-container'}>
                  <button onClick={this._toggleCollapse.bind(this, 'ViviendaForm')} className={'btn'}>
                    {'Cancelar'}
                  </button>
                  <button onClick={this._generateViviendaReport.bind(this)} className={'btn btn-blue'}>
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

function mapStateToProps(state) {
  let infoParams = _.clone(state.report.urlParams);
  return {
    viewType: state.report.viewType,
    infoParams: infoParams
  };
}

export default connect(mapStateToProps, { onSetColoniaInfo, onSetViviendaInfo })(ControlBar);

