// Vendor
import React from 'react';
import _     from 'lodash';

// Components
import BarChart from '../../components/BarChart';
import NoChart from '../../components/NoChart';

// Helpers
import Helpers from '../../helpers';
import { suburbAPI } from './../../api/api-helper.js';

class FormatBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: true
    };
  }

  _tooltipBarFormat(d, i) {
    let title

    if (d.lim_inf === 'limite_inf') {
      title = 'Menor a ' +  Helpers.formatAsPrice(d.lim_sup);
    } else if (d.lim_sup === 'limite_sup') {
      title = 'Mayor a ' + Helpers.formatAsPrice(d.lim_inf);
    } else {
      title = Helpers.formatAsPrice(d.lim_inf) + ' a ' +  Helpers.formatAsPrice(d.lim_sup);
    }

    let html = `<div class="TooltipContainer">
      <div class="Tooltip-row">
        <p class="Tooltip-title">${title}</p>
      </div>
      <div class="Tooltip-row">
        <p class="Tooltip-value">${(d.value * 100).toFixed(1)}%</p>
        <p class="Tooltip-unit">&nbsp;${'Viviendas'}</p>
      </div>
    </div>`;

    return (html);
  }

  _formatData(data) {
    let formattedData;
    var stringElement;
    if (data.json_precios) {
      formattedData = _.map(data.json_precios, (element, key) => {
        let label;
        if (element.lim_inf === 'limite_inf') {
          label = '< ' + Helpers.formatAsNumber(element.lim_sup / 1000);
        } else if (element.lim_sup === 'limite_sup') {
          label = '> ' + Helpers.formatAsNumber(element.lim_inf / 1000);
        } else {
          label = Helpers.formatAsNumber(element.lim_inf / 1000) + ' a ' + Helpers.formatAsNumber(element.lim_sup / 1000);
        }
        return({
          lim_inf: element.lim_inf,
          lim_sup: element.lim_sup,
          label: label,
          value: element.value
        });
      });

    } else {
      formattedData = [];
    }

    formattedData = _.filter(formattedData, element => {
      if (typeof element.lim_inf == 'number') {
        return (element);
      }
      stringElement = element;
    })

    formattedData = _.sortBy(formattedData, element => {
      return element.lim_inf;
    });

    formattedData.unshift(stringElement);

    return (formattedData);
  }

  componentDidMount() {
    suburbAPI.priceDistribution(this.props.zoneID)
    .then((stadisticsPriceDistributionR) => {
      let data = this._formatData(stadisticsPriceDistributionR.data);
      this.setState({
        data: data
      });
    });
  }

  render() {
    let content;

    if (this.state.data) {
      if (this.state.data[0] && this.state.isAvailable) {
        content = (<BarChart
          id={this.props.id}
          showAxis={{x: {ticks: true, line: true}, y:{ticks: true, line: false}}}
          data={this.state.data}
          tooltipFormat={this._tooltipBarFormat}
          color={'#35C0BE'}
          hoverColor={'#2a9998'}
          height={239}
          xTitleUnit={'Pesos'}
          margin={{
            left: 40,
            right: 35,
            top: 40,
            bottom: 35
          }}
          idContainer={'bar-chart'} /> );
      } else {
        content = (
          <NoChart
            message={'No hay datos disponibles'}
            height={239}
            width={'100%'}
            id={this.props.id}
            specificClass={'printable-chart'}/>);
      }
    } else {
      content = (<div></div>);
    }

    return (
      content
    );
  }
}

export default FormatBarChart;
