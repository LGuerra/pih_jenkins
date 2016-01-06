import React from 'react';
import d3 from 'd3';
import _ from 'lodash'

var Table = React.createClass({
  render: function() {
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
      for (var k in element) {
        tdArray.push(<td key={'td-' + (element[k] +  k)}>{element[k]}</td>);
      }

      return (
        <tr key={'row-' + index}>{tdArray}</tr>
      );
    });

    return (
    <table className={this.props.specificClass}>
      <thead>
        {titles}
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
    );
  }
});

export default Table;