import {EventEmitter} from 'events';

let clientEvents=new EventEmitter();
let allFilters=new EventEmitter(); 

export {clientEvents, allFilters};