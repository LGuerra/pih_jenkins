import React from 'react';
import __sortBy from 'lodash/collection/sortBy';

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
    let _this = this;
    let data = this.props.data;
    let keys = Object.keys(data[0]);
    let tdArray;
    let limit = this.state.limit;
    let verMasControl;

    if (this.props.sortBy) {
      data = __sortBy(data, this.props.sortBy.field);
      data = this.props.sortBy.reverse ? data.reverse() : data;
    }

    let titles = keys.map(function(element, index) {
      if (element !== 'empty' && (_this.props.idField !== element || _this.props.idFieldVisible)) {
        return (<th key={'title-' + element}>{element}</th>);
      } else {
        return (<th key={'title-' + element}></th>);
      }
    });

    let rows = data.map(function(element, index) {
      tdArray = [];
      let style;


      for (let k in element) {
        if ((k !== _this.props.idField || _this.props.idFieldVisible)) {
          tdArray.push(<td key={'td-' + (element[k] +  k)}>{element[k]}</td>);
        }
      }
      if (_this.props.remarcableRow && ($.inArray(index, _this.props.remarcableRow) !== -1)) {
        style = {
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5'
        };
      }

      if (!limit || index < limit) {
        if (_this.props.onMouseoverRow) {
          return (
            <tr
              style={style}
              data-id={element[_this.props.idField]}
              onMouseOut={_this.props.onMouseoverRow.bind(_this, {id: null})}
              onMouseOver={_this.props.onMouseoverRow.bind(_this, element)}
              key={'row-' + index}>
              {tdArray}
            </tr>
          );
        } else {
          return (
            <tr
              style={style}
              data-id={element[_this.props.idField]}
              dkey={'row-' + index}
              key={'row-' + index}>
              {tdArray}
            </tr>
          );
        }
      }
    });
    const IMAGES = {
      plus: require('file!images-banca/plus.svg'),
      less: require('file!images-banca/less.svg')
    };
    if (limit || limit == 0) {
      let label = <p style={{marginTop:'25px'}}><img src={IMAGES.plus} width={'15px'}></img><span> comparables</span></p>;
      if (limit == 0) {
        label = <p style={{marginTop:'25px'}}><img src={IMAGES.less} width={'15px'}></img><span> comparables</span></p>;
      }
      verMasControl = (
        <div style={{cursor: 'pointer'}} onClick={this._onToggle.bind(this)}>
          <h5 style={{textAlign: 'center', color: '#9c9c9c', fontWeight: 'normal'}}>{label}</h5>
        </div>
      )
    }

    return (
    <div className={'TableContainer'}>
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
