import axios from 'axios'
import Cookies from 'js-cookie'
var token=Cookies.get('token')
var optionsOrg = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer '+token},
    url: 'http://localhost:5000/auth/org'
};

var optionsMem = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer '+token},
    url: 'http://localhost:5000/auth/members'
};

export function updateDashboardData(){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        try{
            var org=await axios(optionsOrg)
            var mem=await axios(optionsMem)
            dispatch({type:'UPDATE_ORG_DETAILS', data:org.data})
            dispatch({type:'UPDATE_ORG_MEMBERS', data:mem.data.data})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            alert()
            console.log(e)
            dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}

export function del(reg){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        await axios({
            url:`http://localhost:5000/auth/members?reg=${reg}`,
            headers: { 'Authorization': 'Bearer '+token},
            method: 'DELETE',
        })
        var mem=await axios(optionsMem)
        dispatch({type:'UPDATE_ORG_MEMBERS', data:mem.data.data})
        dispatch({type:'UPDATE_ORG_LOGGED', data:true})


    }
}

export function verify(reg){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        await axios({
            url:`http://localhost:5000/auth/members?reg=${reg}`,
            headers: { 'Authorization': 'Bearer '+token},
            method: 'PUT',
        })
        var mem=await axios(optionsMem)
        dispatch({type:'UPDATE_ORG_MEMBERS', data:mem.data.data})
        dispatch({type:'UPDATE_ORG_LOGGED', data:true})


    }
}