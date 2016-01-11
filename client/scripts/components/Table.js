import React from 'react';
import d3 from 'd3';
import _ from 'lodash'

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: props.limit
    }
  }
  _onToggle() {
    if (this.state.limit === 0) {
      this.setState({
        limit: this.props.limit
      });
    } else {
      this.setState({
        limit: 0
      });
    }
  }
  render () {
    var data = this.props.data;
    var keys = Object.keys(data[0]);
    var tdArray;
    var limit = this.state.limit;
    var verMasControl;

    if (this.props.sortBy) {
      data = _.sortBy(data, this.props.sortBy.field);
      data = this.props.sortBy.reverse ? data.reverse() : data;
    }

    var titles = keys.map(function(element, index) {
      if (element !== 'empty') {
        return (<th key={'title-' + element}>{element}</th>);
      } else {
        return (<th key={'title-' + element}></th>);
      }
    });

    var rows = data.map(function(element, index) {
      tdArray = [];
      for (let k in element) {
        tdArray.push(<td key={'td-' + (element[k] +  k)}>{element[k]}</td>);
      }

      if (!limit || index < limit) {
        return (
          <tr key={'row-' + index}>{tdArray}</tr>
        );
      }
    });

    if (limit || limit == 0) {
      let label = 'Ver +';
      if (limit == 0) {
        label = 'Ver -';
      }
      verMasControl = (
        <div style={{cursor: 'pointer'}} onClick={this._onToggle.bind(this)}>
          <h5 style={{textAlign: 'center'}}>{label}</h5>
        </div>
      )
    }

    return (
    <div className={'table-container'}>
      <table className={this.props.specificClass}>
        <thead>
          <tr>
            {titles}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      {verMasControl}
    </div>
    );
  }
}

export default Table;