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
    let apigClient = apigClientFactory.newClient();
    let monthlyListingDefer = $.Deferred();
    let semesterListingDefer = $.Deferred();
    let averageTimeDefer = $.Deferred();

    apigClient.suburbMonthlyListingGet({
      id_col: this.props.zoneID
    }, {}, {}).then((monthlyListingR) => {
      monthlyListingDefer.resolve(monthlyListingR.data);
    });

    apigClient.suburbSemesterListingGet({
      id_col: this.props.zoneID
    }, {}, {}).then((semesterListingR) => {
      semesterListingDefer.resolve(semesterListingR.data);
    });

    apigClient.suburbAverageTimeGet({
      id_col: this.props.zoneID
    }, {}, {}).then((averageTimeR) => {
      averageTimeDefer.resolve(averageTimeR.data);
    });

    $.when(monthlyListingDefer.promise(), semesterListingDefer.promise(), averageTimeDefer.promise())
      .done((monthlyListingR, semesterListingR, averageTimeR) => {
        this.setState({
          data: {
            monthlyListing: monthlyListingR.count,
            semesterListing: semesterListingR.count,
            averageTime: averageTimeR.avg
          }
        });
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
            <p className={'oferta-disponible-price'}>{Helpers.formatAsNumber(Number(this.state.data.monthlyListing))}</p>
            <p className={'subtitle'}>Listados en el último mes</p>
          </div>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <p className={'oferta-disponible-price'}>{Helpers.formatAsNumber(Number(this.state.data.semesterListing))}</p>
            <p className={'subtitle'}>Listados en los últimos 6 meses</p>
          </div>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <div className={'tiempo-container'}>
              <p className={'oferta-disponible-price'}>{Helpers.formatAsNumber(Number(this.state.data.averageTime)) + ' días'}</p>
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
