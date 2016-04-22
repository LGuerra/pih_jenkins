// Vendor
import React from 'react';
import _ from     'lodash';
import { connect } from 'react-redux';

// Components
import BackToTop from           '../../../components/BackToTop';
import MainNavbar from          '../../../components/MainNavbar';
import Spinner from             '../../../components/Spinner';
import MiniSearchForm from      '../../../components/MiniSearchForm';
import URLHandler from          '../../../components/urlHandler';

// Views
import DownloadPDFReport from   '../../../containers/reporte/DownloadPDFReport';
import ReportColonia from './ReportColonia';
import ReportVivienda from './ReportVivienda';

// Helpers
import Helpers    from '../../../helpers';
import PDFReport  from '../../../PDFReport';
import { onSetViviendaInfo, onSetColoniaInfo } from '../../../actions/report_actions';

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: Helpers.getURLParameter('tipo'),
      ddSearchBar: false,
      loadingReport: false
    };

    if (Helpers.getURLParameter('tipo') == 'Vivienda') {
      //Get initial State
      this.state.urlParams =  {
        longitud: Number(Helpers.getURLParameter('longitud')),
        latitud: Number(Helpers.getURLParameter('latitud')),
        recamaras: Number(Helpers.getURLParameter('recamaras')),
        banos: Number(Helpers.getURLParameter('banos')),
        estacionamientos: Number(Helpers.getURLParameter('estacionamientos')),
        edad: Number(Helpers.getURLParameter('edad')),
        id_tipo_propiedad: Number(Helpers.getURLParameter('id_tipo_vivienda')),
        area_construida: Number(Helpers.getURLParameter('area_construida')),
        address: Helpers.getURLParameter('address'),
        tipo_operacion: Number(Helpers.getURLParameter('tipo_operacion'))
      }
    }

    //Methods instances
    this._clickOutside = this._clickOutside.bind(this);
    this._ddChange = this._ddChange.bind(this);
  }

  _clickOutside() {
    this.setState({ddSearchBar: false});
  }

  _ddChange(dd) {
    this.setState({ddSearchBar: dd});
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

  _onUpdateSearchInfo(info) {
    if (info.reportType === 'Colonia') {
      this.props.onSetColoniaInfo(_.pick(info, ['colonia']));
    } else {
      this.props.onSetViviendaInfo(info);
    }
  }

  render() {
    let loadingFrame  = this._getLoadingFrame(this.props.isLoadingFrame);
    let viewType      = this.props.viewType;
    let content;

    if (viewType === 'Colonia') {
      content = (
        <ReportColonia
          coloniaID = {this.state.coloniaID} />
      );
    } else {
      content = (
        <ReportVivienda
          urlParams = {this.props.urlParams}
          coloniaInfo = {this.state.coloniaInfo}
          coloniaID = {this.state.coloniaID} />
      );
    }

    return (
      <div onClick={this._clickOutside}>
        <URLHandler {..._.merge(this.props.urlParams, { tipo: this.props.viewType })} />
        <header>
          <MainNavbar
            onOpenForm={this._openForm}
            ddSearchBar={this.state.ddSearchBar}
            ddChange={this._ddChange}>
            <div style={{display: 'flex', width: '100%'}}>
              <MiniSearchForm
                onUpdateSearchInfo={this._onUpdateSearchInfo.bind(this)}
                ddSearchBar={this.state.ddSearchBar}
                ddChange={this._ddChange}
                searchType={this.state.type} />
              <DownloadPDFReport />
            </div>
          </MainNavbar>
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

export default connect(mapStateToProps, { onSetViviendaInfo, onSetColoniaInfo })(Report);
