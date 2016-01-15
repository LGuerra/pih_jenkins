import React from 'react';

class OfertaDisponible extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'oferta-disponible'}>
        <h4 className={'subsection-title'}>Oferta Disponible</h4>
        <div style={{
          marginTop: '20px',
          marginBottom: '25px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'}}
          className={'listados'}>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <p className={'oferta-disponible-price'}>985</p>
            <p className={'subtitle'}>Listados en diciembre 2015</p>
          </div>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <p className={'oferta-disponible-price'}>7,000</p>
            <p className={'subtitle'}>Listados en los últimos 6 meses</p>
          </div>
          <div style={{textAlign: 'center', padding: '12px 0px'}}>
            <div className={'tiempo-container'}>
              <p className={'oferta-disponible-price'}>2 meses</p>
              <p className={'subtitle'}>Tiempo promedio en el mercado</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OfertaDisponible;
