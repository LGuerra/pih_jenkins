import React from 'react';
import d3 from 'd3';
import _ from 'lodash'

class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    var data = this.props.data;
    var keys = Object.keys(data[0]);
    var tdArray;

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

      return (
        <tr key={'row-' + index}>{tdArray}</tr>
      );
    });

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
    </div>
    );
  }
}

export default Table;