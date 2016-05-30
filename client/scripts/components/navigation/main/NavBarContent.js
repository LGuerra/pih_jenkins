import React from 'react';

const NavBarContent = (props) => {
  return (
    <div className='collapse navbar-collapse' id={props.id}>
      <ul className='nav navbar-nav'>
      </ul>
      <ul className='nav navbar-nav navbar-right'>
        {props.children}
      </ul>
    </div>
  );
};

export default NavBarContent;
