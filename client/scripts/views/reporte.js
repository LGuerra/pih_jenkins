// Vendor
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

// Components
import BackToTop from   '../components/BackToTop';
//import Modal from       '../components/Modal';
import MainNavbar from  '../components/MainNavbar';
//import Modal from       '../components/Modal';
import SearchForm from  '../components/SearchForm';
import Spinner from     '../components/Spinner';

// View's Components
import ColoniaInfo from           './reporte/ColoniaInfo';
import ComparativoColonias from   './reporte/ComparativoColonias';
import ComparativoViviendas from  './reporte/ComparativoViviendas';
import FormatBarChart from        './reporte/FormatBarChart';
import FormatGoogleMaps from      './reporte/FormatGoogleMaps';
import FormatLineChart from       './reporte/FormatLineChart';
import FormatStackedBarChart from './reporte/FormatStackedBarChart';
import FormatStickyNavbar from    './reporte/FormatStickyNavbar';
import OfertaDisponible from      './reporte/OfertaDisponible';
import PrecioDistribucion from    './reporte/PrecioDistribucion';
import SecondaryNavbar from       './reporte/SecondaryNavbar';
import ViviendaInfo from          './reporte/ViviendaInfo';

import Helpers from '../helpers';

function getURLParameter(name) {
  /**
   * Disabling eslint to avoid regex ERROR*/
  /*eslint-disable*/
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  /*eslint-enable*/
}

class Reporte extends React.Component{
  constructor(props) {
    super(props);

    var type = getURLParameter('tipo') === 'Colonia' ? 'colonia' : 'Vivienda';

    this.state = {};

    if (type === 'Vivienda') {
      //Get initial State
      this.state = {
        viviendaParams: {
          longitud: Number(getURLParameter('longitud')),
          latitud: Number(getURLParameter('latitud')),
          recamaras: Number(getURLParameter('recamaras')),
          banos: Number(getURLParameter('banos')),
          estacionamientos: Number(getURLParameter('estacionamientos')),
          edad: Number(getURLParameter('edad')),
          id_tipo_propiedad: Number(getURLParameter('id_tipo_vivienda')),
          area_construida: Number(getURLParameter('area_construida')),
          address: getURLParameter('address'),
          tipo_operacion: Number(getURLParameter('tipo_operacion'))
        }
      }
    }

    this.loadingReport = false;
    this.state.type = getURLParameter('tipo');
    this.state.coloniaID = getURLParameter('colonia');

    //Methods instances
    this._downloadReport = this._downloadReport.bind(this);
    this._onGetColoniaInfo = this._onGetColoniaInfo.bind(this);
    this._printInfo = this._printInfo.bind(this);
    this._buildPromises = this._buildPromises.bind(this);
    this._askForPDF = this._askForPDF.bind(this);
    this._generateReport = this._generateReport.bind(this);
    this._generateInfo = this._generateInfo.bind(this);
    this._downloadReport = this._downloadReport.bind(this);
    this._getImages = this._getImages.bind(this);
    this._onGetViviendaInfo = this._onGetViviendaInfo.bind(this);
  }

  _printInfo(url) {
    var link = document.createElement('a');
    link.href = url;
    link.click();

    this.setState({
      loadingReport: false
    });
  }
  _buildPromises(identifier, dataType, data) {
    let url = this.reportUrl + '/' + identifier;
    let promise;
    if (dataType === 'json') {
      promise = $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data)
      });
    } else {
      promise = $.ajax({
        url: url,
        type: 'POST',
        data: data
      });
    }

    return (promise);
  }
  _askForPDF(miliseconds, attempt, callback) {
    var deferred = $.Deferred();
    (function autoCallable() {
      setTimeout(function() {
        callback()
          .then(deferred.resolve(), function() {
            if (attempt > 0) {
              attempt -= 1;
              autoCallable();
            } else {
              deferred.reject();
            }
          });
      }, miliseconds);
    })();

    return deferred.promise();
  }
  _generateReport(url) {
    $.post(url)
      .done(() => {
        this._askForPDF(5000, 10, function() {
          return ($.get(url));
        })
        .then(() => {
          this._printInfo(url);
        });
      });
  }
  _generateInfo(url) {
    let allPromises = [];
    let viviendaInfo = {};
    let viviendasComparables = [];
    let coloniasComparables = [];
    this._getImages().forEach((element) => {
      allPromises.push(
        this._buildPromises(
          element.nombre + '.png', 'image', element.image
        )
      );
    });

    if (this.state.type === 'Vivienda') {
      viviendaInfo = _.merge(this.refs.viviendaInfo.state.data, this.refs.viviendaInfo.props.params);
      viviendasComparables = this.refs.comparativoViviendas.state.data;
    } else {
      coloniasComparables = this.refs.comparativoColonias.state.data;
    }

    let coloniaInfo = this.refs.coloniaInfo.state.data;
    let ofertaDisponible = this.refs.ofertaDisponible.state.data;
    let distribucionPrecio = this.refs.distribucionPrecio.state.data;
    let precioHistorico = this.refs.precioHistorico.state.data;

    let distribucionTipologia = this.refs.distribucionTipologia.state.data;
    allPromises.push(this._buildPromises(
      'viviendas_comparables.json', 'json', viviendasComparables
    ));
    allPromises.push(this._buildPromises(
      'colonias_comparables.json', 'json', coloniasComparables
    ));
    allPromises.push(this._buildPromises(
      'info_colonia.json', 'json', coloniaInfo
    ));
    allPromises.push(this._buildPromises(
      'oferta_disponible.json', 'json', ofertaDisponible
    ));
    allPromises.push(this._buildPromises(
      'info_vivienda.json', 'json', viviendaInfo
    ));
    allPromises.push(this._buildPromises(
      'distribucion_precio.json', 'json', distribucionPrecio
    ));

    $.when.apply($, allPromises)
      .then(() => {
        this._generateReport(url);
      })
      .fail((error, msg) => {
        console.log('FAIL', error, msg);
      });
  }
  _downloadReport() {
    var host = 'http://reportserver-production.elasticbeanstalk.com/reporter/reporte_vivienda/';
    //var host = 'http://192.168.0.225:4567/reporter/reporte_vivienda/';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if (mm < 10) {
      mm = '0' + mm;
    }
    var date = dd + '-' + mm + '-' + yyyy;

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
          this._printInfo(this.reportUrl);
        })
        .fail(() => {
          this._generateInfo(this.reportUrl);
        });
    });
  }
  _getImages() {
    var images = [];
    var svgs = $('svg.printable-chart');
    var svgXml;

    for (var i = 0; i < svgs.length; i++) {
      svgXml = (new XMLSerializer).serializeToString(svgs[i]);
      canvg('canvas', svgXml);

      // the canvas calls to output a png
      var canvas = document.getElementById('canvas');

      images.push({
        nombre: $(svgs[i]).attr('id'),
        image: canvas.toDataURL({
          format: 'jpeg',
          quality: 0.3
        })
      });
    }

    return (images);
  }
  _onMouseoverColoniaTable(data) {
    this.refs.format_googlemap.highlightFeature(data.id);
  }
  _onMouseoverFeature(data) {
    if (this.refs.comparativoColonias) {
      this.refs.comparativoColonias.highlightRow(data);
    }
  }
  _onGetColoniaInfo(info) {
    this.refs.precioHistorico._checkoutAvailability(info.apreciacion);
    this.refs.distribucionPrecio._checkoutAvailability(info.apreciacion);

    this.setState({
      coloniaInfo: info
    });
  }
  _onGetViviendaInfo(info) {
    this.setState({
      viviendaInfo: info
    });
  }
  render() {
    var loadingFrame;
    var borderRight = {
      borderRight: '1px solid #c9c9c9'
    };
    var secondaryNavbar;
    var infoBlocks;
    var compareTables;
    let coloniaName = this.state.coloniaInfo ? this.state.coloniaInfo.coloniaInfo.nombre : '';


    if (this.state.loadingReport) {
      loadingFrame =
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            height: $(document).height() + 'px',
            width: '100%',
            zIndex: '10',
            position: 'absolute'
          }}>
          <Spinner style={{height: '100vh'}}/>
        </div>;
    }
    if (this.state.type === 'Vivienda') {
      secondaryNavbar = (
        <SecondaryNavbar
          data={_.pick(this.state.viviendaParams, 'recamaras', 'banos', 'estacionamientos', 'id_tipo_propiedad', 'area_construida', 'address')}
          width={'100%'} />
      );
      infoBlocks = (
        <div className={'row block-container'}>
          <div style={borderRight} className={'col-sm-4'}>
            <ViviendaInfo
              ref={'viviendaInfo'}
              onGetViviendaInfo={this._onGetViviendaInfo}
              params={this.state.viviendaParams}/>
          </div>
          <div className={'col-sm-8'}>
            <ColoniaInfo
              coloniaName={coloniaName}
              ref={'coloniaInfo'}
              onGetColoniaInfo={this._onGetColoniaInfo}
              zoneID={this.state.coloniaID}
              viewType={this.state.type}/>
          </div>
        </div>
      );
      if (this.state.viviendaInfo) {
        compareTables = (
          <ComparativoViviendas
            ref={'comparativoViviendas'}
            coloniaName={coloniaName}
            viviendaInfo={this.state.viviendaInfo}
            params={this.state.viviendaParams}/>
        );
      } else {
        compareTables = (<div></div>);
      }
    } else {
      infoBlocks = (
        <div className={'row block-container'}>
          <div className={'col-sm-12'}>
            <ColoniaInfo
              ref={'coloniaInfo'}
              onGetColoniaInfo={this._onGetColoniaInfo}
              zoneID={this.state.coloniaID}
              viewType={this.state.type} />
          </div>
        </div>
      );
      compareTables = (
        <ComparativoColonias
          ref={'comparativoColonias'}
          zoneID={this.state.coloniaID}
          onMouseout={this._onMouseoverColoniaTable.bind(this)}
          onMouseover={this._onMouseoverColoniaTable.bind(this)} />
      );
    }

    return (
      <div>
        <header>
          <MainNavbar
            type={this.state.type}
            onOpenForm={this._openForm}
            onDownloadReport={this._downloadReport}>
          </MainNavbar>
            {loadingFrame}
          <FormatStickyNavbar
            coloniaInfo={this.state.coloniaInfo}
            viviendaInfo={this.state.viviendaInfo}
            viewType={this.state.type}/>
        </header>
        <div className={'header-section'}>
          <div className={'max-width-container'}>
            {secondaryNavbar}
            {this.state.type === 'Colonia' ? (
              <div>
                <h3 className={'section-title'}>{'Datos de la colonia ' + coloniaName}</h3>
                <div className={'line-divider'}></div>
              </div>)
              : ''
            }
            {infoBlocks}
          </div>
        </div>
        <div style={{padding: '10px'}} className={'info-colonia info-colonia-section'}>
          <div className={'max-width-container'}>
            {this.state.type === 'Vivienda' ? (
              <div>
                <h3 className={'section-title'}>{'Información de la colonia ' + coloniaName}</h3>
                <div className={'line-divider'}></div>
              </div>)
              : ''
            }
            <div>
              <OfertaDisponible
                ref={'ofertaDisponible'}
                zoneID={this.state.coloniaID} />
            </div>
            <div>
              <h4 className={'subsection-title'}>Distribución de Tipología*</h4>
              <FormatStackedBarChart
                ref={'distribucionTipologia'}
                id={'distribucion_tipologia'}
                zoneID={this.state.coloniaID}/>
            </div>
            <div className={'row block-container'}>
              <div style={_.merge(borderRight, {paddingLeft: '0px'})} className={'col-sm-6'}>
                <h4 className={'subsection-title'}>Precio Histórico por m²</h4>
                <div className={'row'}>
                  <div className={'col-sm-12'} style={{marginTop: '15px'}}>
                    <FormatLineChart
                      ref={'precioHistorico'}
                      id={'precio_historico'}
                      zoneID={this.state.coloniaID} />
                  </div>
                </div>
              </div>
              <div className={'col-sm-6'}>
                <h4 className={'subsection-title'}>Distribución de Precio por m²*</h4>
                <FormatBarChart
                  ref={'distribucionPrecio'}
                  id={'distribucion_precio'}
                  zoneID={this.state.coloniaID}/>
              </div>
            </div>
          </div>
        </div>
        <div className={'row block-container comparables-section'} style={{marginTop: '10px'}}>
          <div className={'max-width-container'}>
            <div className={'col-sm-12'}>
              {compareTables}
              <p style={{textAlign: 'right'}} className={'footnote'}>*Información de mercado con base en datos de los últimos 6 meses.</p>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-sm-12'}>
            <FormatGoogleMaps
              viewType={this.state.type}
              viviendaInfo={this.state.viviendaParams ?
                {
                  lat: this.state.viviendaParams.latitud,
                  lng: this.state.viviendaParams.longitud
                } : {}}
              zoneID={this.state.coloniaID}
              onMouseoverFeature={this._onMouseoverFeature.bind(this)}
              ref={'format_googlemap'}/>
          </div>
        </div>
        <div>
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
