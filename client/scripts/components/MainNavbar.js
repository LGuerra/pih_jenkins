import React from 'react';

class MainNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className={'navbar navbar-default'} >
        <div className={'row'}>
          <div className={'col-sm-9'}>
            <img height={'30px'} style={{margin: '7px 10px'}} src={IMAGES.santander} />
            <img height={'30px'} style={{margin: '7px 10px'}} src={IMAGES.intelimetrica} />
          </div>
          <div className={'col-sm-3'}>
            <div style={{cursor: 'pointer', paddingTop: '14px', display: 'flex', alignItems: 'flex-start'}}>
              <div style={{display: 'flex'}} onClick={this.props.onDownloadReport}>
                <p>Descergar reporte</p>
                <img height={'15px'} style={{margin: '2px 10px'}} src={IMAGES.descarga} />
              </div>
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
