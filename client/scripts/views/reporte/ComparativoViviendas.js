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

    let params = _.pick(this.props.params, 'longitud', 'latitud', 'id_tipo_propiedad', 'area_construida', 'recamaras', 'banos', 'estacionamientos', 'edad', 'tipo_operacion');
    apigClient.similarsPost({}, params, {})
      .then((similarsR) => {
        this.setState({
          data: this._formatData(similarsR.data)
        });
      });
  }
  render() {
    let content;
    if (this.state.data) {
      content = (
        <div>
          <h3 className={'section-title'}>{'Inmuebles comparables*'}</h3>
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