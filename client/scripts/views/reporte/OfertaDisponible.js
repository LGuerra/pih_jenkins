import React from 'react';

import config from '../../config';
import Helpers from '../../helpers';

class OfertaDisponible extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {
    let url = config.urlSuburb;
    $.when($.get(url + 'monthly-listing?suburb=' + this.props.zoneID), $.get(url + 'semester-listing?suburb=' + this.props.zoneID), $.get(url + 'average-time?suburb=' + this.props.zoneID))
      .done((monthlyListingR, semesterListingR, averageTimeR) => {
        this.setState({
          data: {
            monthlyListing: monthlyListingR[0],
            semesterListing: semesterListingR[0],
            averageTime: averageTimeR[0]
          }
        })
      });
  }
  render() {
    let content;
    if (this.state.data) {
      content = (<div className={'oferta-disponible'}>
        <h4 className={'subsection-title'}>Oferta Disponible</h4>
        <div style={{
          marginTop: '20px',
          marginBottom: '25px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'}}
          className={'listados'}>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <p className={'oferta-disponible-price'}>{Helpers.formatAsNumber(Number(this.state.data.monthlyListing.count))}</p>
            <p className={'subtitle'}>Listados en diciembre 2015</p>
          </div>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <p className={'oferta-disponible-price'}>{Helpers.formatAsNumber(Number(this.state.data.semesterListing.count))}</p>
            <p className={'subtitle'}>Listados en los últimos 6 meses</p>
          </div>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <div className={'tiempo-container'}>
              <p className={'oferta-disponible-price'}>{Helpers.formatAsNumber(Number(this.state.data.averageTime.avg)) + ' meses'}</p>
              <p className={'subtitle'}>Tiempo promedio en el mercado</p>
            </div>
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

export default OfertaDisponible;
