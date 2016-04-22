// Libraries
import React    from 'react';
import ReactDOM from 'react-dom';
import _        from 'lodash';

// Components
import Table from     '../../components/Table';
import Spinner from   '../../components/Spinner';

// Helpers
import Helpers from '../../helpers';
import { connect } from 'react-redux';
import { fetchColoniasComparables, onSelectComparativoColonias } from '../../actions/report_actions';
import { formatComparativoColonias } from '../../data_formatters';

class ComparativoColonias extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _highlightRow(id) {
    let rows = $(ReactDOM.findDOMNode(this)).find('tr');

    rows.each(function(index) {
      if (id && $(this).data('id') == id) {
        if ($(this).attr('class')) {
          $(this).removeClass('active-row');
        } else {
          $(this).addClass('active-row');
        }
      } else {
        $(this).removeClass('active-row');
      }
    });
  }

  _onMouseoverColoniaTable(colonia) {
    this.props.onSelectComparativoColonias(colonia.id);
  }

  componentWillMount() {
    this.props.fetchColoniasComparables(this.props.colonia);
  }

  componentWillUpdate(nextProps, nextState) {
    if (!_.isEqual(nextProps.selectedPolygon, this.props.selectedPolygon)) {
      this._highlightRow(nextProps.selectedPolygon);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.colonia, this.props.colonia)) {
      this.props.fetchColoniasComparables(this.props.colonia);
    }
  }

  render() {
    let content = <Spinner style={{height: '300px'}}/>;

    if (this.props.coloniasComparables) {
      let data = formatComparativoColonias(this.props.coloniasComparables, this.props.colonia);
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
                  onMouseoverRow={this._onMouseoverColoniaTable.bind(this)}
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
  let toProps = {
    colonia: state.report.urlParams.colonia
  };

  if (state.report.coloniasComparables.length) {
    toProps.coloniasComparables = state.report.coloniasComparables;
    toProps.selectedPolygon = state.report.selectedPolygon;
  }

  return toProps;
}

export default connect(
  mapStateToProps,
  { fetchColoniasComparables, onSelectComparativoColonias })(ComparativoColonias);
