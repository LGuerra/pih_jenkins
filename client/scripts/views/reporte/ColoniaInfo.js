import React from 'react';

class ColoniaInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={'oferta-disponible'}>
        <h4 className={'subsection-title'}>Colonia Anzures</h4>
        <div style={{marginTop: '20px'}} className={'row'}>
          <div className={'col-sm-4'}>
            <p className={'green-price'}>$2,915,000</p>
            <p className={'subtitle'}>Precio total Enero 2016</p>
          </div>
          <div className={'col-sm-4'}>
            <p className={'secondary-price'}>$15,000</p>
            <p className={'subtitle'}>Precio promedio por m²</p>
          </div>
          <div className={'col-sm-4'}>
            <p className={'secondary-price'}>$15,000</p>
            <p className={'subtitle'}>Precio SHF</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ColoniaInfo;
