import React from 'react';

import Table from '../../components/Table';

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

class ComparativoViviendas extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3 className={'section-title'}>Viviendas comparables</h3>
        <hr width={'100px'} className={'section-title-hr'}/>
        <Table
          specificClass={'mercado-table table-hover'}
          data={tableData} />
      </div>
    );
  }
}

export default ComparativoViviendas;