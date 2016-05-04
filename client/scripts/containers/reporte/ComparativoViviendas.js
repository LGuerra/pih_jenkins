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
import { formatComparativoViviendas } from '../../data_formatters';

class ComparativoViviendas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      let data = formatComparativoViviendas(
        this.props.viviendasComparables,
        _.merge(this.props.viviendaInfo, this.props.params),
        this.props.coloniaName);

      var asterisk = require('file!images-banca/asterisk.svg');
      content = (
        <div>
          <h3 className={'SectionTitle'}>{label}<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={asterisk} /></h3>
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

  if (state.report.coloniaInfo.length) {
    toProps.coloniaName = state.report.coloniaInfo[2].nombre;
  }

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
