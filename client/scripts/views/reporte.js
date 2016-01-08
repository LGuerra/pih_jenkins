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
      borderRight: '1px solid #c9c9c9'
    };

    return (
      <div className={'noselect'}>
        <header>
          <MainNavbar
            width={'100%'}>
              <img height={'30px'} style={{margin: '7px 10px'}} src={IMAGES.santander} />
              <img height={'30px'} style={{margin: '7px 10px'}} src={IMAGES.intelimetrica} />
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
          <h3 className={'section-title'}>{'Información de la colonia Anzures'}</h3>
          <hr width={'100px'} className={'section-title-hr'}/>
          <div className={'row block-container'}>
            <div style={borderRight} className={'col-sm-6'}>
              <h4 className={'subsection-title'}>Precio Histórico Enero 2010 - Enero 2015</h4>
              <div className={'row'}>
                <div className={'col-sm-9'}>
                  <FormatLineChart/>
                </div>
                <div className={'col-sm-3 apariencia-anual'}>
                  <p className={'primary-price'}>{'5.3%'}</p>
                  <p className={'subtitle'}>apreciación anual</p>
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
            <h3 className={'section-title'}>Viviendas Comparables</h3>
            <hr width={'100px'} className={'section-title-hr'}/>
            <Table
              specificClass={'mercado-table table-hover'}
              data={tableData}
              />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Page;
