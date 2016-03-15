import React from 'react';
import axios from 'axios';

import Helpers from '../../helpers';
import { suburbAPI } from './../../api/api-helper.js';

import Spinner from './../../components/Spinner';

class ColoniaInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    let id_col = this.props.zoneID;

    axios.all([
      suburbAPI.averageOffer(id_col),
      suburbAPI.averageM2(id_col),
      suburbAPI.information(id_col),
      suburbAPI.appreciation(id_col)
    ]).then((response) => {
      this.setState({
        data: {
          averageOffer: response[0].data.avg,
          averageM2: response[1].data.avg,
          coloniaInfo: {
            nombre: response[2].data.nombre,
            SHF: response[2].data.precio_m2_shf
          },
          apreciacion: response[3].data ? response[3].data.apreciacion_anualizada : null
        }
      });
    });
  }

  componentDidUpdate (prevState) {
    if (this.state.data && !this.state.loaded) {
      this.setState({
        loaded: true
      }, () => {
        this.props.onGetColoniaInfo(this.state.data);
      });
    }
  }

  render() {
    let apreciacion;
    let shf;
    var data = this.state.data;
    var content = <Spinner style={{height: '120px'}}/>;
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

export default ColoniaInfo;
