// Vendor
import React  from 'react';
import _      from 'lodash';

// Components
import GoogleMap from   '../../components/GoogleMap';
import Marker from      '../../components/Marker';

import { suburbAPI, suburbsAPI } from './../../api/api-helper.js';

// Helpers
import Helpers from '../../helpers';
import { connect } from 'react-redux';
import { fetchColoniasMap, fetchCentroid, fetchActualColoniaMap, onSelectPolygon } from '../../actions/report_actions';

class FormatGoogleMaps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latlon: null
    };

    this.highlightFeature = this.highlightFeature.bind(this);
  }

  highlightFeature(id) {
    let map = this.refs.map.mapRef;

    if (id) {
      map.data.setStyle(function(feature) {
        let fillColor = feature.getProperty('current') ? '#353535' : '#9a9a9a';
        if (feature.getProperty('id') === id) {
          return {
            fillColor: '#2a9998',
            strokeWeight: 1.5
          };
        } else {
          return {
            fillColor: fillColor,
            strokeWeight: 1.5
          };
        }
      });
    } else {
      map.data.setStyle(function(feature) {
        let fillColor = feature.getProperty('current') ? '#353535' : '#9a9a9a';
        return {
          fillColor: fillColor,
          strokeWeight: 1.5
        };
      });
    }
  }

  _getMap() {
    return this.refs.map;
  }

  _getXYFromCentroid(lat, lon) {
    let map = this.refs.map.mapRef;

    // Projection variables.
    let projection = map.getProjection();
    let topRight = projection.fromLatLngToPoint(map.getBounds().getNorthEast());
    let bottomLeft = projection.fromLatLngToPoint(map.getBounds().getSouthWest());
    let scale = Math.pow(2, map.getZoom());

    let point = projection.fromLatLngToPoint(new google.maps.LatLng(lat, lon));
    let isInside = {
      x: (point.x <= topRight.x) && (point.x >= bottomLeft.x),
      y: (point.y >= topRight.y) && (point.y <= bottomLeft.y)
    };

    return {
      x: (point.x - bottomLeft.x) * scale,
      y: (point.y - topRight.y) * scale,
      isInside: (isInside.x) && (isInside.y)
    };
  }

  componentDidMount() {
    this.props.fetchColoniasMap(this.props.zoneID);
    this.props.fetchCentroid(this.props.zoneID);
    this.props.fetchActualColoniaMap(this.props.zoneID);

    let map = this.refs.map.mapRef;

    map.data.addListener('mouseover', (event) => {
      this.highlightFeature(event.feature.getProperty('id'));
      this.props.onSelectPolygon(event.feature.getProperty('id'));

      let html;
      let getHTML = (value) => {
        return (
        `<div class="TooltipContainer">
            <div class="Tooltip-triangle"></div>
            <div class="Tooltip-triangle-border"></div>
            <p class="Tooltip-title">${value}</p>
          </div>
        `);
      }

      let positionTooltip = (lat, lng) => {
        let centroid = this._getXYFromCentroid(lat, lng);

        $('#map-tooltip').css({
          left: centroid.x - ($('#map-tooltip').width() / 2),
          top: (centroid.y - ($('#map-tooltip').height() / 2) - 11),
          display: centroid.isInside ? 'block': 'none'
        });
      }

      if (!event.feature.getProperty('current')) {
        html = getHTML(event.feature.getProperty('name'));
      } else {
        html = getHTML(this.props.coloniaName);
      }

      $('#map-tooltip')
        .html(html);

      if (event.feature.getProperty('current')) {
        positionTooltip(this.props.centroid.lng, this.props.centroid.lat)
      } else {
        positionTooltip(event.feature.getProperty('lat'), event.feature.getProperty('lng'))
      }
    });

    map.data.addListener('mouseout', (event) => {
      this.highlightFeature();
      this.props.onSelectPolygon();
    });

    map.data.addListener('click', (event) => {
      if (!event.feature.getProperty('current')) {
        let templateUrl = (`/reporte?colonia=${event.feature.getProperty('id')}&tipo=Colonia`)
        window.open(templateUrl, '_self')
      }
    });

    map.addListener('mousemove', () => {
      $('#map-tooltip').css({
        display: 'none'
      });
    });
    map.addListener('drag', () => {
      $('#map-tooltip').css({
        display: 'none'
      });
    });

    this.highlightFeature();
  }

  _drawPolygons(data) {
    let map = this.refs.map.mapRef;

    data.forEach((colonia, index) => {
      if(colonia.properties.id !== this.props.zoneID) {
        map.data.addGeoJson({
          type: 'Feature',
          geometry: {
            coordinates: colonia.coordinates,
            type: colonia.type
          },
          properties: colonia.properties
        });
      }
    });
  }

  _positionMapByCentroid(centroid) {
    let map = this.refs.map.mapRef;

    map.setCenter({lat: centroid.lng, lng: centroid.lat});
  }

  _drawActualPolygon(data) {
    let map = this.refs.map.mapRef;

    map.data.addGeoJson({
      type: 'Feature',
      geometry: data,
      properties: {
        id: this.props.zoneID,
        current: true
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (!_.isEqual(nextProps.colPolygons, this.props.colPolygons)) {
      this._drawPolygons(nextProps.colPolygons);
    }

    if (!_.isEqual(nextProps.centroid, this.props.centroid)) {
      this._positionMapByCentroid(nextProps.centroid);
    }

    if (!_.isEqual(nextProps.actualColoniaMap, this.props.actualColoniaMap)) {
      this._drawActualPolygon(nextProps.actualColoniaMap);
    }

    if (!_.isEqual(nextProps.selectedComparativoColonias, this.props.selectedComparativoColonias)) {
      this.highlightFeature(nextProps.selectedComparativoColonias)
    }
  }

  render() {
    let marker;

    if (this.props.viewType === 'Vivienda') {
      marker = (
        <Marker
          latitud={this.props.viviendaInfo.lat}
          longitud={this.props.viviendaInfo.lng}
          getMap={this._getMap.bind(this)}
          color={'red'}/>
      );
    }

    return (
      <div style={{position: 'relative'}}>
        <GoogleMap
          latitud={19.2837698}
          longitud={-99.1839327}
          zoom={[14, 5, 21]}
          style={{
            width: '100%',
            height: '400px'
          }}
          ref='map'
          zoomTop={10} />
        {marker}
        <div className={'MapTooltip noselect'} id={'map-tooltip'}>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let coloniaName = state.report.coloniaInfo.length
    ? state.report.coloniaInfo[2].nombre
    : '';

  return {
    coloniaName: coloniaName,
    selectedComparativoColonias: state.report.selectedComparativoColonias,
    actualColoniaMap: state.report.actualColoniaMap,
    colPolygons: state.report.coloniasMap,
    centroid: state.report.centroid
  }
}

export default connect(
  mapStateToProps,
  { fetchColoniasMap, fetchCentroid, fetchActualColoniaMap, onSelectPolygon })(FormatGoogleMaps);