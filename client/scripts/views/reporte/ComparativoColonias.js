import React from     'react';
import ReactDOM from  'react-dom';

import Table from '../../components/Table';

var tableData1 = [
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%',
    'id': 0
  },
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%',
    'id': 1
  },
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%',
    'id': 2
  },
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%',
    'id': 3
  },
  {
    'Colonia': 'Anzures',
    'Precio m²': '$15,000',
    'Viviendas ofertadas': '250',
    'Apreciación prom.': '5.6%',
    'id': 4
  }
]

class ComparativoColonias extends React.Component {
  constructor(props) {
    super(props);
  }
  highlightRow(id) {
    var rows = $(ReactDOM.findDOMNode(this)).find('tr');
    rows.each(function(index) {
      if ($(this).data('id') === id) {
        if ($(this).attr('class')) {
          $(this).removeClass('active-row')
        } else {
          $(this).addClass('active-row')
        }
      }
    });
  }
  render() {
    return (
      <div>
        <h3 className={'section-title'}>Colonias colindantes</h3>
        <hr width={'100px'} className={'section-title-hr'}/>
        <div className={'row'}>
          <div className={'col-md-6 col-sm-12'}>
            <Table
              idField={'id'}
              onMouseoverRow={this.props.onMouseover}
              specificClass={'mercado-table table-hover'}
              data={tableData1} />
          </div>
          <div className={'col-md-6 col-sm-12'}>
            <Table
              idField={'id'}
              onMouseoverRow={this.props.onMouseover}
              specificClass={'mercado-table table-hover'}
              data={tableData1} />
          </div>
        </div>
      </div>
    );
  }
}

export default ComparativoColonias;