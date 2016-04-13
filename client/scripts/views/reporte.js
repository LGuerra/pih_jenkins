// Vendor
import React from 'react';
import _ from     'lodash';

// Components
import BackToTop from       '../components/BackToTop';
import MainNavbar from      '../components/MainNavbar';
import Spinner from         '../components/Spinner';
import MiniSearchForm from  '../components/MiniSearchForm'

// View's
import ReporteVivienda  from './reporte/ReporteVivienda';
import ReporteColonia   from './reporte/ReporteColonia';

// Helpers
import Helpers    from '../helpers';
import PDFReport  from '../PDFReport';

class Reporte extends React.Component{
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
    this._downloadReport = this._downloadReport.bind(this);
    this._generateInfo = this._generateInfo.bind(this);
    this._getImages = this._getImages.bind(this);
  }

  _generateInfo(url) {
    //Initial variables
    let viviendaInfo = {};
    let viviendasComparables = [];
    let coloniasComparables = [];

    //Getting data from refered components
    let coloniaInfo = _.pick(this.refs.coloniaInfo.state.data, 'averageOffer', 'averageM2', 'coloniaInfo', 'apreciacion');
    let distribucionPrecio = this.refs.distribucionPrecio.state.data;
    let distribucionTipologia = this.refs.distribucionTipologia.state.data;
    let precioHistorico = this.refs.precioHistorico.state.data;
    let ofertaDisponible = _.pick(this.refs.ofertaDisponible.state.data, 'monthlyListing', 'semesterListing', 'averageTime');

    let dataTokens = this._getImages().map((element) => {
      return ({
        identifier: element.nombre + '.png',
        dataType: 'image',
        data: element.image
      });
    });

    if (this.state.type === 'Vivienda') {
      viviendaInfo = _.merge(this.refs.viviendaInfo.state.data, this.refs.viviendaInfo.props.params);
      viviendasComparables = this.refs.comparativoViviendas.state.data;
    } else {
      coloniasComparables = this.refs.comparativoColonias.state.data;
    }

    dataTokens = dataTokens.concat([
      {
        identifier: 'viviendas_comparables.json',
        dataType: 'json',
        data: viviendasComparables
      },
      {
        identifier: 'colonias_comparables.json',
        dataType: 'json',
        data: coloniasComparables
      },
      {
        identifier: 'info_colonia.json',
        dataType: 'json',
        data: coloniaInfo
      },
      {
        identifier: 'oferta_disponible.json',
        dataType: 'json',
        data: ofertaDisponible
      },
      {
        identifier: 'info_vivienda.json',
        dataType: 'json',
        data: viviendaInfo
      },
      {
        identifier: 'distribucion_precio.json',
        dataType: 'json',
        data: distribucionPrecio
      },
      {
        identifier: 'precio_historico.json',
        dataType: 'json',
        data: precioHistorico
      }
    ]);

    PDFReport.downloadPDFReport(url, dataTokens)
      .then(() => {
        this.setState({
          loadingReport: false
        });
      });
  }

  _downloadReport() {
    if (!this.state.loadingReport) {
      let host = 'http://reportserver-production.elasticbeanstalk.com/reporter/reporte_vivienda/';
      //let host = 'http://192.168.0.225:4567/reporter/reporte_vivienda/';
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1;
      let yyyy = today.getFullYear();

      if (mm < 10) mm = '0' + mm;
      if (dd < 10) dd = '0' + dd;

      let date = dd + '-' + mm + '-' + yyyy;

      if (this.state.type === 'Vivienda') {
        let randomText = Math.random().toString(36).substr(2, 10);
        this.reportUrl = host + this.state.type.toLowerCase() + '/' + this.state.coloniaID + '-' + randomText + '/' + date;
      } else {
        this.reportUrl = host + this.state.type.toLowerCase() + '/' + this.state.coloniaID + '/' + date;
      }

      this.setState({
        loadingReport: true
      }, () => {
        $.get(this.reportUrl)
          .done(() => {
            PDFReport.printInfo(this.reportUrl);
            this.setState({
              loadingReport: false
            });
          })
          .fail(() => {
            this._generateInfo(this.reportUrl);
          });
      });
    }
  }

  _getImages() {
    let images = [];

    $('svg.printable-chart').each((index, svg) => {
      let svgXml = (new XMLSerializer).serializeToString(svg);
      canvg('canvas', svgXml);
      let canvas = document.getElementById('canvas');

      images.push({
        nombre: $(svg).attr('id'),
        image: canvas.toDataURL()
      });
    });

    return (images);
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
    let loadingFrame      = this._getLoadingFrame(this.state.loadingReport);
    let content;

    if (this.state.type === 'Colonia') {
      content = (
        <ReporteColonia
          coloniaID = {this.state.coloniaID}
          />
      );
    } else {
      content = (
        <ReporteVivienda
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
              <div style={{margin: '0px', cursor: 'pointer'}} onClick={this._downloadReport}>
                <img height={'15px'} style={{margin: '20px 10px'}} src={IMAGES.descarga} />
              </div>
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

module.exports = Reporte;
