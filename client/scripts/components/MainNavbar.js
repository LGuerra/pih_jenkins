import React from 'react';
import LandingSearchForm  from './LandingSearchForm';

class MainNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
        <div className={'ControlBar'}>
          <div data-toggle={'collapse'} data-target={'#ColoniaForm'} className={'menu-item menu-item-selected'}>
            <a href={'#'}>{'Reporte Colonia'}</a>
          </div>
          <div className={'menu-item'}>
            <a href={'#'}>{'Reporte Vivienda'}</a>
          </div>
        </div>
        <div id={'ColoniaForm'} className={'collapse'}>
          <LandingSearchForm
            searchType={'Colonia'}
            placeholder={'Busca nombre de la colonia'}/>
        </div>
      </div>
    );
  }
}

export default MainNavbar;
