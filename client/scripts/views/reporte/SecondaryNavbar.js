import React from 'react';

class SecondaryNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'secondary-nav'} style={{
        width: this.props.width
      }}>
        <h3 className={'section-title'}>{'Información de la vivienda'}</h3>
        <hr width={'100px'} className={'section-title-hr'}/>
        <div className={'row'}>
          <div className={'col-md-4 col-sm-12'}>
            <p style={{marginTop: '8px', fontSize: '12px'}}>{'Mariano Escobedo #748 col. Anzures Miguel Hidalgo, D.F. C.P. 11590'}</p>
          </div>
          <div className={'col-md-8 col-sm-12'}>
            <div className={'navbar-icons'}>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.apartment} />
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'Departamento'}</p>
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
