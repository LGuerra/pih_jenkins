import React from 'react';

import Table from '../../components/Table';

var tableData = [
  {
    'Precio por m²': '$10,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Construcción m²': '74',
    'Edad': '10'
  },
  {
    'Precio por m²': '$11,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Construcción m²': '74',
    'Edad': '10'
  },
  {
    'Precio por m²': '$12,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Construcción m²': '74',
    'Edad': '10'
  },
  {
    'Precio por m²': '$13,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Construcción m²': '74',
    'Edad': '10'
  },
  {
    'Precio por m²': '$14,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Construcción m²': '74',
    'Edad': '10'
  },
  {
    'Precio por m²': '$15,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Construcción m²': '74',
    'Edad': '10'
  },
  {
    'Precio por m²': '$16,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Construcción m²': '74',
    'Edad': '10'
  },
  {
    'Precio por m²': '$17,000',
    'Valor de Avalúo': '$2,794,000',
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
        <h3 className={'section-title'}>{'Departamentos comparables'}</h3>
        <div className={'line-divider'}></div>
        <p className={'subtitle'}> en los últimos 6 meses</p>
        <Table
          limit={5}
          specificClass={'mercado-table table-hover'}
          data={tableData} />
      </div>
    );
  }
}

export default ComparativoViviendas;