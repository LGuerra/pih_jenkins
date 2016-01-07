// Vendor
import React from 'react';
import d3 from 'd3';
import _ from 'lodash';

// Components
import Table from '../components/Table';

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

class MainNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className={'navbar navbar-default'} style={{
        width: this.props.width,
        backgroundColor: this.props.bgColor
      }}>
      {this.props.children}
      </nav>
    );
  }
}

class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
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
            width={'100%'} />
          <StickyNavbar />
        </header>
        <div className={'row block-container'}>
          <div style={borderRight} className={'col-sm-6'}>
            <ViviendaInfo />
          </div>
          <div className={'col-sm-6'}>
            <ColoniaInfo />
          </div>
        </div>
        <div style={{backgroundColor: '#f2f5f9', padding: '10px', marginTop: '20px'}} className={'info-colonia'}>
          <h3 style={{marginTop: '5px', color: '#1394BC'}}>{'Información de la colonia Anzures'}</h3>
          <div className={'row block-container'}>
            <div style={borderRight} className={'col-sm-6'}>
              <div className={'row'}>
                <div className={'col-sm-9'}>
                  <FormatLineChart/>
                </div>
                <div style={{marginTop: '75px'}} className={'col-sm-3'}>
                  <p className={'primary-price'}>{'5.3%'}</p>
                  <p className={'subtitle'}>apreciación anual</p>
                </div>
              </div>
            </div>
            <div className={'col-sm-6'}>
              <FormatBarChart />
              <PrecioDistribucion />
            </div>
          </div>
          <div className={'row block-container'}>
            <div style={borderRight} className={'col-sm-4'}>
              <OfertaDisponible />
            </div>
            <div className={'col-sm-8'}>
              <FormatStackedBarChart />
            </div>
          </div>
        </div>
        <div className={'row block-container'}>
          <div className={'col-sm-12'} style={{marginBottom: '30px'}}>
            <h4>Comparables</h4>
            <Table
              specificClass={'mercado-table table-striped table-hover'}
              data={tableData}
              />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Page;
