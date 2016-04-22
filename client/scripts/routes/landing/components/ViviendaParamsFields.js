import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import ValuePicker    from '../../../components/ValuePicker';
import IconSelector   from '../../../components/IconSelector';
import InputFieldForm from '../../../components/InputFieldForm';

import { onSetParamsInfo }  from '../../../actions/landing_actions';


class ViviendaParamsFields extends Component {
  constructor(props) {
    super(props);
  }

  _onUpdateValue(value) {
    let newState = _.merge(this.props.infoParams, value);

    this.props.onSetParamsInfo(newState);
  }

  render() {
    return (
      <div>
        <div className={'row'}>
          <div className={'col-sm-4'}>
            <p>{'Recámaras'}</p>
            <IconSelector
              onUpdateValue={this._onUpdateValue.bind(this)}
              unit={'id_tipo_vivienda'}
              icons={[
                {
                  label: 'Casa',
                  icon: 'house',
                  value: 2
                },
                {
                  label: 'Departamento',
                  icon: 'apartment',
                  value: 4
                }
              ]}
              defaultIcon={this.props.infoParams.id_tipo_vivienda}
            />
          </div>
          <div className={'col-sm-4'}>
            <p>{'Recámaras'}</p>
            <ValuePicker
              onUpdateValue={this._onUpdateValue.bind(this)}
              unit={'reacamaras'}
              lowerLimit={0}
              upperLimit={7}
              defaultActive={this.props.infoParams.reacamaras}
            />
          </div>
          <div className={'col-sm-4'}>
            <p>{'Baños'}</p>
            <ValuePicker
              onUpdateValue={this._onUpdateValue.bind(this)}
              unit={'banos'}
              lowerLimit={0}
              upperLimit={7}
              defaultActive={this.props.infoParams.banos}
            />
          </div>
        </div>
        <div style={{marginTop: '50px'}} className={'row'}>
          <div className={'col-sm-4'}>
            <p>{'Estacionamientos'}</p>
            <ValuePicker
              onUpdateValue={this._onUpdateValue.bind(this)}
              unit={'estacionamientos'}
              lowerLimit={0}
              upperLimit={7}
              defaultActive={this.props.infoParams.estacionamientos}
            />
          </div>
          <div className={'col-sm-4'}>
            <p>{'Área de construcción'}</p>
            <InputFieldForm
              onUpdateValue={this._onUpdateValue.bind(this)}
              min={0}
              max={2000}
              unit={'area_construida'}
              defaultValue={this.props.infoParams.area_construida}
              label={'m²'}/>
          </div>
          <div className={'col-sm-4'}>
            <p>{'Edad'}</p>
            <InputFieldForm
              onUpdateValue={this._onUpdateValue.bind(this)}
              min={0}
              max={20}
              unit={'edad'}
              defaultValue={this.props.infoParams.edad}
              label={'Años'}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    infoParams: state.landing.infoParams
  }
}

export default connect(mapStateToProps, { onSetParamsInfo })(ViviendaParamsFields);
