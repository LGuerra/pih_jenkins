// Vendor
import React from 'react';

// Components
import LineChart from   '../../components/LineChart';
import NoChart from     '../../components/NoChart';
import Spinner from     '../../components/Spinner';

// Helpers
import Helpers from '../../helpers';
import helper_properties from '../../helper_properties';
import { suburbAPI } from './../../api/api-helper.js';

class FormatLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: true
    };

    this._xTickFormat = this._xTickFormat.bind(this);
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

  _formatData(data) {
    let arrayPoints = data.map((element, index) => {
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

  _checkoutAvailability(apreciacion) {
    if (apreciacion > 0.20 || apreciacion == null) {
      this.setState({
        isAvailable: false
      });
    }
  }

  componentDidMount() {
      suburbAPI.historicPrice(this.props.zoneID)
      .then((suburbHistoricR) => {
      let data = this._formatData(suburbHistoricR.data);
      this.setState({
        data: data
      });
    });
  }

  render() {
    let content = <Spinner style={{height: '220px'}}/>;

    if (this.state.data) {
      if (this.state.data[0].data[0] && this.state.isAvailable) {
        content = (
          <LineChart
            id={this.props.id}
            showAxis={{x: {ticks: true, line: true}, y:{ticks: true, line: false}}}
            data={this.state.data}
            tooltipFormat={this._tooltipLineFormat}
            yTitleUnit={'Precio promedio m²'}
            height={220}
            xtickFormat={this._xTickFormat}
            ytickFormat={this._yTickFormat}
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

export default FormatLineChart;
