// Vendor
import React from 'react';
import d3 from 'd3';
import _ from 'lodash';

import moment from 'moment';

// Components
import MainNavbar from  '../components/MainNavbar';
import Spinner from     '../components/Spinner';
import BackToTop from   '../components/BackToTop';

// View's Components
import OfertaDisponible from      './reporte/OfertaDisponible';
import ViviendaInfo from          './reporte/ViviendaInfo';
import ColoniaInfo from           './reporte/ColoniaInfo';
import PrecioDistribucion from    './reporte/PrecioDistribucion';
import FormatLineChart from       './reporte/FormatLineChart';
import FormatBarChart from        './reporte/FormatBarChart';
import FormatStackedBarChart from './reporte/FormatStackedBarChart';
import StickyNavbar from          './reporte/StickyNavbar';
import SecondaryNavbar from       './reporte/SecondaryNavbar';
import ComparativoViviendas from  './reporte/ComparativoViviendas';
import ComparativoColonias from   './reporte/ComparativoColonias';
import FormatGoogleMaps from      './reporte/FormatGoogleMaps';

class Reporte extends React.Component{
  constructor(props) {
    super(props);

    //Get initial State
    this.state = {
      loadingReport: false
    }

    //Methods instances
    this._downloadReport = this._downloadReport.bind(this);
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
    var actualDate = moment().format('DD-MM-YYYY');
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
    var date = moment().format('DD-MM-YYYY');


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
  _onMouseoverColoniaTable(data) {
    console.log(data);
    this.refs.format_googlemap.highlightFeature(data.id);
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

    if (this.props.type === 'vivienda') {
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
            <ColoniaInfo />
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
            <ColoniaInfo />
          </div>
        </div>
      );
      compareTables = (
        <ComparativoColonias
          onMouseover={this._onMouseoverColoniaTable.bind(this)}/>
      );
    }

    return (
      <div className={'noselect'}>
        <header>
          <MainNavbar
           onDownloadReport={this._downloadReport}>
          </MainNavbar>
            {loadingFrame}
          {secondaryNavbar}
          <StickyNavbar />
        </header>
        {infoBlocks}
        <div style={{backgroundColor: 'rgba(242, 245, 249, 0.4)', padding: '10px', marginTop: '20px'}} className={'info-colonia'}>
          {loadingFrame}
          <h3 className={'section-title'}>{'Información de la colonia Anzures'}</h3>
          <hr width={'100px'} className={'section-title-hr'}/>
          <div className={'row block-container'}>
            <div style={borderRight} className={'col-sm-6'}>
              <h4 className={'subsection-title'}>Precio Histórico Enero 2010 - Enero 2015</h4>
              <div className={'row'}>
                <div className={'col-sm-12'}>
                  <FormatLineChart/>
                </div>
              </div>
              <div className={'row'}>
                <div className={'col-sm-12'} style={{marginTop: '10px'}}>
                  <p className={'secondary-price'}>{'5.3%'}</p>
                  <p className={'subtitle'}>Apreciación anual</p>
                </div>
              </div>
            </div>
            <div className={'col-sm-6'}>
              <h4 className={'subsection-title'}>Distribución de Precio Enero 2016</h4>
              <FormatBarChart />
              <PrecioDistribucion />
            </div>
          </div>
          <div className={'row block-container'}>
            <div style={borderRight} className={'col-sm-4'}>
              <OfertaDisponible />
            </div>
            <div className={'col-sm-8'}>
              <h4 className={'subsection-title'}>Distribución de Tipología</h4>
              <FormatStackedBarChart />
            </div>
          </div>
        </div>
        <div className={'row block-container'} style={{marginTop: '10px'}}>
          <div className={'col-sm-12'} style={{marginBottom: '30px'}}>
            {compareTables}
          </div>
        </div>
        <div className={'row'}>
          <div style={{marginBottom: '30px'}} className={'col-sm-12'}>
            <FormatGoogleMaps
              ref={'format_googlemap'}/>
          </div>
        </div>
        <div>
        </div>
        <div>
          <BackToTop />
        </div>
      </div>
    );
  }
}

Reporte.defaultProps = {
  type: 'colonia'
}

module.exports = Reporte;
