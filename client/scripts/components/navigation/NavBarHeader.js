import React from 'react';

const NavBarBrand = (props) => {
  return (
    <a className='navbar-brand' href='#'>{props.text}</a>
  );
};

NavBarBrand.propTypes = { 
  text: React.PropTypes.string
};

NavBarBrand.defaultProps = {
  text: 'Brandname'
};

const NavBarCollapse = (props) => {
  return (
    <button aria-expanded='false' className='navbar-toggle collapsed' data-target={'#' + props.id } data-toggle='collapse' type='button'>
      <span className='sr-only'>Toggle navigation</span>
      <span className='icon-bar'></span>
      <span className='icon-bar'></span>
      <span className='icon-bar'></span>
    </button>
  );
};

NavBarCollapse.propTypes = {
  id: React.PropTypes.string
};

NavBarCollapse.defaultProps = {
  id: 'banca-intelimetrica-navbar-collapse'
};

const NavBarHeader = (props) => {
  return (
    <div className='navbar-header'>
      <NavBarCollapse/>
      <NavBarBrand/>
    </div>
  );
};

export default NavBarHeader;
