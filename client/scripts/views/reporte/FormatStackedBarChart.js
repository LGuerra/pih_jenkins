import React from 'react'
import _ from 'lodash';

import StackedBarChart from '../../components/StackedBarChart';

function getDummyStackedData(numGroups, numBarsByGroup) {
  var data = new Array();
  var group = {};
  for (var i = 0; i < numGroups; i++) {
    group.label = 'group-' + i;
    group.bars = [];
    for (var j = 0; j < numBarsByGroup; j++) {
      group.bars.push({
        label: 'bar-' + j,
        value: _.random(0, 100),
        color: '#35C0BE',
        hoverColor: '#2a9998'
      });
    }
    data.push(group);
    group = {};
  }

  return (data);
}

class FormatStackedBarChart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StackedBarChart
        data={getDummyStackedData(4, 4)}
        height={295}
        idContainer={'stacked-chart'} />
    );
  }
}

export default FormatStackedBarChart;
