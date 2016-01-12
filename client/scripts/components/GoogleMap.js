import React from 'react';
import _ from 'lodash';

import ReactDOM from 'react-dom';
import MapUtils from '../map_utils';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
  }
  getZoomObject() {
    var zoom = this.props.zoom;
    if (!_.isArray(zoom)) {
      return {zoom: zoom};
    } else if (zoom.length < 3) {
      return {zoom: zoom[0], maxZoom: zoom[1]};
    } else {
      return {zoom: zoom[0], minZoom: zoom[1], maxZoom: zoom[2]};
    }
  }
  componentDidMount() {
    var props = this.props;
    var lat = props.latitud;
    var lon = props.longitud;
    var zoom = props.zoom;
    var addListener;

    var mapOptions = {
      center: new google.maps.LatLng(lat, lon),
      styles: MapUtils.styles,
      disableDefaultUI: true,
      scrollwheel: false
    };
    var zoomDiv = document.createElement('div');
    var drawToolDiv = document.createElement('div');
    var zoomControls = null;
    var drawControls = null;
    var drawingManager =  new google.maps.drawing.DrawingManager(MapUtils.drawing_manager);
    _.extend(mapOptions, this.getZoomObject());
    this.polygon = {is_active: false};
    var zoomTop = props.zoomTop || 0;
    var zoomRight = props.zoomRight || 0;

    // Create map reference
    this.mapRef = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);
    addListener = _.partial(google.maps.event.addListener, this.mapRef);

    // Set drawing manager
    drawingManager.setDrawingMode(null);
    drawingManager.setMap(this.mapRef);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygonElement) {
      if (this.polygon.is_active) {
        this.polygon = polygonElement;
        this.polygon.setMap(null);
        return;
      }

      this.polygon = polygonElement;
      var path = getPathAsParameter(polygonElement);
      props.onLocationChange({poly:path});
      drawingManager.setDrawingMode(null);
      this.polygon.is_active = true;
    }.bind(this));

    zoomControls = new MapUtils.ZoomControl(zoomDiv, this.mapRef, zoomTop, zoomRight);
    zoomDiv.index = 1;

    // Add event listener
    if (_.isFunction(props.onLocationChange)) {
      addListener('idle', function() {
        var center = this.mapRef.getCenter();
        var zoom = this.mapRef.getZoom();
        props.onLocationChange({
          zoom: zoom,
          latitud: center.lat(),
          longitud: center.lng()
        });
      }.bind(this));
    }

    // Draw google maps polygon if props poly exists
    if (props.poly !== null) {
      this.polygon = addPolygon(this.mapRef, unescape(props.poly));
    }

    var _this = this;

    // Setup custom drawing controls
    drawControls = new MapUtils.DrawingTool({
      node: drawToolDiv,
      manager: drawingManager,
      removalListener: 'removeAll',
      removePolygon: function() {
        if (_this.polygon === null ||
          _this.polygon === undefined ||
          !_this.polygon.is_active) {
          return;
        }

        _this.polygon.is_active = false;
        _this.props.onLocationChange({poly: null});
        _this.polygon.setMap(null);
      },
      getPolyState: function() {
        return _this.polygon.is_active;
      },
      setPolyState: function(active) {
        _this.polygon.is_active = active;
      }
    });
    drawToolDiv.index = 1;

    this.mapRef.controls[google.maps.ControlPosition.RIGHT_TOP].push(zoomDiv);
    if (props.withPolygon) {
      this.mapRef.controls[google.maps.ControlPosition.TOP_RIGHT].push(drawToolDiv);
    }

    // Add event listeners
    function locationChange() {
      var center = this.mapRef.getCenter();
      var zoom = this.mapRef.getZoom();
      props.onLocationChange({
        zoom: zoom,
        latitud: center.lat(),
        longitud: center.lng()
      });
    }

    // Polygon functions
    function addPolygon(map, polyValue) {
      var polyLatLngArr = parsePolyValues(polyValue);
      var target =  _.extend({}, drawingManager.polygonOptions, {paths:polyLatLngArr});
      var _polygon = new google.maps.Polygon(target);
      _polygon.setMap(map);
      _polygon.is_active = true;
      return _polygon;
    }

    function parsePolyValues(polyValues) {
      var polygonArrayPoints = polyValues.split(':');
      return _.map(polygonArrayPoints, function(str) {
        return stringToLatLng(str);
      });
    }

    function stringToLatLng(value) {
      var latLngStr = value.split(',');
      return new google.maps.LatLng(latLngStr[1],latLngStr[0]);
    }

    function removePolygon() {
      if (this.polygon === null || typeof this.polygon === 'undefined') {
        return;
      }

      this.polygon.is_active = false;
      props.onLocationChange({poly: null});
      this.polygon.setMap(null);
    }

    function getPathAsParameter(overlay) {
      var overlayPath = overlay.getPath().getArray();
      var parameterizedPath = _.map(overlayPath, function(point) {
        return point.lng() + ',' + point.lat();
      });

      parameterizedPath.push(overlayPath[0].lng() + ',' + overlayPath[0].lat());
      return parameterizedPath.join(':');
    }
    // End polygon functions
  }
  componentWillReceiveProps(nextProps) {
    /*
    if (this.polygon.is_active && nextProps.poly === null) {
      this.polygon.is_active = false;
      this.polygon.setMap(null);
    }
    */
  }
  shouldComponentUpdate(nextProps, nextState) {
    /*
    var abs = Math.abs;
    var lat1 = Number(this.props.latitud);
    var lng1 = Number(this.props.longitud);
    var lat2 = Number(nextProps.latitud);
    var lng2 = Number(nextProps.longitud);
    var samePosition = (abs(lat2 - lat1) / lat1 <= 0.0001) && (abs(lng2 - lng1) / lng1 <= 0.0001);
    if (this.props.style === undefined) {
      return !samePosition;
    } else {
      return this.props.style.width !== nextProps.style.width || !samePosition;
    }
    */
  }
  componentDidUpdate() {
    /*
    this.mapRef.setZoom(this.getZoomObject().zoom);
    this.mapRef.panTo(new google.maps.LatLng(this.props.latitud, this.props.longitud));
    */
  }
  redraw() {
    google.maps.event.trigger(this.mapRef, 'resize');
    this.mapRef.setCenter(new google.maps.LatLng(this.props.latitud, this.props.longitud));
  }
  render() {
    return <div style={this.props.style}></div>;
  }
}

GoogleMap.propTypes = {
  onZoomChange: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
  onLocationChange: React.PropTypes.func,
  latitud: React.PropTypes.number,
  longitud: React.PropTypes.number,

  // zoom: React.PropTypes.number, <- IMPROVE, complex prop array/number
  withPolygon: React.PropTypes.bool,
  style: React.PropTypes.object,
  zoomTop: React.PropTypes.number
}

GoogleMap.defaultProps = {
  poly: null,
  withPolygon: false
};

module.exports = GoogleMap;
