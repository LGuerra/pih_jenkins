// Vendor
import React from 'react';

// Helpers
import Helpers from '../../helpers';

class OfertaDisponible extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let apigClient = apigClientFactory.newClient();

    apigClient.suburbMonthlyListingGet({
      id_col: this.props.zoneID
    }, {}, {}).then((monthlyListingR) => {
      this.setState({
        monthlyListing: monthlyListingR.data.count
      })
    });

    apigClient.suburbSemesterListingGet({
      id_col: this.props.zoneID
    }, {}, {}).then((semesterListingR) => {
      this.setState({
        semesterListing: semesterListingR.data.count
      });
    });

    apigClient.suburbAverageTimeGet({
      id_col: this.props.zoneID
    }, {}, {}).then((averageTimeR) => {
      this.setState({
        averageTime: averageTimeR.data.avg
      });
    });
  }

  render() {
    let monthlyListing = (
      <div style={{textAlign: 'center', padding: '12px 0px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img height={'50px'} src={IMAGES.houses}/>
          <div style={{width: '100px'}}>
            <p className={'oferta-disponible-price'}>
              {this.state.monthlyListing ? Helpers.formatAsNumber(Number(this.state.monthlyListing)) : 'N.D.'}</p>
            <p className={'subtitle'}>{'Listados en el último mes'}</p>
          </div>
        </div>
      </div>
    );

    let semesterListing = (
      <div style={{textAlign: 'center', padding: '12px 0px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img height={'55px'} src={IMAGES.calendar_houses}/>
          <div style={{width: '100px'}}>
            <p className={'oferta-disponible-price'}>
              {this.state.semesterListing ? Helpers.formatAsNumber(Number(this.state.semesterListing)) : 'N.D.'}</p>
            <p className={'subtitle'}>{'Listados en los últimos 6 meses'}</p>
          </div>
        </div>
      </div>
    );

    let averageTime = (
      <div style={{textAlign: 'center', padding: '12px 0px'}}>
        <div className={'tiempo-container'}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img height={'50px'} src={IMAGES.calendar}/>
            <div style={{width: '100px'}}>
              <p className={'oferta-disponible-price'}>
                {this.state.averageTime ? Helpers.formatAsNumber(Number(this.state.averageTime)) + ' días' : 'N.D.'}</p>
              <p className={'subtitle'}>{'Tiempo promedio en el mercado'}<img width={'5px'} style={{marginBottom: '8px', marginLeft: '1px'}}src={IMAGES.asterisk} /></p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className={'oferta-disponible'}>
        <h4 className={'subsection-title'}>Oferta Disponible</h4>
        <div style={{
          marginTop: '20px',
          marginBottom: '25px',
          display: 'flex',
          justifyContent: 'space-around'}}
          className={'listados'}>
          {monthlyListing}
          {semesterListing}
          {averageTime}
        </div>
      </div>
    );
  }
}

export default OfertaDisponible;
