// Vendor
import React from 'react'
import random from 'lodash/number/random';
import _ from 'lodash';

// Components
import StackedBarChart from '../../components/StackedBarChart';
import NoChart from         '../../components/NoChart';

class FormatStackedBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _formatData(data) {
    if (data.typology_distribution) {
      var formattedData = data.typology_distribution.map(function(element, index) {
        let label = Object.keys(element)[0];
        let bars = element[label];

        bars.forEach(function(bar) {
          bar.color = '#35C0BE';
          bar.hoverColor = '#2a9998';
        });

        if (label === 'Recamaras') {
          bars = _.sortBy(bars, function(element) {
            return (element.label);
          });
          label = 'Recámaras';
        }

        if (label === 'Superficie construida') {
          bars = _.sortBy(bars, function(element) {
            return (element.label);
          });

          let indexes = {};

          bars.forEach(function(obj, index) {
            if (obj.label[0] === '<') {
              obj.label = '≤ ' + obj.label.substr(2);
              indexes.lt_c = index;
            }
            if (obj.label[0] === '>') {
              obj.label = '≥ ' + obj.label.substr(2);
              indexes.ht_c = index;
            }
            obj.label = obj.label.substr(0, obj.label.length - 2) + 'm²';
          });

          let ltC = bars.splice(indexes.lt_c, 1);
          let htC = bars.splice(indexes.ht_c - 1, 1);

          bars.reverse();
          bars.unshift(ltC[0]);
          bars.push(htC[0]);
        }

        return ({
          label: label,
          bars: bars
        });
      });
    } else {
      return ([]);
    }

    return (formattedData);
  }

  componentDidMount() {
    let apigClient = apigClientFactory.newClient();

    apigClient.stadisticsTypologyDistributionPost({}, {
      id_col: this.props.zoneID
    },  {
        headers: { 
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      }).then((stadisticsTypologyDistributionR) => {
      let data = this._formatData(stadisticsTypologyDistributionR.data);

      this.setState({
        data: data
      });
    });
  }

  render() {
    let content;

    if (this.state.data) {
      if (this.state.data[0]) {
        content = (
          <StackedBarChart
            id={this.props.id}
            svgClass={'printable-chart'}
            data={this.state.data}
            height={295}
            margin={{
              left: 80,
              right: 35,
              top: 25,
              bottom: 25
            }}
            idContainer={'stacked-chart'} />
        );
      } else {
        content = (
          <NoChart
            message={'No hay datos disponibles'}
            height={295}
            width={'100%'}
            id={this.props.id}
            specificClass={'printable-chart'}/>
        );
      }
    } else {
      content = (<div></div>);
    }
    return (content);
  }
}

export default FormatStackedBarChart;
