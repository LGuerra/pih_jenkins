import React from     'react';
import ReactDOM from  'react-dom';

import Table from '../../components/Table';

import Helpers from '../../helpers';

class ComparativoColonias extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  highlightRow(id) {
    let rows = $(ReactDOM.findDOMNode(this)).find('tr');

    rows.each(function(index) {
      if ($(this).data('id') == id) {
        if ($(this).attr('class')) {
          $(this).removeClass('active-row')
        } else {
          $(this).addClass('active-row')
        }
      }
    });
  }

  _formatData(data) {
    let currentIndex;
    let formattedData = data.map((element, index) => {
      if (element.colonia === this.props.zoneID) {
        currentIndex = index;
      }
      return ({
        'Colonia': element.nombre,
        'Precio m²': Helpers.formatAsPrice(element.average),
        'Viviendas ofertadas': element.count,
        'id': element.colonia
      });
    });

    let current = formattedData.splice(currentIndex, 1)[0];
    formattedData.unshift(current);

    let headers = Object.keys(formattedData[0]);
    headers.pop();

    return ({
      headers: headers,
      rows: formattedData
    });
  }

  componentDidMount() {
    let apigClient = apigClientFactory.newClient();

    apigClient.suburbAdjacentSuburbsGet({
      id_col: this.props.zoneID
    }, {}, {})
    .then((abjacentsR) => { return (abjacentsR.data); })
    .then((data) => {
      apigClient.suburbsInfoGet({
        id_cols: data.toString()
      }, {}, {})
      .then((suburbsInfoR) => {
        let data = this._formatData(suburbsInfoR.data);
        if (data.rows[0]) {
          this.setState({
            data: data
          });
        } else {
          this.setState({
            data: {
              rows: []
            }
          });
        }
      });
    });
  }

  render() {
    let content;

    if (this.state.data) {
      if (this.state.data.rows[0]) {
        content = (
          <div>
            <h3 className={'section-title'}>Colonias colindantes<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h3>
            <div className={'line-divider'}></div>
            <div className={'row'}>
              <div className={'col-md-12 col-sm-12'} style={{padding: '0px'}}>
                <Table
                  remarcableRow={[0]}
                  idField={'id'}
                  onMouseoverRow={this.props.onMouseover}
                  specificClass={'mercado-table table-hover'}
                  data={this.state.data.rows} />
              </div>
            </div>
          </div>
        );
      } else {
        content = (
          <h4 style={{textAlign: 'center'}}>
            {'No hay viviendas de confianza aledañas a la colonia'}
          </h4>
        );
      }
    } else {
      content = (
        <h4 style={{textAlign: 'center'}}>
          {'No hay viviendas de confianza aledañas a la colonia'}
        </h4>
      );
    }
    return (
      content
    );
  }
}

export default ComparativoColonias;