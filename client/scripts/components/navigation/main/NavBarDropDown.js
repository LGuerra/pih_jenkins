import React from 'react';
import { Link } from 'react-router';

class NavBarDropDown extends React.Component { 
  render() {
    const props = this.props;
    const text = props.text; 
    const links = props.links;
    const image = (typeof props.image === 'undefined') ? '' : <i><img style={{ height: 20 }} src={props.image}/></i>;
    return (
      <li className='dropdown'>
        <a aria-expanded='false' aria-haspopup='true' className='dropdown-toggle' data-toggle='dropdown' href='#' role='button'>
          {image}
          {text}
          <span className='caret'>
          </span>
        </a>
        <ul className='dropdown-menu'>
          {links.map((link, index) => { 
            console.log(link.text);
            let component = link.isRR ? 
              <Link to={link.url}>{link.text}</Link> :
              <a href={link.url}>{link.text}</a>;
            return (
              <li key={index}>
                {component}
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
}

NavBarDropDown.propTypes = { 
  text: React.PropTypes.string.isRequired,
  links: React.PropTypes.array.isRequired,
  image: React.PropTypes.string
};

NavBarDropDown.defaultProps = {
  text: '',
  links: [
    { url: '/', text: 'Sample' },
    { url: '/', text: 'Sample' }
  ]
};

export default NavBarDropDown;
