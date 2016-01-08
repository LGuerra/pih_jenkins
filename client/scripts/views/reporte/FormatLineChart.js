import React from 'react';
import _ from 'lodash';

import LineChart from '../../components/LineChart';

function getDummyLineData(numLines, numRegisters) {
  var data = [];
  var line;
  var date;
  for (var i = 0; i < numLines; i++) {
    line = [];
    date = new Date();
    for (var j = 0; j < numRegisters; j++) {
      var newDate = new Date(date.setDate(date.getDate() + 1));
      line.push({
        value: _.random(0, 100),
        xVariable: newDate
      });
    }
    data.push({
      label: 'line-' + i,
      data: line,
      color: '#1394BC'
    });
  }

  return (data);
}

class FormatLineChart extends React.Component {
  constructor(props) {
    super(props);
  }
  _tooltipLineFormat() {
    var html = '<div class="tooltip-container">';
      html += '<div class="tooltip-row">';
        html += '<p class="tooltip-value">' + 'Oct $2,267,000' + '</p>';
      html += '</div>';
    html += '</div>';
    return (html);
  }
  render() {
    return (
      <LineChart
        data={getDummyLineData(1, 14)}
        tooltipFormat={this._tooltipLineFormat}
        height={250}
        idContainer={'line-chart'} />
    );
  }
}

export default FormatLineChart;