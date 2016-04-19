// Vendor
import React  from 'react';
import _      from 'lodash';

// Components
import StickyNavbar from '../../components/StickyNavbar';

// Helpers
import Helpers from '../../helpers';
import { connect } from 'react-redux';

class FormatStickyNavbar extends React.Component{
  constructor(props) {
    super(props);
  }

  _buildViviendaTopBar() {
    let props = this.props;
    let image;

    if (props.viviendaInfo) {
      if (props.viviendaInfo.id_tipo_propiedad == 2) {
        image = (<img width={'15px'} src={IMAGES.house} />);
      } else if (props.viviendaInfo.id_tipo_propiedad == 4) {
        image = (<img width={'15px'} src={IMAGES.apartment} />);
      }

      return (
        <div className={'NavbarIcons'} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div className={'sticky-address'} style={{maxWidth: '33.3%'}}>
            <p style={{marginBottom: '0px', fontSize: '12px'}}>{props.viviendaInfo.address}</p>
          </div>
          <div className={'NavbarIcon'}>
            <p style={{color: '#35C079'}}>{Helpers.formatAsPrice(props.viviendaInfo.valuacion)}</p>
          </div>
          <div className={'NavbarIcon'}>
            {image}
          </div>
          <div className={'NavbarIcon'}>
            <img width={'15px'} src={IMAGES.bed} />
            <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.viviendaInfo.recamaras}</p>
            <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Recámaras'}</p>
          </div>
          <div className={'NavbarIcon'}>
            <img width={'15px'} src={IMAGES.wc} />
            <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.viviendaInfo.banos}</p>
            <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Baños'}</p>
          </div>
          <div className={'NavbarIcon'}>
            <img width={'15px'} src={IMAGES.car} />
            <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.viviendaInfo.estacionamientos}</p>
            <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Estacionamientos'}</p>
          </div>
          <div className={'NavbarIcon'}>
            <img width={'15px'} src={IMAGES.area} />
            <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.viviendaInfo.area_construida}</p>
            <p style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'m²'}</p>
          </div>
        </div> );
    }
  }

  _buildColoniaTopBar() {
    let props = this.props;

    if (props.coloniaInfo) {
      return (
        <div className={'NavbarIcons'} style={{height: '35px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '0px'}}>
          <div className={'sticky-address NavbarIcon'}>
            <p style={{marginBottom: '10px', fontSize: '14px'}}>{'Colonia ' + props.coloniaInfo.coloniaInfo.nombre}</p>
          </div>
          <div className={'NavbarIcon'}>
            <p style={{color: '#35c079', fontSize: '17px'}}>{Helpers.formatAsPrice(props.coloniaInfo.averageOffer)}</p>
            <p className={'navbar-desc'} style={{marginTop: '4px', marginBottom: '10px', fontSize: '14px'}}>Precio promedio</p>
          </div>
          <div  className={'NavbarIcon'} style={{marginBottom: '0px', fontSize: '14px'}}>
            <p>{Helpers.formatAsPrice(props.coloniaInfo.averageM2) + ' promedio por m²'}</p>
          </div>
        </div>
        );
    }
  }

  render() {
    let props = this.props;
    let content;

    if (props.viewType === 'Vivienda') {
      content = this._buildViviendaTopBar();
    } else {
      content = this._buildColoniaTopBar();
    }

    return (
      <StickyNavbar>
        <div className={'max-width-container'}>
          {content}
        </div>
      </StickyNavbar>
    );
  }
}

function mapStateToProps(state) {
  let toProps = {};
  if (!_.isEmpty(state.report.viviendaInfo)) {
    toProps.viviendaInfo = {
      confianza:  state.report.viviendaInfo.confianza || 1,
      precioM2:   state.report.viviendaInfo.valuacion_m2 || 0,
      valuacion:  state.report.viviendaInfo.valuacion || 0
    };
  }

  if (state.report.coloniaInfo.length) {
    toProps.coloniaInfo =  {
      averageOffer: state.report.coloniaInfo[0].avg,
      averageM2: state.report.coloniaInfo[1].avg,
      coloniaInfo: {
        nombre: state.report.coloniaInfo[2].nombre,
        SHF: state.report.coloniaInfo[2].precio_m2_shf
      },
      apreciacion: state.report.coloniaInfo[3] ? state.report.coloniaInfo[3].apreciacion_anualizada : null
    }
  }

  return toProps;
}


export default connect(mapStateToProps)(FormatStickyNavbar);