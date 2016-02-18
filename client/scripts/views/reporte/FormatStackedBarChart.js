// Vendor
import React from 'react'
import random from 'lodash/number/random';
import _ from 'lodash';

// Components
import StackedBarChart from '../../components/StackedBarChart';
import NoChart from         '../../components/NoChart';

import { suburbAPI } from './../../api/api-helper.js';

const labelsDictionary = {
  area_construida: 'Superficie construida',
  recamaras: 'Recámaras',
  id_tipo_propiedad: 'Tipo vivienda',
  edad: 'Edad'
}

class FormatStackedBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _formatData(data) {
    if (data.json_tipologias) {
      var formattedData = _.map(data.json_tipologias, (element, key) => {
        let label = key;

        element.forEach(function(bar) {
          bar.color = '#35C0BE';
          bar.hoverColor = '#2a9998';
        });

        if (label === 'recamaras') {
          element = _.sortBy(element, function(element) {
            return element.label;
          });
        }

        if (label === 'area_construida') {
          element = _.sortBy(element, function(element) {
            return (element.label);
          });

          let indexes = {};

          element.forEach(function(obj, index) {
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

          let ltC = element.splice(indexes.lt_c, 1);
          let htC = element.splice(indexes.ht_c - 1, 1);

          element.reverse();
          element.unshift(ltC[0]);
          element.push(htC[0]);
        }

        return ({
          label: labelsDictionary[label],
          bars: element
        });
      });
    } else {
      return ([]);
    }

    return (formattedData);
  }

  componentDidMount() {
    suburbAPI.typology(this.props.zoneID)
    .then((stadisticsTypologyDistributionR) => {
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
