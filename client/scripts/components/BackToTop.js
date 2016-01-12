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
  }
  render() {
    return (
      <a className={'back-to-top'} style={{display: 'inline'}} href={'#'}>
        {'Back to Top'}
      </a>
    );
  }
}

export default BackToTop;
