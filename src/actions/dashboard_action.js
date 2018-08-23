import axios from 'axios'
import Cookies from 'js-cookie'
import serverBaseURL from '../serverBaseURL.js';
window.Cookies=Cookies
var token=Cookies.get('token')
var optionsOrg = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer '+token},
    url: serverBaseURL+'/auth/org'
};

var optionsMem = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer '+token},
    url: serverBaseURL+'/auth/members'
};

export function updateDashboardData(){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        try{
            var org=await axios(optionsOrg)
            var mem=await axios(optionsMem)
            dispatch({type:'UPDATE_ORG_DETAILS', data:org.data})
            dispatch({type:'UPDATE_ORG_MEMBERS', data:mem.data.data})
            // dispatch({type:'UPDATE_ORG_REQUESTS', data:mem.data.data.unverified})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            console.log(e)
            // dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}

export function del(reg){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        await axios({
            url:`${serverBaseURL}/auth/members?reg=${reg}`,
            headers: { 'Authorization': 'Bearer '+token},
            method: 'DELETE',
        })
        // var mem=await axios(optionsMem)
        // dispatch({type:'UPDATE_ORG_MEMBERS', data:mem.data.data.verified})
        // dispatch({type:'UPDATE_ORG_REQUESTS', data:mem.data.data.unverified})
        // dispatch({type:'UPDATE_ORG_LOGGED', data:true})


    }
}

export function verify(reg){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        await axios({
            url:`${serverBaseURL}/auth/requests?reg=${reg}`,
            headers: { 'Authorization': 'Bearer '+token},
            method: 'PUT',
        })
        // var mem=await axios(optionsMem)
        // dispatch({type:'UPDATE_ORG_MEMBERS', data:mem.data.data.verified})
        // dispatch({type:'UPDATE_ORG_REQUESTS', data:mem.data.data.unverified})
        // dispatch({type:'UPDATE_ORG_LOGGED', data:true})
    }
}

export function modifyData(X,data,action){
    return ({
        type: 'UPDATE_ORG_'+action, data
    })
}

export function updateReq(){
    return async function(dispatch){
        try{
            var req=await axios({
                url:`${serverBaseURL}/auth/requests`,
                headers: { 'Authorization': 'Bearer '+token},
                method: 'GET',
            })
            console.log(req.data.data)
            dispatch({type:'UPDATE_ORG_REQUESTS', data:req.data.data})
        } catch(e){
            console.log(e)
            // dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}

export function updateMem(){
    return async function(dispatch){
        try{
            var req=await axios({
                url:`${serverBaseURL}/auth/requests`,
                headers: { 'Authorization': 'Bearer '+token},
                method: 'GET',
            })
            console.log(req.data.data)
            dispatch({type:'UPDATE_ORG_REQUESTS', data:req.data.data})
        } catch(e){
            console.log(e)
            // dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}
