import React from 'react';
import _ from 'lodash';

class Marker extends React.Component{
  constructor(props) {
    super(props);
  }

  _updatePosition() {
    this.marker.setPosition(new google.maps.LatLng(this.props.latitud, this.props.longitud));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.latitud !== prevProps.latitud || this.props.longitud !== prevProps.longitud) {
      this._updatePosition();
    }
  }

  componentDidMount () {
    let props = this.props;
    let map = this.props.getMap().mapRef;

    this.marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(props.latitud, props.longitud),
      draggable: false
    });
    const pinSVG = require('file!images-banca/pin_red.svg');
    this.marker.setIcon({
      url: pinSVG,
      scaledSize: new google.maps.Size(20, 27),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(10, 27)
    });
  }
  render () {
    return (<div></div>);
  }
}

export default Marker;
