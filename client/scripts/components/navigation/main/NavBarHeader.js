import React from 'react';
import { Link } from 'react-router';

const NavBarBrand = (props) => {
  return (
    <Link className='navbar-brand' to='/'>{props.text}</Link>
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

const NavBarHeader = (props) => {
  return (
    <div className='navbar-header'>
      <NavBarCollapse id={props.id}/>
      <NavBarBrand text={props.text}/>
    </div>
  );
};

export default NavBarHeader;
