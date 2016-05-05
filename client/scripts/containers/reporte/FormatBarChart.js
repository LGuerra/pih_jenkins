// Vendor
import React from 'react';
import _     from 'lodash';
import { connect } from 'react-redux';

// Components
import BarChart from  '../../components/BarChart';
import NoChart from   '../../components/NoChart';
import Spinner from   '../../components/Spinner';

// Helpers
import Helpers                      from '../../helpers';
import { fetchDistribucionPrecio }  from '../../actions/report_actions';
import { formatDistribucionPrecio } from '../../data_formatters';

class FormatBarChart extends React.Component {
  constructor(props) {
    super(props);
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

  componentWillMount() {
    this.props.fetchDistribucionPrecio(this.props.urlParams.colonia);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.urlParams, this.props.urlParams)) {
      this.props.fetchDistribucionPrecio(this.props.urlParams.colonia);
    }
  }

  render() {
    let content = <Spinner style={{height: '220px'}}/>;

    if (this.props.distribucionPrecio) {
      if (this.props.distribucionPrecio[0]) {
        content = (<BarChart
          id={this.props.id}
          showAxis={{x: {ticks: true, line: true}, y:{ticks: true, line: false}}}
          data={this.props.distribucionPrecio}
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
    }

    return (
      content
    );
  }
}

function mapStateToProps(state) {
  let toProps = {};

  if (!_.isEmpty(state.report.distribucionPrecio)) {
    toProps.distribucionPrecio = formatDistribucionPrecio(state.report.distribucionPrecio);
  }

  return toProps;
}

export default connect(mapStateToProps, { fetchDistribucionPrecio })(FormatBarChart);
