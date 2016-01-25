import React from 'react';
import _ from 'lodash';
import Helpers from '../../helpers';

import Table from '../../components/Table';

class ComparativoViviendas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _formatData(data) {
    let formattedData = data.similar_houses.map((element, index) => {
      return ({
        'Precio por m²': Helpers.formatAsPrice(element.precio / element.m2) || '-',
        'Precio de oferta': Helpers.formatAsPrice(element.precio) || '-',
        'Recámaras': element.recamaras || '-',
        'Baños': element.banos || '-',
        'Estacionamientos': element.estacionamientos || '-',
        'Área construida': element.m2 || '-',
        'Edad': element.edad || '-'
      });
    });

    return (formattedData);
  }
  componentDidMount() {
    let apigClient = apigClientFactory.newClient();


    let params = _.pick(this.props.params, 'longitud', 'latitud', 'id_tipo_propiedad', 'area_construida', 'recamaras', 'banos', 'estacionamientos', 'edad', 'tipo_operacion', 'area_construida');
    params['precio_m2'] = params.area_construida;

    console.log(params);
    apigClient.similarsPost({}, params, {})
      .then((similarsR) => {
        console.log(similarsR.data);
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
          <h3 className={'section-title'}>{label + '*'}</h3>
          <div className={'line-divider'}></div>
          <Table
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