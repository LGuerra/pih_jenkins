// Vendor
import React from 'react';

// Components
import LineChart from   '../../components/LineChart';
import NoChart from     '../../components/NoChart';
import Spinner from     '../../components/Spinner';

// Helpers
import Helpers from '../../helpers';
import helper_properties from '../../helper_properties';
import { connect } from 'react-redux';
import { fetchPrecioHistorico } from '../../actions/report_actions';

import { formatPrecioHistorico } from '../../data_formatters';

class FormatLineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  _xTickFormat(d, i) {
    let dateObj = new Date(d);
    let date = helper_properties.months[dateObj.getMonth()] + ' ' + dateObj.getFullYear();
    return (date);
  }

  _yTickFormat(d, i) {
    return (Helpers.formatAsPrice(d));
  }

  _tooltipLineFormat(d) {
    var dateObj = new Date(d.data0.value.xVariable);
    var dateFormatted = helper_properties.months[dateObj.getMonth()] + ' del ' + dateObj.getFullYear();

    var html = `<div class="TooltipContainer">
      <div class="Tooltip-row">
        <p class="Tooltip-title">${dateFormatted} - </p>
        <p class="Tooltip-value">${Helpers.formatAsPrice(d.data0.value.value)}</p>
      </div>
    </div>`;

    return (html);
  }


  componentWillMount() {
    this.props.fetchPrecioHistorico(this.props.zoneID);
  }

  render() {
    let content = <Spinner style={{height: '220px'}}/>;
    let apreciacion = this.props.apreciacion;

    if (this.props.precioHistorico) {
      if (this.props.precioHistorico[0].data[0] && !(apreciacion > 0.20 || apreciacion == null)) {
        content = (
          <LineChart
            id={this.props.id}
            showAxis={{x: {ticks: true, line: true}, y:{ticks: true, line: false}}}
            data={this.props.precioHistorico}
            tooltipFormat={this._tooltipLineFormat}
            yTitleUnit={'Precio promedio m²'}
            height={220}
            xtickFormat={this._xTickFormat.bind(this)}
            ytickFormat={this._yTickFormat.bind(this)}
            margin={{
              left: 70,
              right: 35,
              top: 25,
              bottom: 25
            }}
            idContainer={'line-chart'} />
        )
      } else {
        content = (
          <NoChart
            message={'No hay datos disponibles'}
            height={239}
            width={'100%'}
            id={this.props.id}
            specificClass={'printable-chart'}/>)
      }
    }

    return (
      content
    );
  }
}

function mapStateToProps(state) {
  let apreciacion = state.report.coloniaInfo.length
    ? state.report.coloniaInfo[3].apreciacion_anualizada
    : 0;

  if (state.report.precioHistorico.length) {
    return {
      apreciacion: apreciacion,
      precioHistorico: formatPrecioHistorico(state.report.precioHistorico)
    };
  }

  return {};
}

export default connect(mapStateToProps, { fetchPrecioHistorico })(FormatLineChart);
