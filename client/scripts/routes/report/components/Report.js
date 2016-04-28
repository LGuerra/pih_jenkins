// Vendor
import React        from 'react';
import _            from 'lodash';
import { connect }  from 'react-redux';

// Components
import BackToTop          from '../../../components/BackToTop';
import Spinner            from '../../../components/Spinner';
import MiniSearchForm     from '../../../components/MiniSearchForm';
import URLHandler         from '../../../components/urlHandler';
import DownloadPDFReport  from '../../../containers/reporte/DownloadPDFReport';

// Views
import ReportColonia      from './ReportColonia';
import ReportVivienda     from './ReportVivienda';
import ControlBar         from './ControlBar';

// Helpers
import Helpers    from '../../../helpers';
import PDFReport  from '../../../PDFReport';

class Report extends React.Component {
  constructor(props) {
    super(props);
  }

  _getLoadingFrame(condition) {
    let loadingFrame = condition ? (
      <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          height: $(document).height() + 'px',
          width: '100%',
          zIndex: '10',
          position: 'absolute'
        }}>
        <Spinner style={{height: '100vh'}}/>
      </div>
    ) : '';

    return loadingFrame;
  }

  render() {
    let content;
    let loadingFrame  = this._getLoadingFrame(this.props.isLoadingFrame);
    let viewType      = this.props.viewType;
    let urlParams     = this.props.viewType === 'Vivienda'
      ? this.props.urlParams
      : _.pick(this.props.urlParams, ['colonia']);

    if (viewType === 'Colonia') {
      content = (
        <ReportColonia/>
      );
    } else {
      content = (
        <ReportVivienda/>
      );
    }

    return (
      <div onClick={this._clickOutside}>
        <URLHandler {..._.merge(urlParams, { tipo: this.props.viewType })} />
        <header>
          <ControlBar>
            <DownloadPDFReport />
          </ControlBar>
          {loadingFrame}
        </header>
        <div>
          {content}
        </div>
        <div>
          <BackToTop />
        </div>
        <canvas id='canvas' style={{display: 'none'}} width='300px' height='200px'>
        </canvas>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    viewType: state.report.viewType,
    urlParams: state.report.urlParams,
    isLoadingFrame: state.report.isLoadingFrame
  };
}

export default connect(mapStateToProps)(Report);
