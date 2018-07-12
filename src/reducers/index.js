import { combineReducers } from 'redux';
import MemDetails from './memDetails_reducer'
import {dashModal,all, members, requests, details, token, isLoggedIn, selected} from './dashboard_reducer'
import OrgReg from './orgReg_reducer'
import {usidIsAvailable} from './orgReg_reducer'
import {validation} from './orgReg_reducer'
console.log('reducer', selected)
const rootReducer = combineReducers({
  MemDetails, OrgReg, usidIsAvailable, validation, 
  orgAll:all, dashDetails:details, 
  dashMembers:members, 
  dashRequests: requests,
   orgToken:token, 
   isLoggedIn,
   dashSelected:selected,
   dashModal
});

export default rootReducer;
