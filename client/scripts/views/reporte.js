// Vendor
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import BackToTop from   '../components/BackToTop';
import MainNavbar from  '../components/MainNavbar';
import Modal from       '../components/Modal';
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

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

class Reporte extends React.Component{
  constructor(props) {
    super(props);

    var type = getURLParameter('tipo') === 'Zona' ? 'colonia' : 'vivienda';

    if (type === 'colonia') {
      //Get initial State
      this.state = {
        coloniaID: getURLParameter('zona')
      }
    } else {
      //Get initial State
      this.state = {
        viviendaID: getURLParameter('zona')
      }
    }

    this.loadingReport = false;
    this.state.type = getURLParameter('tipo');
    this.state.zona = getURLParameter('zona');
    this.type = type;


    //Methods instances
    this._downloadReport = this._downloadReport.bind(this);
    this._openForm = this._openForm.bind(this);
    this._onGetColoniaInfo = this._onGetColoniaInfo.bind(this);
  }

  _printInfo(url) {
    var link = document.createElement('a');
    link.href = url;
    link.click();

    this.setState({
      loadingReport: false
    });
  }
  _buildPromises(principal, identifier, dataType, data) {
    var operation = this.state.operation;
    var state = this.state.state;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var actualDate = dd + '-' + mm + '-' + yyyy;
    var promise;
    var operatorPortafolioTotal = this.refs.portafolio_total.state.operation;
    var host = '/reporter';

    var url = host + '/' + principal;
    url += '/' + operation + '/' + state + '/' + operatorPortafolioTotal + '/' + actualDate + '/' + identifier;

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
  _generateInfo() {

  }
  _downloadReport() {
    var host = '/reporter/report/';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var date = dd + '-' + mm + '-' + yyyy;

    this._getImages();

    this.reportUrl = host + date;
    this.setState({
      loadingReport: true
    }, () => {
      setTimeout(() => {
        this.setState({
          loadingReport: false
        })
      }, 2000);
      /*
      $.get(this.url)
        .done(() => {
          this._printInfo(this.url);
        })
        .fail(() => {
          this._generateInfo(this.url);
        });
      */
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

    images.forEach(function(image) {
      console.log(image.image);
    })
    return (images);
  }
  _openForm() {
    this.showFormModal();
  }
  _onMouseoverColoniaTable(data) {
    this.refs.format_googlemap.highlightFeature(data.id);
  }
  _onMouseoverFeature(data) {
    if (this.refs.comparativo_colonias) {
      this.refs.comparativo_colonias.highlightRow(data);
    }
  }
  _onGetColoniaInfo(info) {
    this.setState({
      coloniaInfo: info
    });
  }
  componentDidMount() {
    var modal =
      (<Modal refs='modal' width={800} height={400}>
        <div style={{position: 'relative'}}>
          <a  href='#'
            style={{ marginTop: '2em',
              textDecoration: 'none',
              color: '#5C5C5C',
              fontWeight: 'bold',
              position: 'absolute',
              right: '-6px',
              bottom: '-6px'}}
              data-dismiss='modal'>
            <i className={'fa fa-times'}></i>
          </a>
        </div>
        <SearchForm />
      </Modal>);

    // Setup Modal
    this.showFormModal = Modal.memoizeRender(function() {
      return ReactDOM.render(modal, document.getElementById('modal-reserved-area'));
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


    if (this.state.type === 'vivienda') {
      secondaryNavbar = (
        <SecondaryNavbar
          width={'100%'} />
      );
      infoBlocks = (
        <div className={'row block-container'}>
          <div style={borderRight} className={'col-sm-6'}>
            <ViviendaInfo />
          </div>
          <div className={'col-sm-6'}>
            <ColoniaInfo
              onGetColoniaInfo={this._onGetColoniaInfo}
              zoneID={this.state.zona}
              viewType={this.state.type}/>
          </div>
        </div>
      );
      compareTables = (
        <ComparativoViviendas />
      );
    } else {
      infoBlocks = (
        <div className={'row block-container'}>
          <div className={'col-sm-12'}>
            <ColoniaInfo
              onGetColoniaInfo={this._onGetColoniaInfo}
              zoneID={this.state.zona}
              viewType={this.state.type} />
          </div>
        </div>
      );
      compareTables = (
        <ComparativoColonias
          ref={'comparativo_colonias'}
          onMouseover={this._onMouseoverColoniaTable.bind(this)} />
      );
    }
    let zonaName = this.state.coloniaInfo ? this.state.coloniaInfo.zonaInfo.nombre : '';
    return (
      <div className={'noselect'}>
        <header>
          <MainNavbar
            onOpenForm={this._openForm}
            onDownloadReport={this._downloadReport}>
          </MainNavbar>
            {loadingFrame}
          <FormatStickyNavbar
            coloniaInfo={this.state.coloniaInfo}
            viewType={this.state.type}/>
        </header>
        <div className={'header-section'}>
          {secondaryNavbar}
          {this.state.type === 'Zona' ? (
            <div>
              <h3 className={'section-title'}>{'Datos de la colonia ' + zonaName}</h3>
              <hr width={'100px'} className={'section-title-hr'}/>
            </div>)
            : ''
          }
          {infoBlocks}
        </div>
        <div style={{padding: '10px'}} className={'info-colonia info-colonia-section'}>
          {loadingFrame}
          {this.state.type === 'vivienda' ? (
            <div>
              <h3 className={'section-title'}>{'Información de la colonia Anzures'}</h3>
              <hr width={'100px'} className={'section-title-hr'}/>
            </div>)
            : ''
          }
          <div className={'row block-container'}>
            <div style={borderRight} className={'col-sm-6'}>
              <h4 className={'subsection-title'}>Precio Histórico Enero 2010 - Enero 2015</h4>
              <div className={'row'}>
                <div className={'col-sm-12'}>
                  <FormatLineChart
                    zoneID={this.state.zona} />
                </div>
              </div>
              <div className={'row'}>
                <div className={'col-sm-12'} style={{marginTop: '10px'}}>
                  <p className={'secondary-price'}>{'+ 5.3%'}</p>
                  <p className={'subtitle'}>Apreciación anual</p>
                </div>
              </div>
            </div>
            <div className={'col-sm-6'}>
              <h4 className={'subsection-title'}>Distribución de Precio Enero 2016</h4>
              <FormatBarChart
                zoneID={this.state.coloniaID}/>
            </div>
          </div>
          <div className={'row block-container'}>
            <div style={borderRight} className={'col-sm-4'}>
              <OfertaDisponible
                zoneID={this.state.zona} />
            </div>
            <div className={'col-sm-8'}>
              <h4 className={'subsection-title'}>Distribución de Tipología</h4>
              <FormatStackedBarChart
                zoneID={this.state.zona}/>
            </div>
          </div>
        </div>
        <div className={'row block-container comparables-section'} style={{marginTop: '10px'}}>
          <div className={'col-sm-12'} style={{marginBottom: '30px'}}>
            {compareTables}
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-sm-12'}>
            <FormatGoogleMaps
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

Reporte.defaultProps = {
  type: 'vivienda'
}

module.exports = Reporte;
