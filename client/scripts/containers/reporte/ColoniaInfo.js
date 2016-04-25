// Libraries
import React  from 'react';
import _      from 'lodash';

// Components
import Spinner from './../../components/Spinner';

// Helpers
import Helpers from '../../helpers';
import { connect } from 'react-redux';
import { fetchColoniaInfo } from  '../../actions/report_actions';

class ColoniaInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchColoniaInfo(this.props.urlParams.colonia);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.urlParams, this.props.urlParams)) {
      this.props.fetchColoniaInfo(this.props.urlParams.colonia);
    }
  }

  render() {
    let apreciacion;
    let shf;
    let data = this.props.coloniaInfo;
    let content = <Spinner style={{height: '120px'}}/>;
    let colName;

    if (data) {
      colName = this.props.viewType === 'Vivienda' ?
        (<h4 className={'SubsectionTitle'}>
          {data.coloniaInfo ? data.coloniaInfo.nombre : ''}
        </h4>)
        : '';

      if (data.coloniaInfo.SHF) {
        shf = Helpers.formatAsPrice(data.coloniaInfo.SHF);
      } else {
        shf = 'No disponible';
      }

      if (data.apreciacion > 0.20 || !data.apreciacion) {
        apreciacion = 'No disponible'
      } else {
        apreciacion = (data.apreciacion * 100).toFixed(1) + '%';
        apreciacion = data.apreciacion > 0
          ? '+' + apreciacion
          : apreciacion;
      }

      content = (
        <div className={'InfoContainer'}>
          <div className={'InfoElement'} style={{textAlign: 'center'}}>
            <p className={'green-price'}>
              {data.averageOffer ? Helpers.formatAsPrice(data.averageOffer) : 'No disponible'}
            </p>
            <p className={'subtitle'}>{'Precio promedio total'}
              <img width={'5px'} style={{marginBottom: '8px', marginLeft: '1px'}} src={IMAGES.asterisk} />
            </p>
          </div>
          <div className={'InfoElement'} style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>
              {data.averageM2 ? Helpers.formatAsPrice(data.averageM2) : 'No disponible'}
            </p>
            <p className={'subtitle'}>{'Precio promedio por m²'}
              <img width={'5px'} style={{marginBottom: '8px', marginLeft: '1px'}} src={IMAGES.asterisk} />
            </p>
          </div>
          <div className={'InfoElement'} style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>
              {shf}
            </p>
            <p className={'subtitle'}>{'Precio SHF por m²'}</p>
          </div>
          <div className={'InfoElement'} style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>
              {apreciacion}
            </p>
            <p className={'subtitle'}>Apreciación anual</p>
          </div>
        </div>
      );
    }

    return (
      <div className={'ColoniaInfo'}>
        {colName}
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let toProps = {
    urlParams: state.report.urlParams
  };

  if (state.report.coloniaInfo.length) {
    toProps.coloniaInfo = {
      averageOffer: state.report.coloniaInfo[0].avg,
      averageM2: state.report.coloniaInfo[1].avg,
      coloniaInfo: {
        nombre: state.report.coloniaInfo[2].nombre,
        SHF: state.report.coloniaInfo[2].precio_m2_shf
      },
      apreciacion: state.report.coloniaInfo[3] ? state.report.coloniaInfo[3].apreciacion_anualizada : null
    }
  }

  return toProps;
}


export default connect(mapStateToProps, { fetchColoniaInfo })(ColoniaInfo);
