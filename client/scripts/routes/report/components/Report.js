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

import { setUrlParams, setViewType } from '../../../actions/report_actions';

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

  componentDidUpdate() {
    console.log('Did Update');
  }

  componentDidMount() {  
    console.log('Did Mount');
    let urlParams = {
      longitud: Number(Helpers.getURLParameter('longitud')) || 0,
      latitud: Number(Helpers.getURLParameter('latitud')) || 0,
      recamaras: Number(Helpers.getURLParameter('recamaras')) || 1,
      banos: Number(Helpers.getURLParameter('banos')) || 1,
      estacionamientos: Number(Helpers.getURLParameter('estacionamientos')) || 0,
      edad: Number(Helpers.getURLParameter('edad')) || 1,
      id_tipo_propiedad: Number(Helpers.getURLParameter('id_tipo_propiedad')) || 2,
      area_construida: Number(Helpers.getURLParameter('area_construida')) || 100,
      address: Helpers.getURLParameter('address') || '',
      tipo_operacion: Number(Helpers.getURLParameter('tipo_operacion')) || 0,
      colonia: Helpers.getURLParameter('colonia') || ''
    };    

    this.props.setViewType(Helpers.getURLParameter('tipo'));
    this.props.setUrlParams(urlParams);
  }

  render() {
    if (this.props.urlParams) {
      let report;
      let loadingFrame  = this._getLoadingFrame(this.props.isLoadingFrame);
      let viewType      = this.props.viewType;
      let urlParams     = this.props.viewType === 'Vivienda'
        ? this.props.urlParams
        : _.pick(this.props.urlParams, ['colonia']);

      if (viewType === 'Colonia') {
        report = (
          <ReportColonia/>
        );
      } else {
        report = (
          <ReportVivienda/>
        );
      }

      return (
        <div onClick={this._clickOutside}>
          <header>
            <ControlBar>
              <DownloadPDFReport />
            </ControlBar>
            {loadingFrame}
          </header>
          <div>
            {report}
          </div>
          <div>
            <BackToTop />
          </div>
          <canvas id='canvas' style={{display: 'none'}} width='300px' height='200px'>
          </canvas>
        </div>
      );
    } else {
      return (
        <div>Hola amigos</div>
      );
    }
  }
}

function mapStateToProps(state) {
  let toReturn = {
    isLoadingFrame: state.report.isLoadingFrame
  };

  if (!_.isEmpty(state.report.urlParams)) {
    toReturn.urlParams = state.report.urlParams;
  }

  if (state.report.viewType) {
    toReturn.viewType = state.report.viewType;
  }

  return toReturn;
}

export default connect(mapStateToProps, {setUrlParams, setViewType})(Report);
