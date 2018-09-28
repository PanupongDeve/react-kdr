import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import colorsReducer from './colorsReducer';
import SweetAlertHelper from '../class/SweetAlert';

const sweetalertReducer = SweetAlertHelper.getReducer();

const reducers = {
  routing: routerReducer,
  settings,
  sweetalert: sweetalertReducer,
  colorsStore: colorsReducer
};

export default combineReducers(reducers);
