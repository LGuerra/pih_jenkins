import React from 'react';
import GoogleMap from '../../components/GoogleMap';

class FormatGoogleMaps extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.refs.map.mapRef);
    var map = this.refs.map.mapRef;

    $.when( $.ajax('https://pih-api.intelimetrica.com/dev/suburb/adjacent-suburbs?suburb=090121758'))
      .then(loadTopoJSONs, failure);
    function loadTopoJSONs(data, adjacent, current) {
      map.data.setStyle({
        fillColor: 'green',
        strokeWeight: 1
      });
      data.geojsons.map(function(suburb) {
        console.log(suburb);
        map.data.addGeoJson(suburb);
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