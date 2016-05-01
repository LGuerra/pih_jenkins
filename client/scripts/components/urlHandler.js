import React, { Component } from 'react';
import _ from 'lodash';

class URLHandler extends Component {
  updateParams(props) {
    var acc = '?';
    var title = document.getElementsByTagName('title')[0].innerHTML;
    var encode = encodeURIComponent;
    var href = location.href;
    var baseURL = href.substring(0, href.indexOf('?'));
    var value;

    for (var prop in props) {
      value = props[prop];
      if (props.hasOwnProperty(prop) && value !== null && value !== undefined && value !== '') {
        acc = acc + prop + '=' + encode(value) + '&';
      }
    }

    window.history.replaceState(
      {},
      title,
      baseURL + acc.substring(0, acc.length - 1));
  }

  componentWillReceiveProps(newProps) {
    this.updateParams(newProps);
  }

  render() {
    return <div></div>
  }
}

export default URLHandler;
