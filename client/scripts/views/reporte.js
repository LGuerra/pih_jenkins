// Vendor
import React from 'react';
import _ from     'lodash';

// Components
import BackToTop from   '../components/BackToTop';
import MainNavbar from  '../components/MainNavbar';
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
import SecondaryNavbar from       './reporte/SecondaryNavbar';
import ViviendaInfo from          './reporte/ViviendaInfo';

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
    this._downloadReport = this._downloadReport.bind(this);
    this._generateInfo = this._generateInfo.bind(this);
    this._getImages = this._getImages.bind(this);
    this._onGetColoniaInfo = this._onGetColoniaInfo.bind(this);
    this._onGetViviendaInfo = this._onGetViviendaInfo.bind(this);
    this._onMouseoverColoniaTable = this._onMouseoverColoniaTable.bind(this);
    this._onMouseoverFeature = this._onMouseoverFeature.bind(this);
  }

  _generateInfo(url) {
    //Initial variables
    let viviendaInfo = {};
    let viviendasComparables = [];
    let coloniasComparables = [];

    //Getting data from refered components
    let coloniaInfo = _.pick(this.refs.coloniaInfo.state, 'averageOffer', 'averageM2', 'coloniaInfo', 'apreciacion');
    let distribucionPrecio = this.refs.distribucionPrecio.state.data;
    let distribucionTipologia = this.refs.distribucionTipologia.state.data;
    let precioHistorico = this.refs.precioHistorico.state.data;
    let ofertaDisponible = _.pick(this.refs.ofertaDisponible.state, 'monthlyListing', 'semesterListing', 'averageTime');

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

  _getImages() {
    let images = [];
    let svgs = $('svg.printable-chart');
    let svgXml;

    for (let i = 0; i < svgs.length; i++) {
      svgXml = (new XMLSerializer).serializeToString(svgs[i]);
      canvg('canvas', svgXml);

      // the canvas calls to output a png
      let canvas = document.getElementById('canvas');

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
    this.refs.formatGoogleMaps.highlightFeature(data.id);
  }

  _onMouseoverFeature(data) {
    if (this.refs.comparativoColonias) {
      this.refs.comparativoColonias.highlightRow(data);
    }
  }

  _onGetColoniaInfo(info) {
    this.refs.precioHistorico._checkoutAvailability(info.apreciacion);

    this.setState({
      coloniaInfo: info
    });
  }

  _onGetViviendaInfo(info) {
    this.setState({
      viviendaInfo: info
    });
  }

  _clickOutside() {
    this.setState({ddSearchBar: false});
  }

  _ddChange(dd) {
    this.setState({ddSearchBar: dd});
  }

  render() {
    let loadingFrame;
    let secondaryNavbar;
    let infoBlocks;
    let compareTables;
    let coloniaName = this.state.coloniaInfo ? this.state.coloniaInfo.coloniaInfo.nombre : '';
    let borderRight = {
      borderRight: '1px solid #c9c9c9'
    };

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
        <div className={'BlockContainer row'}>
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
        <div className={'BlockContainer row'}>
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
          onMouseout={this._onMouseoverColoniaTable}
          onMouseover={this._onMouseoverColoniaTable} />
      );
    }

    return (
      <div onClick={this._clickOutside}>
        <header>
          <MainNavbar
            type={this.state.type}
            onOpenForm={this._openForm}
            ddSearchBar={this.state.ddSearchBar}
            ddChange={this._ddChange}
            onDownloadReport={this._downloadReport}>
          </MainNavbar>
            {loadingFrame}
          <FormatStickyNavbar
            coloniaInfo={this.state.coloniaInfo}
            viviendaInfo={this.state.viviendaInfo}
            viewType={this.state.type}/>
        </header>
        <div style={{padding: '10px'}} className={'MainSection'}>
          <div className={'max-width-container'}>
            {secondaryNavbar}
            {this.state.type === 'Colonia' ? (
              <div>
                <h3 className={'SectionTitle'}>{'Datos de la colonia ' + coloniaName}</h3>
                <div className={'LineDivider'}></div>
              </div>)
              : ''
            }
            {infoBlocks}
          </div>
        </div>
        <div style={{padding: '10px'}} className={'info-colonia MainSection'}>
          <div className={'max-width-container'}>
            {this.state.type === 'Vivienda' ? (
              <div>
                <h3 className={'SectionTitle'}>{'Información de la colonia ' + coloniaName}</h3>
                <div className={'LineDivider'}></div>
              </div>)
              : ''
            }
            <div>
              <OfertaDisponible
                ref={'ofertaDisponible'}
                zoneID={this.state.coloniaID} />
            </div>
            <div>
              <h4 className={'SubsectionTitle'}>{'Distribución de Tipología'}<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h4>
              <FormatStackedBarChart
                ref={'distribucionTipologia'}
                id={'distribucion_tipologia'}
                zoneID={this.state.coloniaID}/>
            </div>
            <div className={'BlockContainer row'}>
              <div style={_.merge(borderRight, {paddingLeft: '0px'})} className={'col-sm-6'}>
                <h4 className={'SubsectionTitle'}>Precio Histórico por m²</h4>
                <div className={'row'}>
                  <div className={'col-sm-12'} style={{marginTop: '15px'}}>
                    <FormatLineChart
                      ref={'precioHistorico'}
                      id={'precio_historico'}
                      zoneID={this.state.coloniaID} />
                  </div>
                </div>
              </div>
              <div className={'col-sm-6 barchart-section'}>
                <h4 className={'SubsectionTitle'}>Distribución de Precio por m²<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h4>
                <FormatBarChart
                  ref={'distribucionPrecio'}
                  id={'distribucion_precio'}
                  zoneID={this.state.coloniaID}/>
              </div>
            </div>
          </div>
        </div>
        <div className={'BlockContainer row MainSection'} style={{marginTop: '10px'}}>
          <div className={'max-width-container'}>
            <div className={'col-sm-12'}>
              {compareTables}
              <div className={'Footnote'}>
                <img width={'7px'} src={IMAGES.asterisk} />
                <p style={{textAlign: 'right', margin: '5px 0 0 3px'}}>{'Información de mercado con base en datos de los últimos 6 meses.'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={'row'} style={{margin: '10px 0px'}}>
          <div className={'col-sm-12'}>
            <FormatGoogleMaps
              coloniaName={coloniaName}
              viewType={this.state.type}
              viviendaInfo={this.state.viviendaParams ?
                {
                  lat: this.state.viviendaParams.latitud,
                  lng: this.state.viviendaParams.longitud
                } : {}}
              zoneID={this.state.coloniaID}
              onMouseoverFeature={this._onMouseoverFeature}
              ref={'formatGoogleMaps'}/>
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
