// Vendor
import React, { Component }        from 'react';
import { isEqual, isEmpty } from 'lodash';
import { connect }          from 'react-redux';

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
import PDFReport  from '../../../PDFReport';

import { setInitialState } from '../../../actions/report_actions';

class Report extends Component {
  constructor(props) {
    super(props);
  }

  _scrollTo() {
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 500);
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

  componentDidMount() {
    this.props.setInitialState();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.location.query, this.props.location.query)) {
      this.props.setInitialState();
      this._scrollTo();
    }
  }

  _getUrlParams() {
    let urlParams = {
      longitud: this.props.location.query.longitud || 0,
      latitud: this.props.location.query.latitud || 0,
      recamaras: this.props.location.query.recamaras || 1,
      banos: this.props.location.query.banos || 1,
      estacionamientos: this.props.location.query.estacionamientos || 0,
      edad: this.props.location.query.edad|| 1,
      id_tipo_propiedad: this.props.location.query.id_tipo_propiedad || 2,
      area_construida: this.props.location.query.area_construida || 100,
      address: this.props.location.query.address || '',
      tipo_operacion: this.props.location.query.tipo_operacion || 0,
      colonia: this.props.location.query.colonia || '',
      tipo: this.props.location.query.tipo || 'Colonia'
    }

    return urlParams;
  }

  render() {
    let report;
    let loadingFrame  = this._getLoadingFrame(this.props.isLoadingFrame);
    let viewType      = this.props.location.query.tipo;
    let urlParams     = this._getUrlParams();

    if (viewType === 'Colonia') {
      report = (
        <ReportColonia
          urlParams={urlParams}/>
      );
    } else {
      report = (
        <ReportVivienda
          urlParams={urlParams}/>
      );
    }

    return (
      <div onClick={this._clickOutside}>
        <header>
          <ControlBar urlParams={urlParams} >
            <DownloadPDFReport
              viewType={viewType}
              urlParams={urlParams} />
          </ControlBar>
          {loadingFrame}
        </header>
        <div>
          {report}
        </div>
        <div>
          <BackToTop />
        </div>
        <canvas id='canvas' style={{display: 'none'}} width='300px' height='200px'/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let toReturn = {
    isLoadingFrame: state.report.isLoadingFrame
  };

  if (!isEmpty(state.report.urlParams)) {
    toReturn.urlParams = state.report.urlParams;
  }

  if (state.report.viewType) {
    toReturn.viewType = state.report.viewType;
  }

  return toReturn;
}

export default connect(mapStateToProps, {setInitialState})(Report);
