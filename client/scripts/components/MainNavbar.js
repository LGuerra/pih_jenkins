import React from 'react';

class MainNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    var downloadReport = this.props.onDownloadReport
    ? (<div style={{display: 'flex', margin: '0px'}} onClick={this.props.onDownloadReport}>
        <p style={{fontSize: '12px', marginTop: '3px'}}>Descargar reporte</p>
        <img height={'15px'} style={{margin: '2px 10px'}} src={IMAGES.descarga} />
      </div>)
    : '';

    var openForm = this.props.onOpenForm
    ? (<div style={{display: 'flex', margin: '0px'}} onClick={this.props.onOpenForm}>
        <p style={{fontSize: '12px', marginTop: '3px'}}>Nueva búsqueda</p>
        <img height={'15px'} style={{margin: '2px 10px'}} src={IMAGES.descarga} />
      </div>)
    : '';


    return (
      <nav className={'navbar navbar-default'} style={{minHeight: '40px'}} >
        <div className={'row'}>
          <div className={'col-sm-8 col-xs-8'}>
          <a href={'/'}>
              <img height={'25px'} style={{margin: '10px'}} src={IMAGES.santander} />
              <img height={'26px'} style={{margin: '10px'}} src={IMAGES.intelimetrica} />
          </a>
          </div>
          <div className={'col-sm-4 col-xs-4'}>
            <div style={{cursor: 'pointer', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end'}}>
              {openForm}
              {downloadReport}
              <div style={{marginTop: '-2px'}}>
                <img height={'20px'} style={{margin: '0px 10px'}} src={IMAGES.user} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainNavbar;
