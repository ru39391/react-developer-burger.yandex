import { combineReducers } from 'redux';
import constructorReducer from './constructor';

const rootReducer = combineReducers({
  constructor: constructorReducer
});

export default rootReducer;
