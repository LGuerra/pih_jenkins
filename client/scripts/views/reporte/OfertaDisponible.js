// Vendor
import React from 'react';
import axios from 'axios';

// Helpers
import Helpers from '../../helpers';
import { suburbAPI } from './../../api/api-helper.js';

// Components
import Spinner from './../../components/Spinner';

class OfertaDisponible extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let id = this.props.zoneID;

    axios.all([
      suburbAPI.listingCount(id, 1),
      suburbAPI.listingCount(id, 6),
      suburbAPI.averageTime(id, 6)
    ]).then((response) => {
      this.setState({
        data : {
          monthlyListing: response[0].data.count,
          semesterListing: response[1].data.count,
          averageTime: response[2].data.avg
        }
      });
    });
  }

  render() {
    var content = <Spinner style={{height: '120px'}}/>;
    var data = this.state.data;

    if (data) {
      content = (
        <div className={'listados'}>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <img height={'50px'} src={IMAGES.houses} style={{margin: '0px 10px'}}/>
              <div style={{width: '100px'}}>
                <p className={'OfertaDisponible-price'}>
                  {data.monthlyListing ? Helpers.formatAsNumber(Number(data.monthlyListing)) : 'N.D.'}</p>
                <p className={'subtitle'}>{'Listados en el último mes'}</p>
              </div>
            </div>
          </div>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <img height={'55px'} src={IMAGES.calendar_houses} style={{margin: '0px 10px'}}/>
              <div style={{width: '100px'}}>
                <p className={'OfertaDisponible-price'}>
                  {data.semesterListing ? Helpers.formatAsNumber(Number(data.semesterListing)) : 'N.D.'}</p>
                <p className={'subtitle'}>{'Listados en los últimos 6 meses'}</p>
              </div>
            </div>
          </div>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <div className={'tiempo-container'}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <img height={'50px'} src={IMAGES.calendar} style={{margin: '0px 10px'}}/>
                <div style={{width: '100px'}}>
                  <p className={'OfertaDisponible-price'}>
                    {data.averageTime ? Helpers.formatAsNumber(Number(data.averageTime)) + ' días' : 'N.D.'}</p>
                  <p className={'subtitle'}>{'Tiempo promedio en el mercado'}<img width={'5px'} style={{marginBottom: '8px', marginLeft: '1px'}}src={IMAGES.asterisk} /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={'OfertaDisponible BlockContainer'}>
        <h4 className={'SubsectionTitle'}>Oferta Disponible</h4>
        {content}
      </div>
    );
  }
}

export default OfertaDisponible;
