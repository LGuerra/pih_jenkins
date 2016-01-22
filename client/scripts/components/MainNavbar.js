import React          from 'react';
import MiniSearchForm from './MiniSearchForm'

class MainNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    var downloadReport = this.props.onDownloadReport
    ? (<div style={{display: 'flex', margin: '0px'}} onClick={this.props.onDownloadReport}>
        {/*<p style={{fontSize: '12px', marginTop: '17px'}}>Descargar reporte</p>*/}
        <img height={'15px'} style={{margin: '16px 10px'}} src={IMAGES.descarga} />
      </div>)
    : '';

    var openForm = this.props.onOpenForm
    ? (<div style={{display: 'flex', margin: '0px'}} onClick={this.props.onOpenForm}>
        <p style={{fontSize: '12px', marginTop: '17px'}}>Nueva búsqueda</p>
        <img height={'15px'} style={{margin: '16px 10px'}} src={IMAGES.descarga} />
      </div>)
    : '';

    let miniSearchForm = (this.props.type) ? <MiniSearchForm searchType={this.props.type}/> : "" ;

    return (
      <nav className={'navbar navbar-default'} style={{minHeight: '40px'}} >
        <div className={'max-width-container'}>
          <div className={'row'}>
          <div className={'col-md-6 col-sm-6 col-xs-12'}>
            <a href={'/'}>
                <img height={'26px'} style={{margin: '10px'}} src={IMAGES.intelimetrica} />
            </a>
            </div>
            <div className={'col-md-6 col-sm-6 col-xs-12'}>
              <div style={{cursor: 'pointer', paddingTop: '0px', display: 'flex', justifyContent: 'flex-end'}}>
                {miniSearchForm}
                {downloadReport}
                <div className="collapse navbar-collapse navbar-ex1-collapse" style={{marginTop: '-2px'}}>
                  <ul className="nav navbar-nav">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <img height={'20px'} style={{margin: '0px 10px'}} src={IMAGES.user} />
                      </a>
                      <ul className="dropdown-menu users-dropdown">
                        <li><a href="/users/edit">Cambiar contraseña</a></li>
                        <li><a href="/helpers/logout">Salir</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainNavbar;
