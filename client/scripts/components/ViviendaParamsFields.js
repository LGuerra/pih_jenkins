import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import ValuePicker    from './ValuePicker';
import IconSelector   from './IconSelector';
import InputFieldForm from './InputFieldForm';

class ViviendaParamsFields extends Component {
  constructor(props) {
    super(props);
  }

  _onUpdateValue(value) {
    let newState = _.merge(this.props.infoParams, value);

    this.props.onUpdateData(newState);
  }

  render() {
    return (
      <div style={{marginTop: '25px'}}>
        <div className={'valuation-container'}>
          <div className={'row border-controller'}>
            <div className={'col-md-4 col-sm-6 valuation-input'} style={{paddingBottom: '29px'}}>
              <p className={'valuation-input-title'}>{'Tipo de vivienda'}</p>
              <IconSelector
                onUpdateValue={this._onUpdateValue.bind(this)}
                unit={'id_tipo_propiedad'}
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
                defaultIcon={this.props.infoParams.id_tipo_propiedad}
              />
            </div>
            <div className={'col-md-4 col-sm-6 valuation-input'}>
              <p className={'valuation-input-title'}>{'Recámaras'}</p>
              <ValuePicker
                onUpdateValue={this._onUpdateValue.bind(this)}
                unit={'recamaras'}
                lowerLimit={1}
                upperLimit={7}
                steps={1}
                defaultActive={this.props.infoParams.recamaras}
              />
            </div>
            <div className={'col-md-4 col-sm-6 valuation-input valuation-input-last'}>
              <p className={'valuation-input-title'}>{'Baños'}</p>
              <ValuePicker
                onUpdateValue={this._onUpdateValue.bind(this)}
                unit={'banos'}
                lowerLimit={1}
                upperLimit={7}
                steps={1}
                defaultActive={this.props.infoParams.banos}
              />
            </div>
            <div className={'col-md-4 col-sm-6 valuation-input'}>
              <p className={'valuation-input-title'}>{'Estacionamientos'}</p>
              <ValuePicker
                onUpdateValue={this._onUpdateValue.bind(this)}
                unit={'estacionamientos'}
                lowerLimit={0}
                upperLimit={7}
                steps={1}
                defaultActive={this.props.infoParams.estacionamientos}
              />
            </div>
            <div className={'col-md-4 col-sm-6 valuation-input'}>
              <p className={'valuation-input-title'}>{'Área de construcción'}</p>
              <InputFieldForm
                onUpdateValue={this._onUpdateValue.bind(this)}
                min={0}
                max={2000}
                unit={'area_construida'}
                defaultValue={this.props.infoParams.area_construida}
                label={'m²'}/>
            </div>
            <div className={'col-md-4 col-sm-6 valuation-input valuation-input-last'}>
              <p className={'valuation-input-title'}>{'Edad'}</p>
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
      </div>
    );
  }
}

export default ViviendaParamsFields;
