import React from 'react';

class StickyNavbar extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var stickyNavTop = $('.secondary-nav').offset() ?
      $('.secondary-nav').offset().top : 50;

    var stickyNav = function(){
      var scrollTop = $(window).scrollTop();
      if (scrollTop > (stickyNavTop * 2)) {
        $('#sticky-nav').css({
          display: 'block',
          opacity: 1,
          WebkitTransition : 'opacity 1s ease-in-out',
          MozTransition    : 'opacity 1s ease-in-out',
          MsTransition     : 'opacity 1s ease-in-out',
          OTransition      : 'opacity 1s ease-in-out',
          transition       : 'opacity 1s ease-in-out'
        });
      } else {
        $('#sticky-nav').css({
          opacity: 0,
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
      <div id={'sticky-nav'} style={{
        position: 'fixed',
        width: '100%',
        left: '0',
        top: '0',
        zIndex: '100',
        borderTop: '0',
        backgroundColor: '#F8F8F8'
      }}>
        <div className={'row'}>
          <div className={'col-md-4 col-sm-12'}>
            <p style={{marginTop: '10px', marginBottom: '0px'}}>{'Mariano Escobedo #748 col. Anzures Miguel Hidalgo, D.F. C.P. 11590'}</p>
          </div>
          <div className={'col-md-8 col-sm-12'}>
            <div className={'navbar-icons'}>
              <div className={'navbar-icon'}>
                <p className={'green-price'}>$2,915,000</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.bed} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'1'}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Recámaras'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.wc} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'1'}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Baños'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.car} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'1'}</p>
                <p className={'navbar-desc'} style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'Estacionamientos'}</p>
              </div>
              <div className={'navbar-icon'}>
                <img width={'15px'} src={IMAGES.area} />
                <p style={{fontSize: '12px', margin: '0px 5px 0px 5px'}}>{'1'}</p>
                <p style={{fontSize: '12px', margin: '0px 5px 0px 0px'}}>{'m²'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StickyNavbar;
