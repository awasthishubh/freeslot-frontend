import { combineReducers } from 'redux';
import MemDetails from './memDetails_reducer'
import {dashModal,all, members, requests, details, isLoggedIn, timeStat} from './dashboard_reducer'
import OrgReg from './orgReg_reducer'
import {usidIsAvailable} from './orgReg_reducer'
import {validation} from './orgReg_reducer'
const rootReducer = combineReducers({
  MemDetails, OrgReg, usidIsAvailable, validation, 
  orgAll:all, dashDetails:details, 
  dashMembers:members, 
  dashRequests: requests,
  dashtimeStat:timeStat,
  isLoggedIn,
  dashModal
});

export default rootReducer;
