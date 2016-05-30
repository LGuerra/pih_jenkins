import React from 'react';

class BackToTop extends React.Component {
  constructor(props) {
    super(props);
  }

  showStickyButtom() {
    var stickyButtonTop = 1;
    var scrollTop = $(window).scrollTop();
    if (scrollTop > stickyButtonTop) {
      $('.BackToTop').css({
        opacity: 1,
        WebkitTransition : 'opacity 0.5s ease-in-out',
        MozTransition    : 'opacity 0.5s ease-in-out',
        MsTransition     : 'opacity 0.5s ease-in-out',
        OTransition      : 'opacity 0.5s ease-in-out',
        transition       : 'opacity 0.5s ease-in-out'
      });
    } else {
      $('.BackToTop').css({
        opacity: 0
      });
    }
  }

  componentDidMount() {
    var duration = 300;

    $('.BackToTop').click(function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, duration);
      return false;
    });

    this.showStickyButtom();

    $(window).scroll(this.showStickyButtom);
  }

  render() {
    var goToTop = require('file!images-banca/go_to_top.svg');
    return (
      <a className={'BackToTop'} href={'#'}>
        <img height={'40px'} src={goToTop}/>
      </a>
    );
  }
}

export default BackToTop;
