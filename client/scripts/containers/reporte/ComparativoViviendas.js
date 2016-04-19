// Vendor
import React from   'react';
import _ from       'lodash';
import { viviendaAPI } from './../../api/api-helper.js';

// Components
import Table from     '../../components/Table';
import Spinner from   '../../components/Spinner';

// Helpers
import Helpers from '../../helpers';
import { connect } from 'react-redux';
import { fetchViviendasComparables } from '../../actions/report_actions';

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

    data.forEach((element, index) => {
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

  componentWillUpdate(nextProps) {
    if (_.isUndefined(this.props.viviendaInfo) && !_.isUndefined(nextProps.viviendaInfo)) {
      let params = _.pick(this.props.params,
        'longitud',
        'latitud',
        'id_tipo_propiedad',
        'area_construida',
        'recamaras',
        'banos',
        'estacionamientos',
        'edad',
        'tipo_operacion');

      params['precio_m2'] = nextProps.viviendaInfo.precioM2;
      this.props.fetchViviendasComparables(params)
    }

    return true;
  }

  render() {
    let content = <Spinner style={{height: '300px'}}/>;

    let label = this.props.params.id_tipo_propiedad == 2
      ? 'Casas comparables'
      : 'Departamentos comparables';

    if (this.props.viviendasComparables) {
      let data = this._formatData(this.props.viviendasComparables);

      content = (
        <div>
          <h3 className={'SectionTitle'}>{label}<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h3>
          <div className={'LineDivider'}></div>
          <Table
            remarcableRow={[0]}
            limit={5}
            specificClass={'ReporteTable table-hover'}
            data={data.rows} />
        </div>
      )
    }

    return (
      content
    );
  }
}

function mapStateToProps(state) {
  let toProps = {};
  if (!_.isEmpty(state.report.viviendaInfo)) {
    toProps.viviendaInfo = {
        confianza:  state.report.viviendaInfo.confianza || 1,
        precioM2:   state.report.viviendaInfo.valuacion_m2 || 0,
        valuacion:  state.report.viviendaInfo.valuacion || 0
      };
  }

  if (state.report.viviendasComparables.length) {
    toProps.viviendasComparables = state.report.viviendasComparables;
  }

  return toProps;
}

export default connect(mapStateToProps, { fetchViviendasComparables })(ComparativoViviendas);
