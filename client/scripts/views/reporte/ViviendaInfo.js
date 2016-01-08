import React from 'react';

class ViviendaInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'oferta-disponible'}>
        <h4>Vivienda valuada</h4>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: '20px'
        }} className={'row'}>
          <div>
            <p className={'green-price'}>$2,915,000</p>
            <p className={'subtitle'}>Precio total Enero 2016</p>
          </div>
          <div>
            <p>Estrellas</p>
          </div>
          <div className={'col-sm-4'}>
            <p className={'secondary-price'}>$15,000</p>
            <p className={'subtitle'}>Precio por m²</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ViviendaInfo;