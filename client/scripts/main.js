import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

import Landing from './views/landing';

require('./../styles/main.scss');

ReactDOM.render(<Landing/>, document.getElementById('index-react'));
