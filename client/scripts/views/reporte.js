// Vendor
import React from 'react';
import d3 from 'd3';
import _ from 'lodash';

// Components
import BarChart from        '../components/BarChart';
import LineChart from       '../components/LineChart';
import StackedBarChart from '../components/StackedBarChart';
import Table from           '../components/Table';

// View's Components
import OfertaDisponible from    './reporte/OfertaDisponible';
import ViviendaInfo from        './reporte/ViviendaInfo';
import ColoniaInfo from         './reporte/ColoniaInfo';
import PrecioDistribucion from  './reporte/PrecioDistribucion';

var MainNavbar = React.createClass({
  render: function() {
    return (
      <nav className={'navbar navbar-default'} style={{
        width: this.props.width,
        backgroundColor: this.props.bgColor
      }}>
      {this.props.children}
      </nav>
    );
  }
});

var SecondaryNavbar = React.createClass({
  render: function() {
    return (
      <nav className={'secondary-nav navbar navbar-default'} style={{
        width: this.props.width,
        backgroundColor: this.props.bgColor
      }}>
      {this.props.children}
      </nav>
    );
  }
});

var Page = React.createClass({
  componentDidMount: function() {
    var stickyNavTop = $('.secondary-nav').offset().top;

    var stickyNav = function(){
      var scrollTop = $(window).scrollTop();
      if (scrollTop > stickyNavTop) {
        $('.secondary-nav').addClass('sticky');
      } else {
        $('.secondary-nav').removeClass('sticky');
      }
    };
    stickyNav();
    $(window).scroll(function() {
      stickyNav();
    });
  },
  _tooltipBarFormat: function(d, i) {
    var html = '<div class="tooltip-container">';
      html += '<div class="tooltip-row">';
        html += '<p class="tooltip-value">' + '120' + '</p>';
        html += '<p class="tooltip-unit">' + 'Viviendas' + '</p>';
      html += '</div>';
      html += '<div class="tooltip-row">';
        html += '<p class="tooltip-value">' + '$1,000,000' + '</p>';
        html += '<p class="tooltip-value">' + 'a' + '</p>';
        html += '<p class="tooltip-value">' + ' $3,000,000' + '</p>';
      html += '</div>';
    html += '</div>';
    return (html);
  },
  _tooltipLineFormat: function(d, i) {
    var html = '<div class="tooltip-container">';
      html += '<div class="tooltip-row">';
        html += '<p class="tooltip-value">' + 'Oct $2,267,000' + '</p>';
      html += '</div>';
    html += '</div>';
    return (html);
  },
  render: function() {
    var tableData = [
      {
        'Valor de Avalúo': '$2,794,000',
        'Tipo': 'Departamento en condominio',
        'Recámaras': '2',
        'Baños': '2',
        'Estacionamientos': '1',
        'Construcción m²': '74',
        'Edad': '10'
      },
      {
        'Valor de Avalúo': '$2,794,000',
        'Tipo': 'Departamento en condominio',
        'Recámaras': '2',
        'Baños': '2',
        'Estacionamientos': '1',
        'Construcción m²': '74',
        'Edad': '10'
      },
      {
        'Valor de Avalúo': '$2,794,000',
        'Tipo': 'Departamento en condominio',
        'Recámaras': '2',
        'Baños': '2',
        'Estacionamientos': '1',
        'Construcción m²': '74',
        'Edad': '10'
      },
      {
        'Valor de Avalúo': '$2,794,000',
        'Tipo': 'Departamento en condominio',
        'Recámaras': '2',
        'Baños': '2',
        'Estacionamientos': '1',
        'Construcción m²': '74',
        'Edad': '10'
      },
      {
        'Valor de Avalúo': '$2,794,000',
        'Tipo': 'Departamento en condominio',
        'Recámaras': '2',
        'Baños': '2',
        'Estacionamientos': '1',
        'Construcción m²': '74',
        'Edad': '10'
      },
      {
        'Valor de Avalúo': '$2,794,000',
        'Tipo': 'Departamento en condominio',
        'Recámaras': '2',
        'Baños': '2',
        'Estacionamientos': '1',
        'Construcción m²': '74',
        'Edad': '10'
      },
      {
        'Valor de Avalúo': '$2,794,000',
        'Tipo': 'Departamento en condominio',
        'Recámaras': '2',
        'Baños': '2',
        'Estacionamientos': '1',
        'Construcción m²': '74',
        'Edad': '10'
      },
      {
        'Valor de Avalúo': '$2,794,000',
        'Tipo': 'Departamento en condominio',
        'Recámaras': '2',
        'Baños': '2',
        'Estacionamientos': '1',
        'Construcción m²': '74',
        'Edad': '10'
      }
    ];

    var borderRight = {
      borderRight: '2px solid #1394BC'
    };

    return (
      <div>
        <header>
          <MainNavbar
            width={'100%'}>
              <h3>Principal bar</h3>
          </MainNavbar>
          <SecondaryNavbar
            width={'100%'}>
              <h3>Secundario bar</h3>
          </SecondaryNavbar>
        </header>
        <div className={'row block-container'}>
          <div style={borderRight} className={'col-sm-6'}>
            <ViviendaInfo />
          </div>
          <div className={'col-sm-6'}>
            <ColoniaInfo />
          </div>
        </div>
        <div className={'row block-container'}>
          <div style={borderRight} className={'col-sm-6'}>
            <div className={'row'}>
              <div className={'col-sm-9'}>
                <LineChart
                  tooltipFormat={this._tooltipLineFormat}
                  height={250}
                  idContainer={'line-chart'}
                />
              </div>
              <div style={{marginTop: '75px'}} className={'col-sm-3'}>
                <p className={'primary-price'}>{'5.3%'}</p>
                <p className={'subtitle'}>apreciación anual</p>
              </div>
            </div>
          </div>
          <div className={'col-sm-6'}>
            <BarChart
              tooltipFormat={this._tooltipBarFormat}
              color={'#DDDDDD'}
              hoverColor={'#1394BC'}
              height={178}
              idContainer={'bar-chart'} />
            <PrecioDistribucion />
          </div>
        </div>
        <div className={'row block-container'}>
          <div style={borderRight} className={'col-sm-4'}>
            <OfertaDisponible />
          </div>
          <div className={'col-sm-8'}>
            <StackedBarChart
              title={'Distribución de Tipología'}
              height={230}
              idContainer={'stacked-chart'}
            />
          </div>
        </div>
        <div className={'row block-container'}>
          <div className={'col-sm-12'} style={{marginBottom: '30px'}}>
            <h4>Comparables</h4>
            <Table
              specificClass={'mercado-table  table-hover'}
              data={tableData}
              />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Page;
