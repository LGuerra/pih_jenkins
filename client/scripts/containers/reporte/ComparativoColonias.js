// Libraries
import React from     'react';
import ReactDOM from  'react-dom';

// Components
import Table from     '../../components/Table';
import Spinner from   '../../components/Spinner';

// Helpers
import Helpers from '../../helpers';
import { connect } from 'react-redux';
import { fetchColoniasComparables } from '../../actions/report_actions';

class ComparativoColonias extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  componentWillMount() {
    this.props.fetchColoniasComparables(this.props.zoneID);
  }

  render() {
    let content = <Spinner style={{height: '300px'}}/>;

    if (this.props.coloniasComparables) {
      let data = this._formatData(this.props.coloniasComparables);
      if (data.rows[0]) {
        content = (
          <div>
            <h3 className={'SectionTitle'}>Colonias colindantes<img width={'5px'} style={{marginBottom: '10px', marginLeft: '3px'}}src={IMAGES.asterisk} /></h3>
            <div className={'LineDivider'}></div>
            <div className={'row'}>
              <div className={'col-md-12 col-sm-12'} style={{padding: '0px'}}>
                <Table
                  remarcableRow={[0]}
                  idField={'id'}
                  onMouseoverRow={this.props.onMouseover}
                  specificClass={'ReporteTable table-hover'}
                  data={data.rows} />
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
    }

    return (content);
  }
}

function mapStateToProps(state) {
  if (state.report.coloniasComparables.length) {
    return {
      coloniasComparables: state.report.coloniasComparables
    }
  }

  return {};
}

export default connect(mapStateToProps, { fetchColoniasComparables })(ComparativoColonias);
