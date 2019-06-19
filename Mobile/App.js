"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MobCompany from './components/MobCompany.js';

let config=require('./config.json');


let shopName = config.shopname;
let compArr = config.company_names;
let showEditForm = config.showeditform; // показывать ли форму под таблицей
let filterName = config.filter_names;
let headerTableNames = config.header_table_names;
let clientsArr=[ 
  {id:101, family:"Иванов", name: "Иван", secname: "Иванович", balance:200, status: "active", editbut: true, delbut: true}, 
  {id:105, family:"Сидоров", name: "Сидор", secname: "Сидорович", balance:250, status: "active", editbut: true, delbut: true}, 
  {id:110, family:"Петров", name: "Петр", secname: "Петрович", balance:180, status: "active", editbut: true, delbut: true},
  {id:120, family:"Григорьев", name: "Григорий", secname: "Григорьевич", balance:220, status: "block", editbut: true, delbut: true},
];

ReactDOM.render(

  <MobCompany
    shopname = {shopName}
    filtername = {filterName}
    comparr = {compArr}
    showeditform = {showEditForm}
    headertablenames = {headerTableNames}
    clientsarr = {clientsArr}
  />
  , document.getElementById('pageWrapper') 

);