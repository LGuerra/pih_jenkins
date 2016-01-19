import React from 'react';

class ColoniaInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var colName = this.props.viewType === 'vivienda' ?
      (<h4 className={'subsection-title'}>Colonia Anzures</h4>)
      : '';
    return (
      <div className={'oferta-disponible'}>
        {colName}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <div style={{textAlign: 'center'}}>
            <p className={'green-price'}>$2,915,000</p>
            <p className={'subtitle'}>Precio total enero 2016</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>$15,000</p>
            <p className={'subtitle'}>Precio promedio por m²</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>$15,000</p>
            <p className={'subtitle'}>Precio SHF por m²</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ColoniaInfo;
