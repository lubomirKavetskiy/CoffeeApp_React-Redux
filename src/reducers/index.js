import { combineReducers } from 'redux';
import allProductsReducer from './allProductsReducer';
import oneProductReducer from './oneProductReducer';
import sortNameValueReducer from './sortNameReducer';

const rootReducer = combineReducers({ 
  allProducts: allProductsReducer,
  oneProduct: oneProductReducer,
  sortNameValue: sortNameValueReducer,
});

export default rootReducer;
