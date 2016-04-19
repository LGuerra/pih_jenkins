// Vendor
import React from 'react';
import _ from     'lodash';

// Components
import BackToTop from           '../../../components/BackToTop';
import MainNavbar from          '../../../components/MainNavbar';
import Spinner from             '../../../components/Spinner';
import MiniSearchForm from      '../../../components/MiniSearchForm';

// Views
import DownloadPDFReport from   '../../../containers/reporte/DownloadPDFReport';
import ReportColonia from './ReportColonia';
import ReportVivienda from './ReportVivienda';

// Helpers
import Helpers    from '../../../helpers';
import PDFReport  from '../../../PDFReport';

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: Helpers.getURLParameter('tipo'),
      coloniaID: Helpers.getURLParameter('colonia'),
      ddSearchBar: false,
      loadingReport: false
    };

    if (Helpers.getURLParameter('tipo') == 'Vivienda') {
      //Get initial State
      this.state.viviendaParams =  {
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
    console.log(info)
  }

  render() {
    let loadingFrame  = this._getLoadingFrame(this.state.loadingReport);
    let viewType      = this.props.location.query.tipo;
    let content;

    if (viewType === 'Colonia') {
      content = (
        <ReportColonia
          coloniaID = {this.state.coloniaID} />
      );
    } else {
      content = (
        <ReportVivienda
          viviendaParams = {this.state.viviendaParams}
          coloniaInfo = {this.state.coloniaInfo}
          coloniaID = {this.state.coloniaID} />
      );
    }

    return (
      <div onClick={this._clickOutside}>
        <header>
          <MainNavbar
            type={this.state.type}
            onOpenForm={this._openForm}
            ddSearchBar={this.state.ddSearchBar}
            ddChange={this._ddChange}>
            <div style={{display: 'flex', width: '100%'}}>
              <MiniSearchForm
                onUpdateSearchInfo={this._onUpdateSearchInfo}
                ddSearchBar={this.state.ddSearchBar}
                ddChange={this._ddChange}
                searchType={this.state.type} />
              <DownloadPDFReport
                viviendaParams={this.state.viviendaParams}
                coloniaID={this.state.coloniaID}
                viewType={viewType} />
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

export default Report;
