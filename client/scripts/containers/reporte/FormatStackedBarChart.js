// Vendor
import React from 'react'
import _ from 'lodash';

// Components
import StackedBarChart from '../../components/StackedBarChart';
import NoChart from         '../../components/NoChart';
import Spinner from         '../../components/Spinner';

// Helpers
import { connect } from 'react-redux';
import { fetchDistribucionTipologia } from '../../actions/report_actions';

import { formatDistribucionTipologia } from '../../data_formatters';

class FormatStackedBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchDistribucionTipologia(this.props.zoneID);
  }

  render() {
    let content = <Spinner style={{height: '295px'}}/>;

    if (this.props.distribucionTipologia) {
      if (this.props.distribucionTipologia[0]) {
        content = (
          <StackedBarChart
            id={this.props.id}
            svgClass={'printable-chart'}
            data={this.props.distribucionTipologia}
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
    }

    return (content);
  }
}

function mapStateToProps(state) {
  if (!_.isEmpty(state.report.distribucionTipologia)) {
    return {
      distribucionTipologia: formatDistribucionTipologia(state.report.distribucionTipologia)
    };
  }

  return {};
}

export default connect(mapStateToProps, { fetchDistribucionTipologia })(FormatStackedBarChart);
