import { combineReducers } from 'redux';
import MemDetails from './memDetails_reducer'
import Organisations from './organisations_reducer'

// console.log(MemDetails)
const rootReducer = combineReducers({
  MemDetails, Organisations
});

export default rootReducer;
