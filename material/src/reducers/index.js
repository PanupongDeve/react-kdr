import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import colorsReducer from './colorsReducer';
import usersReducer from './usersReducer';
import sizesReducer from './sizesReducer';
import groupsReducer from './groupsReducer';
import productsReducer from './productsReducer';
import ordersReducer from './ordersReducer';
import modelsReducer from './modelsReducer';
import usersGroupsReducer from './usersGroupsReducer';
import SweetAlertHelper from '../class/SweetAlert';
import editModalModelReducer from './editModalModelReducer';

const sweetalertReducer = SweetAlertHelper.getReducer();

const reducers = {
  routing: routerReducer,
  settings,
  sweetalert: sweetalertReducer,
  colorsStore: colorsReducer,
  usersStore: usersReducer,
  sizesStore: sizesReducer,
  groupsStore: groupsReducer,
  productsStore: productsReducer,
  ordersStore: ordersReducer,
  modelsStore: modelsReducer,
  usersGroupsReducerStore: usersGroupsReducer,
  openEditModalModel: editModalModelReducer
};

export default combineReducers(reducers);
