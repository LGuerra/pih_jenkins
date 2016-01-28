// Vendor
import React from   'react';
import _ from       'lodash';

// Components
import Table from '../../components/Table';

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

    return (formattedData);
  }
  componentDidMount() {
    let apigClient = apigClientFactory.newClient();
    let params = _.pick(this.props.params, 'longitud', 'latitud', 'id_tipo_propiedad', 'area_construida', 'recamaras', 'banos', 'estacionamientos', 'edad', 'tipo_operacion');
    params['precio_m2'] = this.props.viviendaInfo.precioM2;
    apigClient.similarsPost({}, params,{
      headers: { 
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    })
    .then((similarsR) => {
      this.setState({
        data: this._formatData(similarsR.data)
      });
    });
  }
  render() {
    let content;
    let label = this.props.params.id_tipo_propiedad == 2
      ? 'Casas comparables'
      : 'Departamentos comparables';

    if (this.state.data) {
      content = (
        <div>
          <h3 className={'section-title'}>{label}<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h3>
          <div className={'line-divider'}></div>
          <Table
            remarcableRow={[0]}
            limit={5}
            specificClass={'mercado-table table-hover'}
            data={this.state.data} />
        </div>
      )
    } else {
      content = (<div></div>);
    }
    return (
      content
    );
  }
}

export default ComparativoViviendas;
