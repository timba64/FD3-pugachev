"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import {withColorBackground} from './components/withColorBackground';

let colors = ['red','orange','yellow','green','#00bfff','blue','purple'];
let Fragment = React.Fragment;
let FramedFragment = withColorBackground(colors)(Fragment);

ReactDOM.render(

  <FramedFragment>
    Hello HOC!
  </FramedFragment>
  , document.getElementById('container') 

);