import React from 'react';
import GoogleMap from '../../components/GoogleMap';

class FormatGoogleMaps extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var map = this.refs.map.mapRef;

    $.when( $.ajax('https://pih-api.intelimetrica.com/dev/suburb/adjacent-suburbs?suburb=090121758'), $.ajax('https://pih-api.intelimetrica.com/dev/suburb/geojson?suburb=090121758'), $.ajax('https://pih-api.intelimetrica.com/dev/suburb/centroid?suburb=090121758'))
      .then(loadTopoJSONs, failure);
    function loadTopoJSONs(data, adjacent, current) {
      console.log(data, adjacent, current);
      map.data.setStyle({
        fillColor: 'red',
        strokeWeight: 1
      });
      data.geojsons.map(function(suburb) {
        map.data.addGeoJson(suburb, {uno: 1});
      });

      map.data.addListener('mouseover', function(event) {
        console.log(event.feature.getProperty('b'));
      });
      /*
      var currentPolygon = map.data.addGeoJson(current[0][0]);
      map.data.setStyle(function(feature) {
        var isCurrent = feature.getProperty('current');
        var color = isCurrent ? 'red' : 'blue';
        return {
          fillColor: color,
          strokeWeight: 1
        };
      });
      var myLatlng = {lng: centroid[0].lat, lat: centroid[0].lng};
      map.panTo(myLatlng);
      */
    }

    var failure = function() {
      console.log('Error');
    };
  }
  render() {
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