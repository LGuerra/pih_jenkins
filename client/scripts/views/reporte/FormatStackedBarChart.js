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
        color: '#848484',
        hoverColor: '#1394bc'
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
        height={280}
        idContainer={'stacked-chart'} />
    );
  }
}

export default FormatStackedBarChart;
