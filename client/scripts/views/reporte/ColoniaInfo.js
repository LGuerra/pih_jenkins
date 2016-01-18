import React from 'react';

import config from '../../config';
import Helpers from '../../helpers';

class ColoniaInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }
  componentDidMount() {
    var url = config.urlSuburb;
    $.when($.get(url + 'average-offer?suburb=' + this.props.zoneID), $.get(url + 'average-m2?suburb=' + this.props.zoneID))
      .done((averageOfferR, averageM2R) => {
        this.setState({
          data: {
            averageOffer: averageOfferR[0].avg,
            averageM2: averageM2R[0].avg
          }
        })
      });
  }
  render() {
    let content;
    let colName = this.props.viewType === 'vivienda' ?
      (<h4 className={'subsection-title'}>Colonia Anzures</h4>)
      : '';

    if (this.state.data) {
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
            <p className={'secondary-price'}>{Helpers.formatAsPrice(15000)}</p>
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
