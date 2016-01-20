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
    })

    $.when(avergageOfferDefer.promise(), averageM2Defer.promise(), coloniaInfoDef.promise())
      .done((avergageOfferR, averageM2R, coloniaInfoR) => {
        this.setState({
          data: {
            averageOffer: avergageOfferR.avg,
            averageM2: averageM2R.avg,
            zonaInfo: {
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
      let colName = this.props.viewType === 'vivienda' ?
        (<h4 className={'subsection-title'}>Colonia Anzures</h4>)
        : '';
      content = (<div className={'oferta-disponible'}>
        {colName}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <div style={{textAlign: 'center'}}>
            <p className={'green-price'}>{Helpers.formatAsPrice(this.state.data.averageOffer)}</p>
            <p className={'subtitle'}>Precio total enero 2016</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>{Helpers.formatAsPrice(this.state.data.averageM2)}</p>
            <p className={'subtitle'}>Precio promedio por m²</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>
              {this.state.data.zonaInfo.SHF ? Helpers.formatAsPrice(this.state.data.zonaInfo.SHF) : 'No disponible'}
            </p>
            <p className={'subtitle'}>Precio SHF por m²</p>
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
