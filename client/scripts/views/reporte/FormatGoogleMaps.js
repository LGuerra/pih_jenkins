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
      map.setCenter({lat: suburbCentroidR.data.lng, lng: suburbCentroidR.data.lat});
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
    });

    map.data.addListener('mouseout', (event) => {
      this.highlightFeature();
      this.props.onMouseoverFeature(event.feature.getProperty('id'));

    });

    map.data.addListener('click', (event) => {
      let templateUrl = ('/reporte?colonia=:colonia:&tipo=:reportType:')
        .replace(':colonia:', event.feature.getProperty('id'))
        .replace(':reportType:', 'Colonia');

      let html;

      if (!event.feature.getProperty('current')) {
        html = `
          <div class="tooltip-container">
            <p class="tooltip-title">${event.feature.getProperty('name')}</p>
            <a class="tooltip-value" href=${templateUrl}>Ver detalle</a>
          </div>
        `;
      } else {
        html = `
          <div class="tooltip-container">
            <p class="tooltip-title">${this.props.coloniaName}</p>
          </div>
        `;
      }

      $('#map-tooltip').css({
        display: 'block',
        left: event.rb.offsetX + 15,
        top: event.rb.offsetY + 5
      })
      .html(html);

    });

    map.addListener('drag', () => {
      $('#map-tooltip').css({
        display: 'none'
      });
    });

    map.addListener('click', () => {
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
        <div id={'map-tooltip'}>
        </div>
      </div>
    );
  }
}

export default FormatGoogleMaps;
