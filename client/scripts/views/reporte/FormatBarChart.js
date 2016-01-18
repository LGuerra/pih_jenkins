import React from 'react';
import random from 'lodash/number/random';

import BarChart from '../../components/BarChart';

function getDummyBarData(numBars) {
  var data = new Array();

  for (var i = 0; i < numBars; i++) {
    data.push({
      value: random(0, 100),
      label: 'nombre lar bar' + i
    });
  }
  return (data);
}

class FormatBarChart extends React.Component {
  constructor(props) {
    super(props);
  }
  _tooltipBarFormat(d, i) {
    var cadena = `${i}`;
    var html = '<div class="tooltip-container">';
      html += '<div class="tooltip-row">';
        html += '<p class="tooltip-title">' + '$1,000,000' + '</p>';
        html += '<p class="tooltip-title">' + '&nbsp;a&nbsp;' + '</p>';
        html += '<p class="tooltip-title">' + ' $3,000,000' + '</p>';
      html += '</div>';
      html += '<div class="tooltip-row">';
        html += '<p class="tooltip-value">' + '120' + '</p>';
        html += '<p class="tooltip-unit">' + '&nbsp;Viviendas' + '</p>';
      html += '</div>';
    html += '</div>';
    return (html);
  }
  render() {
    return (
      <BarChart
        svgClass={'printable-chart'}
        showAxis={{x: {ticks: true, line: true}, y:{ticks: true, line: false}}}
        data={getDummyBarData(10)}
        tooltipFormat={this._tooltipBarFormat}
        color={'#35C0BE'}
        hoverColor={'#2a9998'}
        height={180}
        margin={{
          left: 40,
          right: 35,
          top: 25,
          bottom: 25
        }}
        idContainer={'bar-chart'} />
    );
  }
}

export default FormatBarChart;
