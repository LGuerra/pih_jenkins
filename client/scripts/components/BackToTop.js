import React from 'react';

class BackToTop extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var offset = 250;
    var duration = 300;
    $('.back-to-top').click(function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, duration);
      return false;
    });

    var stickyButtonTop = 1;

    var stickyButtom = function(){
      var scrollTop = $(window).scrollTop();
      if (scrollTop > stickyButtonTop) {
        $('.back-to-top').css({
          opacity: 1,
          WebkitTransition : 'opacity 0.5s ease-in-out',
          MozTransition    : 'opacity 0.5s ease-in-out',
          MsTransition     : 'opacity 0.5s ease-in-out',
          OTransition      : 'opacity 0.5s ease-in-out',
          transition       : 'opacity 0.5s ease-in-out'
        });
      } else {
        $('.back-to-top').css({
          opacity: 0
        });
      }
    };
    stickyButtom();
    $(window).scroll(function() {
      stickyButtom();
    });
  }
  render() {
    return (
      <a className={'back-to-top'} href={'#'}>
        <img height={'40px'} src={IMAGES.go_to_top}/>
      </a>
    );
  }
}

export default BackToTop;
