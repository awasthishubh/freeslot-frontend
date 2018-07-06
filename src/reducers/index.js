import { combineReducers } from 'redux';
import MemDetails from './memDetails_reducer'
import {all, members, details, token, isLoggedIn} from './dashboard_reducer'
import OrgReg from './orgReg_reducer'
import {usidIsAvailable} from './orgReg_reducer'
import {validation} from './orgReg_reducer'
// console.log(MemDetails)
const rootReducer = combineReducers({
  MemDetails, OrgReg, usidIsAvailable, validation, 
  orgAll:all, dashDetails:details, dashMembers:members, orgToken:token, isLoggedIn
});

export default rootReducer;
