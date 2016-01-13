import React from 'react';
import GoogleMap from '../../components/GoogleMap';

class FormatGoogleMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latlon: null
    };
  }
  highlightFeature(id) {
    let map = this.refs.map.mapRef;

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
  }
  componentDidMount() {
    var map = this.refs.map.mapRef;

    $.when( $.ajax('https://pih-api.intelimetrica.com/dev/suburb/adjacent-suburbs?suburb=090121758'), $.ajax('https://pih-api.intelimetrica.com/dev/suburb/geojson?suburb=090121758'), $.ajax('https://pih-api.intelimetrica.com/dev/suburb/centroid?suburb=090121758'))
      .then(loadTopoJSONs, failure);
    function loadTopoJSONs(adjacent, actual, centroid) {
      map.setCenter({lat: centroid[0].lng, lng: centroid[0].lat});

      adjacent[0].geojsons.map(function(suburb, index) {
        suburb.properties = {
          id: index
        };
        map.data.addGeoJson(suburb);
      });

      map.data.addGeoJson({
        type: 'Feature',
        geometry: actual[0],
        properties: {
          current: true
        }
      });

      map.data.setStyle(function(feature) {
        let fillColor = feature.getProperty('current') ? 'red' : 'blue';
        return {
          fillColor: fillColor,
          strokeWeight: 1
        };
      });
      map.data.addListener('mouseover', function(event) {
        console.log(this);
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