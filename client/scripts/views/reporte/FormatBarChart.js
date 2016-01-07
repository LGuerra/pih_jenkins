import React from 'react';
import _ from 'lodash';

import BarChart from '../../components/BarChart';

function getDummyBarData(numBars) {
  var data = new Array();

  for (var i = 0; i < numBars; i++) {
    data.push({
      value: _.random(0, 100),
      label: 'bar' + i
    });
  }

  return (data);
}

class FormatBarChart extends React.Component {
  constructor(props) {
    super(props);
  }
  _tooltipBarFormat(d, i) {
    var html = '<div class="tooltip-container">';
      html += '<div class="tooltip-row">';
        html += '<p class="tooltip-value">' + '120' + '</p>';
        html += '<p class="tooltip-unit">' + 'Viviendas' + '</p>';
      html += '</div>';
      html += '<div class="tooltip-row">';
        html += '<p class="tooltip-value">' + '$1,000,000' + '</p>';
        html += '<p class="tooltip-value">' + 'a' + '</p>';
        html += '<p class="tooltip-value">' + ' $3,000,000' + '</p>';
      html += '</div>';
    html += '</div>';
    return (html);
  }
  render() {
    return (
      <BarChart
        data={getDummyBarData(10)}
        tooltipFormat={this._tooltipBarFormat}
        color={'#DDDDDD'}
        hoverColor={'#1394BC'}
        height={178}
        idContainer={'bar-chart'} />
    );
  }
}

export default FormatBarChart;
