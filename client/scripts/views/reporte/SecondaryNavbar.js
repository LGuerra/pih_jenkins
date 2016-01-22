import React from 'react';

class SecondaryNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    let image;

    if (props.data.id_tipo_propiedad == 2) {
      image = (<div className={'navbar-icon'}>
        <img width={'15px'} src={IMAGES.house} />
        <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'Casa'}</p>
      </div>);
    } else if (props.data.id_tipo_propiedad == 4) {
      image = (<div className={'navbar-icon'}>
        <img width={'15px'} src={IMAGES.apartment} />
        <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'Departamento'}</p>
      </div>);
    }

    return (
      <div className={'secondary-nav'} style={{
        width: this.props.width
      }}>
        <h3 className={'section-title'}>{'Información del inmueble'}</h3>
        <div className={'line-divider'}></div>
        <div className={'row'}>
          <div className={'col-md-4 col-sm-12'}>
            <p style={{marginTop: '8px', fontSize: '12px'}}>{props.data.address}</p>
          </div>
          <div className={'col-md-8 col-sm-12'}>
            <div className={'navbar-icons'}>
              {image}
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.bed} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.data.recamaras}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Recámaras'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.wc} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.data.banos}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Baños'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.car} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.data.estacionamientos}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Estacionamientos'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.area} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{props.data.area_construida}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'m² de construcción'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondaryNavbar;
