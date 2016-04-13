import React from 'react';

const NavBarContent = (props) => {
  return (
    <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
      <ul className='nav navbar-nav'>
        <li className='active'>
          <a href='#'>Link <span className='sr-only'>(current)</span></a>
        </li>
        <li>
          <a href='#'>Link</a>
        </li>
        <li className='dropdown'>
          <a aria-expanded='false' aria-haspopup='true' className='dropdown-toggle' data-toggle='dropdown' href='#' role='button'>Dropdown <span className='caret'></span></a>
          <ul className='dropdown-menu'>
            <li>
              <a href='#'>Action</a>
            </li>
            <li>
              <a href='#'>Another action</a>
            </li>
            <li>
              <a href='#'>Something else here</a>
            </li>
            <li className='divider' role='separator'></li>
            <li>
              <a href='#'>Separated link</a>
            </li>
            <li className='divider' role='separator'></li>
            <li>
              <a href='#'>One more separated link</a>
            </li>
          </ul>
        </li>
      </ul>
      <form className='navbar-form navbar-left' role='search'>
        <div className='form-group'>
          <input className='form-control' placeholder='Search' type='text'/>
        </div>
        <button className='btn btn-default' type='submit'>Submit</button>
      </form>
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <a href='#'>Link</a>
        </li>
        <li className='dropdown'>
          <a aria-expanded='false' aria-haspopup='true' className='dropdown-toggle' data-toggle='dropdown' href='#' role='button'>Dropdown <span className='caret'></span></a>
          <ul className='dropdown-menu'>
            <li>
              <a href='#'>Action</a>
            </li>
            <li>
              <a href='#'>Another action</a>
            </li>
            <li>
              <a href='#'>Something else here</a>
            </li>
            <li className='divider' role='separator'></li>
            <li>
              <a href='#'>Separated link</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default NavBarContent;
