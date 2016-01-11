import React from 'react';

import Table from '../../components/Table';

var tableData1 = [
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%'
  },
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%'
  },
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%'
  },
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%'
  },
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%'
  }
]

class ComparativoColonias extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3 className={'section-title'}>Colonias colindantes</h3>
        <hr width={'100px'} className={'section-title-hr'}/>
        <div className={'row'}>
          <div className={'col-md-6 col-sm-12'}>
            <Table
              specificClass={'mercado-table table-hover'}
              data={tableData1} />
          </div>
          <div className={'col-md-6 col-sm-12'}>
            <Table
              specificClass={'mercado-table table-hover'}
              data={tableData1} />
          </div>
        </div>
      </div>
    );
  }
}

export default ComparativoColonias;