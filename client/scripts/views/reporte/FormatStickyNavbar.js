// Vendor
import React from 'react';

// Components
import StickyNavbar from '../../components/StickyNavbar';

// Helpers
import Helpers from '../../helpers';

class FormatStickyNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    let content;
    let image;

    if (props.viewType === 'Vivienda') {
      if (props.viviendaInfo) {
        if (props.viviendaInfo.id_tipo_propiedad == 2) {
          image = (<img width={'15px'} src={IMAGES.house} />);
        } else if (props.viviendaInfo.id_tipo_propiedad == 4) {
          image = (<img width={'15px'} src={IMAGES.apartment} />);
        }
        content = (
          <div className={'max-width-container'}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '10px 0px'}}>
              <div style={{maxWidth: '33.3%'}}>
                <p style={{marginBottom: '0px', fontSize: '12px'}}>{props.viviendaInfo.address}</p>
              </div>
              <div className={'navbar-icon'}>
                <p className={'green-price'}>{Helpers.formatAsPrice(props.viviendaInfo.valuacion)}</p>
              </div>
              <div className={'navbar-icon'}>
                {image}
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.bed} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.viviendaInfo.recamaras}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Recámaras'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.wc} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.viviendaInfo.banos}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Baños'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.car} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.viviendaInfo.estacionamientos}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Estacionamientos'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.area} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.viviendaInfo.area_construida}</p>
                <p style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'m²'}</p>
              </div>
            </div>
          </div> );
      }
    } else {
      if (props.coloniaInfo) {
        content = (
          <div className={'max-width-container'}>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <div>
                <p style={{marginTop: '10px', marginBottom: '10px', fontSize: '15px'}}>{'Colonia ' + Helpers.toTitleCase(props.coloniaInfo.coloniaInfo.nombre)}</p>
              </div>
              <div>
                <p style={{marginTop: '10px', marginBottom: '10px', fontSize: '15px'}}><span style={{color: '#35c079', fontSize: '17px'}}>{Helpers.formatAsPrice(props.coloniaInfo.averageOffer)}</span> Precio promedio</p>
              </div>
              <div style={{marginTop: '10px', marginBottom: '0px', fontSize: '15px'}}>
                <div style={{textAlign: 'center'}}>
                  <p>{Helpers.formatAsPrice(props.coloniaInfo.averageM2) + ' promedio por m²'}</p>
                </div>
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