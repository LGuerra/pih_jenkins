import React from 'react';

const NavBarLogo = (props) => {
  return (
    <a style={props.linkStyle} className="navbar-brand" href="/">
      <img height={props.imageStyle} src={props.image} />
    </a>
  );
};

NavBarLogo.propTypes = { 
  image: React.PropTypes.string,
  linkStyle: React.PropTypes.object,
  imageStyle: React.PropTypes.object
};

NavBarLogo.defaultProps = {
  image: IMAGES.intelimetrica,
  linkStyle: {
    paddingTop: '10px'
  },
  imageStyle: {
    height: '26px'
  }
};

export default NavBarLogo;
