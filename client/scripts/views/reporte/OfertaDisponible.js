import React from 'react';

var OfertaDisponible = React.createClass({
  render: function() {
    return (
      <div className={'oferta-disponible'}>
        <h4>Oferta Disponible</h4>
        <div style={{marginTop: '65px'}} className={'row listados'}>
          <div className={'col-sm-6 '}>
            <p className={'primary-price'}>985</p>
            <p className={'subtitle'}>Listados en Dic 2015</p>
          </div>
          <div className={'col-sm-6 '}>
            <p className={'primary-price'}>7,000</p>
            <p className={'subtitle'}>Listados en los últimos 6 meses</p>
          </div>
        </div>
        <div style={{marginTop: '36px'}} className={'row'}>
          <div className={'col-sm-12 tiempo'}>
            <div className={'tiempo-container'}>
              <p className={'primary-price'}>2 meses</p>
              <p className={'subtitle'}>Tiempo promedio en el mercado</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default OfertaDisponible;
