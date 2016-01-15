import React from 'react';

class ViviendaInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var stars = new Array();
    for (let i = 0; i < this.props.reputacion; i++) {
      stars.push(
        <img key={'star-' + i} height={'12px'} src={IMAGES.star} style={{marginBottom: '3px'}}/>
      );
    }

    return (
      <div className={'oferta-disponible'}>
        <h4 className={'subsection-title'} style={{marginLeft: '12px'}}>Vivienda valuada</h4>
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <p className={'green-price'}>$2,915,000</p>
            <p className={'subtitle'} style={{marginBottom: '0px'}}>Precio total enero 2016</p>
            <p className={'subtitle'}>{stars} Confianza</p>
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
  reputacion: 1
};

export default ViviendaInfo;