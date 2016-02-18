import React from 'react';

import Helpers from '../../helpers';
import { suburbAPI } from './../../api/api-helper.js';

class ColoniaInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    let id_col = this.props.zoneID;
    suburbAPI.averageOffer(id_col)
    .then((averageOfferR) => {
      this.setState({
        averageOffer: averageOfferR.data.avg
      });
    });

    suburbAPI.averageM2(id_col)
    .then((averageM2R) => {
      this.setState({
        averageM2: averageM2R.data.avg
      });
    });

    suburbAPI.information(id_col)
    .then((coloniaInfoR) => {
      this.setState({
        coloniaInfo: {
          nombre: coloniaInfoR.data.nombre,
          SHF: coloniaInfoR.data.precio_m2_shf
        }
      });
    });

    suburbAPI.appreciation(id_col)
    .then((suburbAppreciationR) => {
      this.setState({
        apreciacion: suburbAppreciationR.data ? suburbAppreciationR.data.apreciacion_anualizada : null
      });
    });
  }

  componentDidUpdate (prevState) {
    let state = this.state;
    if (state.averageOffer && state.averageM2 && state.coloniaInfo && state.apreciacion && !this.state.loaded) {
      this.setState({
        loaded: true
      }, () => {
        this.props.onGetColoniaInfo(this.state);
      });
    }
  }

  render() {
    let apreciacion;
    let shf;
    let colName = this.props.viewType === 'Vivienda' ?
      (<h4 className={'SubsectionTitle'}>{this.state.coloniaInfo ? this.state.coloniaInfo.nombre : ''}</h4>)
      : '';

    if (this.state.coloniaInfo) {
      if (this.state.coloniaInfo.SHF) {
        shf = Helpers.formatAsPrice(this.state.coloniaInfo.SHF);
      } else {
        shf = 'No disponible';
      }
    }

    if (this.state.apreciacion > 0.20 || !this.state.apreciacion) {
      apreciacion = 'No disponible'
    } else {
      apreciacion = (this.state.apreciacion * 100).toFixed(1) + '%';
      apreciacion = this.state.apreciacion > 0
        ? '+' + apreciacion
        : apreciacion;
    }

    let averageOffer = (
      <div className={'InfoElement'} style={{textAlign: 'center'}}>
        <p className={'green-price'}>
          {this.state.averageOffer ? Helpers.formatAsPrice(this.state.averageOffer) : 'No disponible'}
        </p>
        <p className={'subtitle'}>{'Precio promedio total'}
          <img width={'5px'} style={{marginBottom: '8px', marginLeft: '1px'}} src={IMAGES.asterisk} />
        </p>
      </div>
    );

    let averageM2 = (
      <div className={'InfoElement'} style={{textAlign: 'center'}}>
        <p className={'secondary-price'}>
          {this.state.averageM2 ? Helpers.formatAsPrice(this.state.averageM2) : 'No disponible'}
        </p>
        <p className={'subtitle'}>{'Precio promedio por m²'}
          <img width={'5px'} style={{marginBottom: '8px', marginLeft: '1px'}} src={IMAGES.asterisk} />
        </p>
      </div>
    );

    let SHFComponent = (
      <div className={'InfoElement'} style={{textAlign: 'center'}}>
        <p className={'secondary-price'}>
          {shf}
        </p>
        <p className={'subtitle'}>{'Precio SHF por m²'}</p>
      </div>
    );

    let apreciacionComponent = (
      <div className={'InfoElement'} style={{textAlign: 'center'}}>
        <p className={'secondary-price'}>
          {apreciacion}
        </p>
        <p className={'subtitle'}>Apreciación anual</p>
      </div>
    );

    return (
      <div className={'ColoniaInfo'}>
        {colName}
        <div className={'InfoContainer'}>
          {averageOffer}
          {averageM2}
          {SHFComponent}
          {apreciacionComponent}
        </div>
      </div>
    );
  }
}

export default ColoniaInfo;
