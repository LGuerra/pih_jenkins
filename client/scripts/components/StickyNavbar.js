import React from 'react';

class StickyNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var stickyNavTop = 100;

    var stickyNav = function(){
      var scrollTop = $(window).scrollTop();
      if (scrollTop > (stickyNavTop * 2)) {
        $('#sticky-nav').css({
          display: 'block',
          WebkitTransition : 'display 1s ease-in-out',
          MozTransition    : 'display 1s ease-in-out',
          MsTransition     : 'display 1s ease-in-out',
          OTransition      : 'display 1s ease-in-out',
          transition       : 'display 1s ease-in-out'
        });
      } else {
        $('#sticky-nav').css({
          display: 'none'
        });
      }
    };

    stickyNav();
    $(window).scroll(function() {
      stickyNav();
    });
  }
  render() {
    return (
      <div className={'box-shadow'} id={'sticky-nav'} style={{
        position: 'fixed',
        width: '100%',
        left: '0',
        top: '0',
        zIndex: '1100',
        borderTop: '0',
        backgroundColor: '#F8F8F8',
        padding: '0px 15px'
      }}>
      {this.props.children}
      </div>
    );
  }
}

export default StickyNavbar;
