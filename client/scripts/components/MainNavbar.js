import React from 'react';

class MainNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    var downloadReport = this.props.onDownloadReport
    ? (<div style={{display: 'flex', margin: '0px 15px'}} onClick={this.props.onDownloadReport}>
        <p style={{fontSize: '12px', marginTop: '3px'}}>Descargar reporte</p>
        <img height={'15px'} style={{margin: '2px 10px'}} src={IMAGES.descarga} />
      </div>)
    : '';

    return (
      <nav className={'navbar navbar-default'} style={{minHeight: '40px'}} >
        <div className={'row'}>
          <div className={'col-sm-9 col-xs-9'}>
          <a href={'/'}>
              <img height={'25px'} style={{margin: '10px'}} src={IMAGES.santander} />
              <img height={'26px'} style={{margin: '10px'}} src={IMAGES.intelimetrica} />
          </a>
          </div>
          <div className={'col-sm-3 col-xs-3'}>
            <div style={{cursor: 'pointer', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end'}}>
              <div style={{marginTop: '-2px'}}>
                <img height={'15px'} style={{margin: '0px 10px'}} src={IMAGES.user} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainNavbar;
