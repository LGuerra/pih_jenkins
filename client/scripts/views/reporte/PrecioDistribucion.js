import React from 'react';

class PrecioDistribucion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>$850,000</p>
            <p className={'subtitle'}>Precio máximo</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>$2,350,000</p>
            <p className={'subtitle'}>Precio minimo</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PrecioDistribucion;
