import React from 'react';

class ViviendaInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var stars = new Array();
    for (let i = 0; i < this.props.reputacion; i++) {
      stars.push(
        <img key={'star-' + i} height={'20px'} src={IMAGES.star} />
      );
    }

    return (
      <div className={'oferta-disponible'}>
        <h4>Vivienda valuada</h4>
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <p className={'green-price'}>$2,915,000</p>
            <p className={'subtitle'}>Precio total Enero 2016</p>
          </div>
          <div style={{textAlign: 'center'}}>
            {stars}
            <p style={{marginTop: '10px'}} className={'subtitle'}>Confianza</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p className={'secondary-price'}>$15,000</p>
            <p className={'subtitle'}>Precio por m²</p>
          </div>
        </div>
      </div>
    );
  }
}

ViviendaInfo.defaultProps = {
  reputacion: 4
};

export default ViviendaInfo;