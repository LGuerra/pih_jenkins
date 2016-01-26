import React from 'react';

import Helpers from '../../helpers';

class ColoniaInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    let apigClient = apigClientFactory.newClient();
    let avergageOfferDefer = $.Deferred();
    let averageM2Defer = $.Deferred();
    let coloniaInfoDef = $.Deferred();
    let suburbAppreciationDef = $.Deferred();

    apigClient.suburbAverageOfferGet({
      id_col: this.props.zoneID
    }, {}, {}).then((averageOfferR) => {
      avergageOfferDefer.resolve(averageOfferR.data);
    });

    apigClient.suburbAverageM2Get({
      id_col: this.props.zoneID
    }, {}, {}).then((averageM2R) => {
      averageM2Defer.resolve(averageM2R.data);
    });

    apigClient.suburbInfoGet({
      id_col: this.props.zoneID
    }, {}, {}).then((suburbInfoR) => {
      coloniaInfoDef.resolve(suburbInfoR.data);
    });

    apigClient.suburbAppreciationGet({
      id_col: this.props.zoneID
    }, {}, {}).then((suburbAppreciationR) => {
      suburbAppreciationDef.resolve(suburbAppreciationR.data);
    });

    $.when(avergageOfferDefer.promise(), averageM2Defer.promise(), coloniaInfoDef.promise(), suburbAppreciationDef.promise())
      .done((avergageOfferR, averageM2R, coloniaInfoR, suburbAppreciationR) => {
        this.setState({
          data: {
            averageOffer: avergageOfferR.avg,
            averageM2: averageM2R.avg,
            apreciacion: suburbAppreciationR ? suburbAppreciationR.apreciacion_anualizada : null,
            coloniaInfo: {
              nombre: coloniaInfoR.nombre,
              SHF: coloniaInfoR.precio_m2_shf
            }
          }
        }, () => {
          this.props.onGetColoniaInfo(this.state.data);
        });
      });
  }
  render() {
    let content;

    if (this.state.data) {
      let colName = this.props.viewType === 'Vivienda' ?
        (<h4 className={'subsection-title'}>{this.props.coloniaName}</h4>)
        : '';
      let averageOffer  = this.state.data.averageOffer ? Helpers.formatAsPrice(this.state.data.averageOffer) : 'No disponible';
      let averageM2     = this.state.data.averageM2 ? Helpers.formatAsPrice(this.state.data.averageM2) : 'No disponible';
      let SHF           = this.state.data.coloniaInfo.SHF ? Helpers.formatAsPrice(this.state.data.coloniaInfo.SHF) : 'No disponible';
      let apreciacion;

      if (typeof(this.state.data.apreciacion) == 'number') {
        if (this.state.data.apreciacion > 0.20) {
          apreciacion = 'No disponible'
        } else {
          apreciacion = (this.state.data.apreciacion * 100).toFixed(1) + '%';
          apreciacion = this.state.data.apreciacion > 0
            ? '+' + apreciacion
            : apreciacion;
        }
      } else {
        apreciacion = 'No disponible';
      }

      content = (<div className={'oferta-disponible'}>
        {colName}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <div style={{textAlign: 'center'}}>
            <p className={'green-price'}>{averageOffer}</p>
            <p className={'subtitle'}>Precio promedio total*</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>{averageM2}</p>
            <p className={'subtitle'}>Precio promedio por m²*</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>
              {SHF}
            </p>
            <p className={'subtitle'}>Precio SHF por m²</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>
              {apreciacion}
            </p>
            <p className={'subtitle'}>Apreciación anual</p>
          </div>
        </div>
      </div>);
    } else {
      content = (<div></div>);
    }

    return (
      content
    );
  }
}

export default ColoniaInfo;
