import { combineReducers } from 'redux';
import MemDetails from './memDetails_reducer'
import Organisations from './organisations_reducer'
import OrgReg from './orgReg_reducer'
import {usidIsAvailable} from './orgReg_reducer'
// console.log(MemDetails)
const rootReducer = combineReducers({
  MemDetails, Organisations, OrgReg, usidIsAvailable
});

export default rootReducer;
