// Libraries
import React  from 'react';
import _      from 'lodash';

// Components
import Spinner from './../../components/Spinner';

// Helpers
import Helpers from '../../helpers';
import { connect } from 'react-redux';
import { fetchOfertaDisponible } from '../../actions/report_actions';

class OfertaDisponible extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.fetchOfertaDisponible(this.props.urlParams.colonia);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.urlParams, this.props.urlParams)) {
      this.props.fetchOfertaDisponible(this.props.urlParams.colonia);
    }
  }

  render() {
    var content = <Spinner style={{height: '120px'}}/>;
    var data = this.props.ofertaDisponible;

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

function mapStateToProps(state) {
  let toProps = {
    urlParams: state.report.urlParams
  };

  if (state.report.ofertaDisponible.length) {
    toProps.ofertaDisponible = {
      monthlyListing: state.report.ofertaDisponible[0].count,
      semesterListing: state.report.ofertaDisponible[1].count,
      averageTime: state.report.ofertaDisponible[2].avg
    }
  }

  return toProps;
}

export default connect(mapStateToProps, { fetchOfertaDisponible })(OfertaDisponible);
