import React from 'react';

const Landing = React.createClass({
  render() {
    return (
      <div style={{ background: '#284B63', padding: 15 }}>
        <div className='container' style={{ background: '#284B63' }}>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-6'>
                <h1 style={{ fontWeight: 100, color: '#fff', textAlign: 'center' }}>Intelimétrica</h1>
                <hr/>
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = Landing;
