import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';


import SuggestionsInputField  from '../../../components/SuggestionsInputField';
import ViviendaParamsFields   from '../../../components/ViviendaParamsFields';


class ControlBar extends React.Component{
  constructor(props) {
    super(props);
  }

  _onSelectColonia(item) {
    console.log(item)
  }

  _onSelectVivienda(item) {
    console.log(item);
  }


  _onUpdateDataParams(params) {
    console.log(params);
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
                <div onClick={this._toggleCollapse.bind(this, 'ViviendaForm')} className={'menu-item menu-item-selected'}>
                  <a href={'#'}>{'Reporte Colonia'}</a>
                </div>
                <div onClick={this._toggleCollapse.bind(this, 'ColoniaForm')} className={'menu-item'}>
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
                  specificInputClass={'form-control'}/>
              </div>
              <div className={'col-sm-5'}>
                <div className={'buttons-container'}>
                  <button className={'btn btn-blue'}>
                    {'Colonias disponibles'}
                  </button>
                  <button className={'btn btn-blue'}>
                    {'Generar Reporte'}
                  </button>
                  <button className={'btn'}>
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
              placeholder={'Busca la colonia'}
              specificGroupClass={'landing-search-form'}
              specificInputClass={'form-control'}/>
            <ViviendaParamsFields
              infoParams={this.props.infoParams}
              onUpdateData={this._onUpdateDataParams.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    infoParams: state.report.urlParams
  };
}

export default connect(mapStateToProps)(ControlBar);

