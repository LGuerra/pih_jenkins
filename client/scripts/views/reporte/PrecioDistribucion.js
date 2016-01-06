import React from 'react';

var PrecioDistribucion = React.createClass({
  render: function() {
    return (
      <div>
        <div style={{marginTop: '20px'}} className={'row'}>
          <div className={'col-sm-6'}>
            <p className={'secondary-price'}>$850,000</p>
            <p className={'subtitle'}>Precio máximo</p>
          </div>
          <div className={'col-sm-6'}>
            <p className={'secondary-price'}>$2,350,000</p>
            <p className={'subtitle'}>Precio minimo</p>
          </div>
        </div>
      </div>
    );
  }
});

export default PrecioDistribucion;
