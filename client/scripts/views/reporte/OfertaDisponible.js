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
          marginTop: '73px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'}}
          className={'listados'}>
          <div style={{textAlign: 'center'}}>
            <p className={'primary-price'}>985</p>
            <p className={'subtitle'}>Listados en Dic 2015</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'primary-price'}>7,000</p>
            <p className={'subtitle'}>Listados en los últimos 6 meses</p>
          </div>
        </div>
        <div style={{marginTop: '42px', marginBottom: '85px'}} className={'row'}>
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
}

export default OfertaDisponible;
