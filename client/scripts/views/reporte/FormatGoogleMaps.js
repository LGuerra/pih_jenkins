// Vendor
import React from 'react';

// Components
import GoogleMap from   '../../components/GoogleMap';
import Marker from      '../../components/Marker';

class FormatGoogleMaps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latlon: null
    };

    this.highlightFeature = this.highlightFeature.bind(this);
    this._getMap = this._getMap.bind(this);
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
    return (this.refs.map);
  }

  _getXYFromCentroid(lat, lon) {
    let map = this.refs.map.mapRef;

    // Projection variables.
    let projection = map.getProjection();
    let topRight = projection.fromLatLngToPoint(map.getBounds().getNorthEast());
    let bottomLeft = projection.fromLatLngToPoint(map.getBounds().getSouthWest());
    let scale = Math.pow(2, map.getZoom());

    let point = projection.fromLatLngToPoint(new google.maps.LatLng(lat, lon))

    return {
      x: (point.x - bottomLeft.x) * scale,
      y: (point.y - topRight.y) * scale
    };
  }

  componentDidMount() {
    let map = this.refs.map.mapRef;
    let apigClient = apigClientFactory.newClient();

    // Get actual Geojson polygon
    apigClient.suburbGeojsonGet({
      id_col: this.props.zoneID
    }, {},  {
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
      }).then((geojsonR) => {
      map.data.addGeoJson({
        type: 'Feature',
        geometry: geojsonR.data,
        properties: {
          id: this.props.zoneID,
          current: true
        }
      });
    });

    // Get centroid
    apigClient.suburbCentroidGet({
      id_col: this.props.zoneID
    }, {}, {}).then((suburbCentroidR) => {
      this.setState({
        centroid: {lat: suburbCentroidR.data.lng, lng: suburbCentroidR.data.lat}
      }, () => {
        map.setCenter({lat: suburbCentroidR.data.lng, lng: suburbCentroidR.data.lat});
      })
    });

    // Get adjacet Geojson polygon
    apigClient.suburbAdjacentSuburbsGet({
      id_col: this.props.zoneID
    }, {}, {})
    .then((abjacentsR) => { return abjacentsR.data })
    .then((data) => {
      apigClient.suburbsGeojsonsGet({
        id_cols: data.toString()
      }, {}, {})
      .then((suburbsGeoR) => {
        suburbsGeoR.data.forEach((colonia, index) => {
          if(colonia.geojson.properties.id !== this.props.zoneID) {
            map.data.addGeoJson({
              type: 'Feature',
              geometry: {
                coordinates: colonia.geojson.coordinates,
                type: colonia.geojson.type
              },
              properties: colonia.geojson.properties
            });
          }
        });
      });
    });

    map.data.addListener('mouseover', (event) => {
      this.highlightFeature(event.feature.getProperty('id'));
      this.props.onMouseoverFeature(event.feature.getProperty('id'));

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
          left: centroid.x + 15 - ($('#map-tooltip').width() / 2),
          top: (centroid.y - ($('#map-tooltip').height() / 2) - 21)
        });
      }

      if (!event.feature.getProperty('current')) {
        html = getHTML(event.feature.getProperty('name'));
      } else {
        html = getHTML(this.props.coloniaName);
      }

      $('#map-tooltip').css({
        display: 'block'
      })
      .html(html);

      if (event.feature.getProperty('current')) {
        positionTooltip(this.state.centroid.lat, this.state.centroid.lng)
      } else {
        positionTooltip(event.feature.getProperty('lat'), event.feature.getProperty('lng'))
      }
    });

    map.data.addListener('mouseout', (event) => {
      this.highlightFeature();
      this.props.onMouseoverFeature(event.feature.getProperty('id'));
    });

    map.data.addListener('click', (event) => {
      if (!event.feature.getProperty('current')) {
        let templateUrl = ('/reporte?colonia=:colonia:&tipo=:reportType:')
          .replace(':colonia:', event.feature.getProperty('id'))
          .replace(':reportType:', 'Colonia');
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

  render() {
    let marker;

    if (this.props.viewType === 'Vivienda') {
      marker = (
        <Marker
          latitud={this.props.viviendaInfo.lat}
          longitud={this.props.viviendaInfo.lng}
          getMap={this._getMap}
          color={'red'}/>
      );
    }

    return (
      <div>
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

export default FormatGoogleMaps;
