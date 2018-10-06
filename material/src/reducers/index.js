import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import colorsReducer from './colorsReducer';
import usersReducer from './usersReducer';
import sizesReducer from './sizesReducer';
import groupsReducer from './groupsReducer';
import productsReducer from './productsReducer';
import SweetAlertHelper from '../class/SweetAlert';

const sweetalertReducer = SweetAlertHelper.getReducer();

const reducers = {
  routing: routerReducer,
  settings,
  sweetalert: sweetalertReducer,
  colorsStore: colorsReducer,
  usersStore: usersReducer,
  sizesStore: sizesReducer,
  groupsStore: groupsReducer,
  productsStore: productsReducer
};

export default combineReducers(reducers);
