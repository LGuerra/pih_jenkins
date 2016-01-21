import React from 'react';

import Table from '../../components/Table';

var tableData = [
  {
    'Precio de oferta': '$10,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Área construida': '74',
    'Edad': '10'
  },
  {
    'Precio de oferta': '$11,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Área construida': '74',
    'Edad': '10'
  },
  {
    'Precio de oferta': '$12,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Área construida': '74',
    'Edad': '10'
  },
  {
    'Precio de oferta': '$13,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Área construida': '74',
    'Edad': '10'
  },
  {
    'Precio de oferta': '$14,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Área construida': '74',
    'Edad': '10'
  },
  {
    'Precio de oferta': '$15,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Área construida': '74',
    'Edad': '10'
  },
  {
    'Precio de oferta': '$16,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Área construida': '74',
    'Edad': '10'
  },
  {
    'Precio de oferta': '$17,000',
    'Valor de Avalúo': '$2,794,000',
    'Recámaras': '2',
    'Baños': '2',
    'Estacionamientos': '1',
    'Área construida': '74',
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