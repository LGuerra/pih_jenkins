// Vendor
import React from   'react';
import _ from       'lodash';
import { viviendaAPI } from './../../api/api-helper.js';

// Components
import Table from     '../../components/Table';
import Spinner from   '../../components/Spinner';

// Helpers
import Helpers from '../../helpers';

class ComparativoViviendas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _formatData(data) {
    let formattedData = [{
        'Precio por m²': Helpers.formatAsPrice(this.props.viviendaInfo.precioM2) || '-',
        'Precio de oferta': Helpers.formatAsPrice(this.props.viviendaInfo.valuacion) || '-',
        'Recámaras': this.props.viviendaInfo.recamaras || '-',
        'Baños': this.props.viviendaInfo.banos || '-',
        'Estacionamientos': this.props.viviendaInfo.estacionamientos || '-',
        'Área construida': this.props.viviendaInfo.area_construida || '-',
        'Edad': this.props.viviendaInfo.edad || '-',
        'Colonia': this.props.coloniaName || '-'
    }];

    data.similar_houses.forEach((element, index) => {
      formattedData.push({
        'Precio por m²': Helpers.formatAsPrice(element.precio / element.m2) || '-',
        'Precio de oferta': Helpers.formatAsPrice(element.precio) || '-',
        'Recámaras': element.recamaras || '-',
        'Baños': element.banos || '-',
        'Estacionamientos': element.estacionamientos || '-',
        'Área construida': element.m2 || '-',
        'Edad': element.edad || '-',
        'Colonia': element.nombre_colonia || '-'
      });
    });

    let headers = Object.keys(formattedData[0]);

    return ({
      headers: Object.keys(formattedData[0]),
      rows: formattedData
    });
  }
  componentDidMount() {
    let params = _.pick(this.props.params, 'longitud', 'latitud', 'id_tipo_propiedad', 'area_construida', 'recamaras', 'banos', 'estacionamientos', 'edad', 'tipo_operacion');
    params['precio_m2'] = this.props.viviendaInfo.precioM2;

    viviendaAPI.similars(params)
    .then((similarsR) => {
      this.setState({
        data: this._formatData(similarsR.data)
      });
    });
  }
  render() {
    let content = <Spinner style={{height: '300px'}}/>;

    let label = this.props.params.id_tipo_propiedad == 2
      ? 'Casas comparables'
      : 'Departamentos comparables';

    if (this.state.data) {
      content = (
        <div>
          <h3 className={'SectionTitle'}>{label}<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h3>
          <div className={'LineDivider'}></div>
          <Table
            remarcableRow={[0]}
            limit={5}
            specificClass={'ReporteTable table-hover'}
            data={this.state.data.rows} />
        </div>
      )
    }

    return (
      content
    );
  }
}

export default ComparativoViviendas;
