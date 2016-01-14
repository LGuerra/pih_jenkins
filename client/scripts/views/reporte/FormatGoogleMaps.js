import React from 'react';
import GoogleMap from '../../components/GoogleMap';

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
        let fillColor = feature.getProperty('current') ? 'red' : 'blue';
        if (feature.getProperty('id') === id) {
          return {
            fillColor: 'green',
            strokeWeight: 1
          };
        } else {
          return {
            fillColor: fillColor,
            strokeWeight: 1
          };
        }
      });
    } else {
      map.data.setStyle(function(feature) {
        let fillColor = feature.getProperty('current') ? 'red' : 'blue';
        return {
          fillColor: fillColor,
          strokeWeight: 1
        };
      });
    }
  }
  componentDidMount() {
    var map = this.refs.map.mapRef;
    var _this = this;
    $.when( $.ajax('https://pih-api.intelimetrica.com/dev/suburb/adjacent-suburbs?suburb=090121758'), $.ajax('https://pih-api.intelimetrica.com/dev/suburb/geojson?suburb=090121758'), $.ajax('https://pih-api.intelimetrica.com/dev/suburb/centroid?suburb=090121758'))
      .then(loadTopoJSONs, failure);
    function loadTopoJSONs(adjacent, actual, centroid) {
      map.setCenter({lat: centroid[0].lng, lng: centroid[0].lat});

      map.data.addGeoJson({
        type: 'Feature',
        geometry: actual[0],
        properties: {
          current: true
        }
      });
      _this.highlightFeature();
      adjacent[0].geojsons.map(function(suburb, index) {
        suburb.properties = {
          id: index
        };
        map.data.addGeoJson(suburb);
      });

      map.data.addListener('mouseover', (event) => {
        _this.highlightFeature(event.feature.getProperty('id'));
        _this.props.onMouseoverFeature(event.feature.getProperty('id'));
      });
      map.data.addListener('mouseout', (event) => {
        _this.highlightFeature();
        _this.props.onMouseoverFeature(event.feature.getProperty('id'));
      });
    }

    var failure = function() {
      console.log('Error');
    };
  }
  render() {
    var googleMap;
    return (
      <GoogleMap
        latitud={19.2837698}
        longitud={-99.1839327}
        zoom={[15, 5, 21]}
        style={{
          width: '100%',
          height: '400px'
        }}
        ref='map'
        zoomTop={1} />
    );
  }
}

export default FormatGoogleMaps;