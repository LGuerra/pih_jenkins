import React from 'react';
import random from 'lodash/number/random';

import LineChart from '../../components/LineChart';

import Helpers from '../../helpers';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

class FormatLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this._xTickFormat = this._xTickFormat.bind(this);
  }
  _xTickFormat(d, i) {
    let dateObj = new Date(d);
    let date = months[dateObj.getMonth()] + ' ' + dateObj.getDate();
    return (date);
  }
  _yTickFormat(d, i) {
    return (Helpers.formatAsPrice(d));
  }
  _tooltipLineFormat(d) {
    var dateObj = new Date(d.data0.value.xVariable);
    var dateFormatted = months[dateObj.getMonth()] + ' de ' + (Number(dateObj.getDate()) + 1) + ' del ' + dateObj.getFullYear();

    var html = `<div class="tooltip-container">
      <div class="tooltip-row">
        <p class="tooltip-title">${dateFormatted} - </p>
        <p class="tooltip-value">${Helpers.formatAsPrice(d.data0.value.value)}</p>
      </div>
    </div>`;

    return (html);
  }
  _formatData(data) {
    let arrayPoints = [];

    arrayPoints = data.map((element, index) => {
      return ({
        value: element.promedio_venta,
        xVariable: new Date(element.fecha)
      });
    });

    return [{
      color: '#35C0BE',
      label: 'Promedio de venta',
      data: arrayPoints
    }];
  }
  componentDidMount() {
    let apigClient = apigClientFactory.newClient();

    apigClient.suburbHistoricGet({
      id_col: this.props.zoneID
    }, {}, {}).then((suburbHistoricR) => {
      let data = this._formatData(suburbHistoricR.data);
      this.setState({
        data: data
      });
    });
  }
  render() {
    let content;

    if (this.state.data) {
      content = (
        <LineChart
          id={this.props.id}
          svgClass={'printable-chart'}
          showAxis={{x: {ticks: true, line: true}, y:{ticks: true, line: false}}}
          data={this.state.data}
          tooltipFormat={this._tooltipLineFormat}
          yTitleUnit={'Precio promedio'}
          height={220}
          xtickFormat={this._xTickFormat}
          ytickFormat={this._yTickFormat}
          margin={{
            left: 70,
            right: 30,
            top: 25,
            bottom: 25
          }}
          idContainer={'line-chart'} />
      )
    } else {
      content = (<div></div>);
    }

    return (
      content
    );
  }
}

export default FormatLineChart;
