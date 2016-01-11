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
            <div onClick={this.props.onDownloadReport} style={{cursor: 'pointer', paddingTop: '14px', display: 'flex'}}>
              <p>Descergar reporte</p>
              <img height={'15px'} style={{margin: '2px 10px'}} src={IMAGES.descarga} />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainNavbar;
