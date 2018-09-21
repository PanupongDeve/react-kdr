import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import colorsReducer from './colorsReducer';

const reducers = {
  routing: routerReducer,
  settings,
  colorsStore: colorsReducer
};

export default combineReducers(reducers);
