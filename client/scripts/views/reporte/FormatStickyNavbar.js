import React from 'react';

import StickyNavbar from '../../components/StickyNavbar';

class FormatStickyNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    var content = this.props.viewType === 'vivienda' ?
      (
        <div className={'row'}>
          <div className={'col-md-4 col-sm-12'}>
            <p style={{marginTop: '12px', marginBottom: '0px', fontSize: '12px'}}>{'Mariano Escobedo #748 col. Anzures Miguel Hidalgo, D.F. C.P. 11590'}</p>
          </div>
          <div className={'col-md-8 col-sm-12'}>
            <div className={'navbar-icons'}>
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
          </div>
        </div>
      ) : (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
            <p style={{marginTop: '10px', marginBottom: '10px', fontSize: '20px'}}>{'Colonia Anzures'}</p>
          </div>
          <div>
            <p style={{marginTop: '10px', marginBottom: '10px'}} className={'green-price'}>$2,915,000</p>
          </div>
          <div style={{marginTop: '17px', marginBottom: '0px'}}>
            <div style={{textAlign: 'center'}}>
              <p>$15,000 Precio promedio por m²</p>
            </div>
          </div>
        </div>
      );
    return (
      <StickyNavbar>
        {content}
      </StickyNavbar>
    );
  }
}

export default FormatStickyNavbar;