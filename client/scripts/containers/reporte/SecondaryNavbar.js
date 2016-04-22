// Vendor
import React from 'react';
import { connect } from 'react-redux';


class SecondaryNavbar extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;
    let imageTipoPropiedad;

    if (props.urlParams.id_tipo_propiedad == 2) {
      imageTipoPropiedad = (<div className={'NavbarIcon'}>
        <img width={'15px'} src={IMAGES.house} />
        <p className={'NavbarDescription'} style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'Casa'}</p>
      </div>);
    } else if (props.urlParams.id_tipo_propiedad == 4) {
      imageTipoPropiedad = (<div className={'NavbarIcon'}>
        <img width={'15px'} src={IMAGES.apartment} />
        <p className={'NavbarDescription'} style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'Departamento'}</p>
      </div>);
    }

    return (
      <div className={'secondary-nav'} style={{
        width: props.width
      }}>
        <h3 className={'SectionTitle'}>{'Información del inmueble'}</h3>
        <div className={'LineDivider'}></div>
        <div className={'row'}>
          <div className={'col-md-4 col-sm-12'} style={{paddingLeft: '4px'}}>
            <p style={{marginTop: '8px', fontSize: '12px'}}>{props.urlParams.address}</p>
          </div>
          <div className={'col-md-8 col-sm-12'}>
            <div className={'NavbarIcons'}>
              {imageTipoPropiedad}
              <div className={'NavbarIcon'}>
                <img width={'15px'} src={IMAGES.bed} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.urlParams.recamaras}</p>
                <p className={'NavbarDescription'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Recámaras'}</p>
              </div>
              <div className={'NavbarIcon'}>
                <img width={'15px'} src={IMAGES.wc} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.urlParams.banos}</p>
                <p className={'NavbarDescription'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Baños'}</p>
              </div>
              <div className={'NavbarIcon'}>
                <img width={'15px'} src={IMAGES.car} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.urlParams.estacionamientos}</p>
                <p className={'NavbarDescription'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Estacionamientos'}</p>
              </div>
              <div className={'NavbarIcon'}>
                <img width={'15px'} src={IMAGES.area} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.urlParams.area_construida + 'm²'}</p>
                <p className={'NavbarDescription'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{' de construcción'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    urlParams: state.report.urlParams
  };
}

export default connect(mapStateToProps)(SecondaryNavbar);
