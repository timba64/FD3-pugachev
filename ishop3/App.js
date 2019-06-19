"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import InetShop from './components/InetShop.js';

let shopName='iShop3';
let prodArr=require('./prodarr.json'); 
let headArr=require('./headarr.json');

ReactDOM.render(
  <InetShop
    shopname={shopName}
    tablehead={headArr}
    defproducts={prodArr}
  />
  , document.getElementById('container') 
);