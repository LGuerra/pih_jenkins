import React from 'react';
import _ from 'lodash';

class Marker extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    let props = this.props;
    let map = this.props.getMap().mapRef;

    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(props.latitud, props.longitud),
      draggable: false
    });

    marker.setIcon({
      url: IMAGES['pin_' + props.color],
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
/*
var Marker = React.createClass(function() {
  function newPosition(lat, lon) {
    return new google.maps.LatLng(lat, lon);
  }

  function setMarkerColor(marker, color) {
    marker.setIcon({
      url: IMAGES['pin_' + color],
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34)
    });
  }

  function getMap(map) {
    return _.isFunction(map) ? map() : map;
  }

  function markerFactory(options) {
    var marker = new google.maps.Marker({
      map: getMap(options.map),
      position: newPosition(options.latitud, options.longitud),
      draggable: options.draggable
    });
    setMarkerColor(marker, options.color);
    google.maps.event.addListener(marker, 'dragend', function(e) {
      var latLng   = e.latLng;
      var latitud  = latLng.lat();
      var longitud = latLng.lng();
    });

    return marker;
  }

  return {
    getDefaultProps: function() {
      return {
        draggable: false,
        onDrag: undefined,
        color: 'red',
        activeColor: undefined
      };
    },
    activate: function() {
      this.changeColor(this.props.activeColor);
    },
    deactivate: function() {
      this.changeColor(this.props.color);
    },
    componentDidMount: function() {
      var props = this.props;
      this.marker = markerFactory(this.props);
      if (!_.isUndefined(this.props.activeColor)) {
        this.addCallback('click', this.activate)
        .addCallback('mouseover', this.activate)
        .addCallback('mouseout', this.deactivate);
      }
    },
    componentWillReceiveProps: function(nextProps) {
      this.marker.setPosition(
        new google.maps.LatLng(nextProps.latitud, nextProps.longitud)
      );
    },
    addCallback: function(callbackName, callback) {
      google.maps.event.addListener(this.marker, callbackName, callback);
      return this;
    },
    changeColor: function(color) {
      setMarkerColor(this.marker, color);
    },
    render: _.constant(false)
  };
}());

*/