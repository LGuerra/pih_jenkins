import React          from 'react';

class MainNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <nav className={'navbar navbar-default'} style={{minHeight: '40px', padding: '0px 12px'}} >
        <div className="container-fluid max-width-container">
          <div className="navbar-header" style={{marginRight: 'auto'}}>
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a style={{paddingTop: '10px'}} className="navbar-brand" href="/">
              <img height={'26px'} src={IMAGES.intelimetrica} />
            </a>
          </div>
            {this.props.children}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={'hiddenLinks'} ><a href="/users/edit">Cambiar contraseña</a></li>
              <li className={'hiddenLinks'} ><a href="/helpers/logout">Salir</a></li>
              <li className="dropdown shownLinks">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <img height={'20px'} style={{margin: '3px 10px'}} src={IMAGES.user} />
                </a>
                <ul className="dropdown-menu users-dropdown">
                  <li><a href="/users/edit">Cambiar contraseña</a></li>
                  <li><a href="/helpers/logout">Salir</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainNavbar;
