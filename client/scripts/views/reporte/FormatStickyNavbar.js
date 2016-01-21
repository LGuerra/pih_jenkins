import React from 'react';

import Helpers from '../../helpers';

import StickyNavbar from '../../components/StickyNavbar';

class FormatStickyNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    let content;

    if (props.viewType === 'vivienda') {
      content = (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '10px 0px'}}>
          <div style={{maxWidth: '33.3%'}}>
            <p style={{marginTop: '12px', marginBottom: '0px', fontSize: '12px'}}>{'Mariano Escobedo #748 col. Anzures Miguel Hidalgo, D.F. C.P. 11590'}</p>
          </div>
          <div className={'navbar-icon'}>
            <p className={'green-price'}>$2,915,000</p>
          </div>
          <div className={'navbar-icon'}>
            <img width={'15px'} src={IMAGES.bed} />
            <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'1'}</p>
            <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Recámaras'}</p>
          </div>
          <div className={'navbar-icon'}>
            <img width={'15px'} src={IMAGES.wc} />
            <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'1'}</p>
            <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Baños'}</p>
          </div>
          <div className={'navbar-icon'}>
            <img width={'15px'} src={IMAGES.car} />
            <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'1'}</p>
            <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Estacionamientos'}</p>
          </div>
          <div className={'navbar-icon'}>
            <img width={'15px'} src={IMAGES.area} />
            <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'1'}</p>
            <p style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'m²'}</p>
          </div>
        </div>

      );
    } else {
      if (props.coloniaInfo) {
        content = (<div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <div>
            <p style={{marginTop: '10px', marginBottom: '10px', fontSize: '15px'}}>{'Colonia ' + props.coloniaInfo.zonaInfo.nombre}</p>
          </div>
          <div>
            <p style={{marginTop: '10px', marginBottom: '10px'}} className={'green-price'}>{Helpers.formatAsPrice(props.coloniaInfo.averageOffer)}</p>
          </div>
          <div style={{marginTop: '17px', marginBottom: '0px'}}>
            <div style={{textAlign: 'center'}}>
              <p>{Helpers.formatAsPrice(props.coloniaInfo.averageM2) + ' promedio por m²'}</p>
            </div>
          </div>
        </div>);
      }
    }

    return (
      <StickyNavbar>
        {content}
      </StickyNavbar>
    );
  }
}

export default FormatStickyNavbar;