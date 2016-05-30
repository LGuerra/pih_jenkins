import React from 'react';
import { Link } from 'react-router';

const NavBarLink = (props) => {
  if(!props.router) {
    return (
      <li className={props.className}>
        <a href={props.link} onClick={props.onClick}>{props.text}</a>
      </li>
    );
  } else {
    return (
      <li className={props.className}>
        <Link to={props.link}>
          {props.text}
        </Link>
      </li>
    );
  }
};

NavBarLink.propTypes = { 
  className: React.PropTypes.string,
  link: React.PropTypes.string,
  text: React.PropTypes.string,
  router: React.PropTypes.bool
};

NavBarLink.defaultProps = {
  className: '',
  link: '#',
  text: 'Link not configured',
  router: false
};

export default NavBarLink;
