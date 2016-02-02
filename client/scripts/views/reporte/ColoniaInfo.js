import React from 'react';

import Helpers from '../../helpers';

class ColoniaInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    let apigClient = apigClientFactory.newClient();

    apigClient.suburbAverageOfferGet({
      id_col: this.props.zoneID
    }, {}, {}).then((averageOfferR) => {
      this.setState({
        averageOffer: averageOfferR.data.avg
      });
    });

    apigClient.suburbAverageM2Get({
      id_col: this.props.zoneID
    }, {}, {}).then((averageM2R) => {
      this.setState({
        averageM2: averageM2R.data.avg
      });
    });

    apigClient.suburbInfoGet({
      id_col: this.props.zoneID
    }, {}, {}).then((coloniaInfoR) => {
      this.setState({
        coloniaInfo: {
          nombre: coloniaInfoR.data.nombre,
          SHF: coloniaInfoR.data.precio_m2_shf
        }
      });
    });

    apigClient.suburbAppreciationGet({
      id_col: this.props.zoneID
    }, {}, {}).then((suburbAppreciationR) => {
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
      (<h4 className={'subsection-title'}>{this.state.coloniaInfo ? this.state.coloniaInfo.nombre : ''}</h4>)
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
      <div style={{textAlign: 'center'}}>
        <p className={'green-price'}>
          {this.state.averageOffer ? Helpers.formatAsPrice(this.state.averageOffer) : 'No disponible'}
        </p>
        <p className={'subtitle'}>{'Precio promedio total'}
          <img width={'5px'} style={{marginBottom: '8px', marginLeft: '1px'}} src={IMAGES.asterisk} />
        </p>
      </div>
    );

    let averageM2 = (
      <div style={{textAlign: 'center'}}>
        <p className={'secondary-price'}>
          {this.state.averageM2 ? Helpers.formatAsPrice(this.state.averageM2) : 'No disponible'}
        </p>
        <p className={'subtitle'}>{'Precio promedio por m²'}
          <img width={'5px'} style={{marginBottom: '8px', marginLeft: '1px'}} src={IMAGES.asterisk} />
        </p>
      </div>
    );

    let SHFComponent = (
      <div style={{textAlign: 'center'}}>
        <p className={'secondary-price'}>
          {shf}
        </p>
        <p className={'subtitle'}>{'Precio SHF por m²'}</p>
      </div>
    );

    let apreciacionComponent = (
      <div style={{textAlign: 'center'}}>
        <p className={'secondary-price'}>
          {apreciacion}
        </p>
        <p className={'subtitle'}>Apreciación anual</p>
      </div>
    );

    return (
      <div className={'oferta-disponible'}>
        {colName}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
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
